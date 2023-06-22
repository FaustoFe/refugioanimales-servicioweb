const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized:false
    }
});

const getAnimales = async (req, res) => {
    let params = [];
    let baseQuery = 'SELECT id, nombre, edad, sexo, descripcion, vacunas, castrado, raza_id FROM animales';

    if(Object.keys(req.query).length != 0){

        console.log("Hay query string");

        baseQuery += ' WHERE (';
        
        if (req.query.tipo){
            params.push(req.query.tipo);
            baseQuery += 'raza_id IN (SELECT id FROM razas WHERE tipo_animal_id = $' + params.length + ')';
        }
        if (req.query.sexo){
            baseQuery += (params.length == 0) ? '' : ' AND '
            params.push('%' + req.query.sexo + '%');
            baseQuery += 'sexo ILIKE $' + params.length;
        }
        if (req.query.edad){
            baseQuery += (params.length == 0) ? '' : ' AND '
            params.push(req.query.edad);
            baseQuery += 'edad = $' + params.length;
        }


        baseQuery += ')';
    }

    const response = await pool.query(baseQuery, params);

    for (let i = 0; i < response.rows.length; i++) {
        response.rows[i].imagen = 'https://iaw-faustofe-servicio-web.herokuapp.com/animales/' + response.rows[i].id + '/imagen';
    }

    res.json(response.rows);
}

const getAnimalById = async (req, res) => {
    if (req.params.id % 1 == 0) {
        const id = req.params.id;
        const response = await pool.query('SELECT animales.nombre AS nombre, edad, sexo, animales.descripcion AS descripcion, vacunas, castrado, razas.nombre AS raza FROM (animales INNER JOIN razas ON animales.raza_id=razas.id) WHERE animales.id = $1', [id]);
        response.rows[0].imagen = 'https://iaw-faustofe-servicio-web.herokuapp.com/animales/' + id + '/imagen';
        res.json(response.rows);
    } else {
        res.status(400).json()
    }
}

const getAnimalImage = async (req, res) => {
    if(req.params.id % 1 == 0) {
        try {
            const id = req.params.id;
            const fs = require('fs');
            const response = await pool.query("SELECT encode(imagen,'base64') FROM animales where id = $1", [id]);
            var respuesta = Buffer.from(response.rows[0].encode,'base64');
            var rta = respuesta.toString('utf-8');
            let buff = Buffer.from(rta, 'base64');
            fs.writeFileSync('image.jpg', buff, function(err) {
               console.log('File created');
            });
            const mimeType = 'image/jpg';
                  res.writeHead(200, { 'Content-Type': mimeType });
                  res.write(buff);
                  res.end();
         } catch(err) {
            res.status(404).send({
                "name": "Not Found Exception",
                "message": "The requested resource was not found.",
                "code": 0,
                "status": 404
            });
        }
    } else {
        res.status(400).json();
    }
}

const getRazas = async (req, res) => {
    const response = await pool.query('SELECT * FROM razas');
    res.json(response.rows);
}

const getRazaById = async (req, res) => {
    if (req.params.id % 1 == 0) {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM razas WHERE id = $1', [id]);
        res.json(response.rows);
    } else {
        res.status(400).json();    
    }
}

const getEventos = async (req, res) => {
    const response = await pool.query('SELECT * FROM eventos');
    res.json(response.rows);
}

const getTipoAnimal = async (req, res) => {
        const response = await pool.query('SELECT * FROM tipos_animales');
        res.json(response.rows);
}

const getTipoAnimalById = async (req, res) => {
    if(req.params.id % 1 == 0) {
        const id = req.params.id;
        const response = await pool.query('SELECT * FROM tipos_animales WHERE id = $1', [id]);
        res.json(response.rows);
    } else {
        res.status(400).json()
    }
}

module.exports = {
    getAnimales,
    getAnimalById,
    getRazas,
    getRazaById,
    getEventos,
    getAnimalImage,
    getTipoAnimal,
    getTipoAnimalById
}