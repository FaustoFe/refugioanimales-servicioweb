const connection = require('../config/db-connection')

const getEventos = async (req, res) => {
  connection.query('SELECT * FROM eventos', function (err, result) {
    if (err) {
      console.log('Error in query execution')
      res.status(500).json()
    }
    res.json(result)
  })
}

module.exports = {
  getEventos
}