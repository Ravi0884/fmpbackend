const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6639079',
    password: "3EKbazgYp6",
    database:"sql6639079"
})

module.exports=con