const connection = require('../config/db-connection')

const getAnimales = async (req, res) => {
  let params = []
  let baseQuery = 'SELECT id, nombre, edad, sexo, descripcion, imagen_path, vacunas, castrado, raza_id FROM animales'
  if (Object.keys(req.query).length != 0) {
    console.log('Hay query string')
    baseQuery += ' WHERE ('
    if (req.query.tipo) {
      params.push(req.query.tipo)
      baseQuery += 'raza_id IN (SELECT id FROM razas WHERE tipo_animal_id = $' + params.length + ')'
    }
    if (req.query.sexo) {
      baseQuery += (params.length == 0) ? '' : ' AND '
      params.push('%' + req.query.sexo + '%')
      baseQuery += 'sexo ILIKE $' + params.length
    }
    if (req.query.edad) {
      baseQuery += (params.length == 0) ? '' : ' AND '
      params.push(req.query.edad)
      baseQuery += 'edad = $' + params.length
    }
    baseQuery += ')'
  }
  connection.query(baseQuery, params, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error in query execution: ', err)
    }
    res.json(results)
  })
}

const getAnimalById = async (req, res) => {
  if (req.params.id % 1 == 0) {
    const id = req.params.id
    connection.query('SELECT animales.nombre AS nombre, edad, sexo, imagen_path, animales.descripcion AS descripcion, vacunas, castrado, razas.nombre AS raza FROM (animales INNER JOIN razas ON animales.raza_id=razas.id) WHERE animales.id = ?', [id], (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error in query execution: ', err)
      }
      res.json(results)
    })
  } else {
    res.status(400).json()
  }
}

module.exports = {
  getAnimales,
  getAnimalById
}