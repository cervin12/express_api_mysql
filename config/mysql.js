const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'latihan_crud'
});

connection.connect((err)=>{
  if(err){
    throw err
  }

  console.log('connected to database')
});
 
module.exports = connection