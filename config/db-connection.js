var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'refugioanimales'
})

connection.connect(function (err) {
  if (err) {
    console.log(err)
    /* throw err; */
  }
  console.log('Connected!')
})

module.exports = connection