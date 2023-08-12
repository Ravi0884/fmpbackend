const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'db4free.net',
    user: 'raviraj',
    password: "Raviraj1234",
    database:"fixmyplot"
})

module.exports=con
