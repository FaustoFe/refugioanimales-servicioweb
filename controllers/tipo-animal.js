const connection = require('../config/db-connection')

const getTipoAnimal = async (req, res) => {
  connection.query('SELECT * FROM tipos_animales', function (err, result) {
    if (err) {
      console.log('Error in query execution')
      res.status(500).json()
    }
    res.json(result)
  })
}

const getTipoAnimalById = async (req, res) => {
  if (req.params.id % 1 == 0) {
    const id = req.params.id
    connection.query('SELECT * FROM tipos_animales WHERE id = ?', [id], function (err, result) {
      if (err) {
        console.log('Error in query execution')
        res.status(500).json()
      }
      res.json(result)
    })
  } else {
    res.status(400).json()
  }
}

module.exports = {
  getTipoAnimal,
  getTipoAnimalById
}