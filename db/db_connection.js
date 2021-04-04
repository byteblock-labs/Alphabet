/*
 * Copyright Block And Byte Technologies pvt ltd. All Rights Reserved.
 *
 */

var mysql = require('mysql');

//This function will start the mysql connection
function startConnection()
{
	var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "ByteBlock@123",
	database: "quota_db"
	});
	console.log("mysql connection created");
	return con;
}

//This function will create the quota_db database. Call it only when database is not there 
function createDatabase(con)
{
	con.query("CREATE DATABASE quota_db", function (err, result)
	{
		if (err) throw err;
		console.log("createDatabase success");
	});
}
//Call only once
function createTable(con)
{
	var sql = "CREATE TABLE account (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), type VARCHAR(64), email VARCHAR(255), visaagent VARCHAR(255), ticketagent VARCHAR(255), uniagent VARCHAR(255))";
	con.query(sql, function (err, result)
	{
		if (err) throw err;
		console.log("Table created");
	});
}


//Create a new  record
function createRecord(con, sql)
{
	//Example for admin
	//var sql = "INSERT INTO account (username, password, type, email, visaagent, ticketagent, uniagent ) VALUES ('admin', 'ByteBlock', 'admin', 'admin@email.com', 'NA', 'NA', 'NA')";
	con.query(sql, function (err, result)
	{
		if (err) throw err;
		console.log("record inserted");
	});
}


//Delete a student record
function deleteARecord(con, sql)
{
	//Example
	//var sql = "DELETE FROM account WHERE username = 'Praveen'";
	con.query(sql, function (err, result) {
		if (err) throw err;
	    	console.log("Number of records deleted: " + result.affectedRows);
	});
}

//Update a table, use this only in the case when some agent is changed, email update is required, password update is required
function updateATable(con, sql)
{
	//Example
	//var sql = "UPDATE account SET visaagent  = 'Ramesh' WHERE visaagent  = 'Suresh'";
	con.query(sql, function (err, result)
	{
		if (err) throw err;
		console.log(result.affectedRows + " record(s) updated");
	});
}

//End the SQL connection
function endConnection(con){
	con.end();
}

//Example to call the functions
startConnection();
