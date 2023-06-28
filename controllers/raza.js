const connection = require('../config/db-connection')

const getRazas = (req, res) => {
  connection.query('SELECT * FROM razas', function (err, result) {
    if (err) {
      console.log('Error in query execution')
      res.status(500).json()
    }
    res.json(result)
  })
}

const getRazaById = async (req, res) => {
  if (req.params.id % 1 == 0) {
    const id = req.params.id
    connection.query('SELECT * FROM razas WHERE id = ?', [id], function (err, result) {
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
  getRazas,
  getRazaById
}