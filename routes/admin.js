var express = require('express')
   , bc = require('/home/ByteBlockSDK/QuotaCareer/application-javascript/bc') //Blockchain code here
   , http = require('http')
   , path = require('path');

const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";

exports.display = function (req, res) {
   res.render('admin');
};

exports.getstudent = function (req, res) {

   console.log('exports.getstudent ');
      message = '';
      var post = req.body;
      var name = post.name;
      console.log('exports.getstudent POST');
      console.log(name);
      var result = bc.readstudent(name);
      result.then(function (result_user) {
	 var obj = JSON.parse(result_user);
	message = "Student Name = " + obj.StudentName + '\n' + "Documentation Submitted = " +  obj.Documentation  + '\n' + "Fee Paid = " + obj.Fee + '\n' + "Ticket Status = " + obj.Ticket  + '\n' + "Visa Status = " + obj.Visa + '\n';


         res.render('display.ejs', { message: message });
      });
};

exports.gethistory = function (req, res) {

   console.log('exports.gethistory');
      message = '';
      var post = req.body;
      var name = post.name;
      console.log('exports.gethistory');
      console.log(name);
      var result = bc.gethistory(name);
      result.then(function (result_user) {

	 var obj = JSON.parse(result_user);
         
	 Object.entries(obj).forEach(([key, value]) => {
   message =  message + "Date = " + new Date(value["Timestamp"]["seconds"] * 1000) + '\n';
   message = message + "University Update = " + value["Value"]["UniversityName"] + '\n' + "Visa Update = " + value["Value"]["Visa"] + '\n' + "Fee Update = " + value["Value"]["Fee"] + '\n' + "Ticket Update = " + value["Value"]["Ticket"] +  '\n' +  '\n';
});
	 res.render('display.ejs', { message: message });
      });
};

exports.enrollstudent = function (req, res) {

   if (req.method == "POST") {
      message = '';
      var post = req.body;
      var name = post.name;
      var uni = post.uni;
      var visa = post.visa;
      var ticket = post.ticket;
      var doc = post.doc;
      var fee = post.fee;

      console.log('exports.enrollstudent POST');
      console.log(name);
      console.log(uni);
      console.log(visa);
      console.log(ticket);
      console.log(doc);
      console.log(fee);
      var result = bc.newenrollment(name, uni, visa, ticket, doc, fee);
      result.then(function (result_user) {
         console.log(result_user);

	 var obj = JSON.parse(result_user);
	 Object.entries(obj).forEach(([key, value]) => {
    message =  message + key + " = " + value + '\n';
});

         res.render('display.ejs', { message: message });
      });
   } else {
      res.render('newenrollment.ejs');
   }

};

exports.fileupload = function (req, res) {
   res.sendFile(__dirname + "./../views/index.html");
};

exports.payment = function (req, res) {
   res.render('payment.ejs');
};

exports.HowItWork = function (req, res) {
   res.render('HIW.ejs');
};

/////////////ALL Display //////////
exports.allstudents = function (req, res) {
   message = 'Student list:' + '\n';
   var i;
   var sql = "SELECT student_name from connection";
   console.log('SQL query allstudents');
   db.query(sql, function (err, results) {
      if (err) throw err;
      console.log('SQL query length = ',results.length);
      if (results.length) {
	 for(i = 0; i < results.length; i++) {
	  message = message + results[i].student_name + '\n';
	}
         res.render('display.ejs', { message: message });
      }
   });
};

exports.alluni = function (req, res) {
   message = 'University Agents list:' +  '\n';
   var sql = "SELECT university_agent from connection";
   console.log('SQL query university_agent');
   db.query(sql, function (err, results) {
      if (err) throw err;
      console.log('SQL query result');
      if (results.length) {
	          for(i = 0; i < results.length; i++) {
          message = message + results[i].university_agent + '\n';
	}
         res.render('display.ejs', { message: message });
      }

   });
};

exports.allvisa = function (req, res) {
   message = 'Visa Agents:' +  '\n';
   var sql = "SELECT visa_agent from connection";
   console.log('SQL query visa_agent');
   db.query(sql, function (err, results) {
      if (err) throw err;
      console.log('SQL query result');
      if (results.length) {
          for(i = 0; i < results.length; i++) {
          message = message + results[i].visa_agent + '\n';
         }
         res.render('display.ejs', { message: message });
      }

   });
};

exports.allticket = function (req, res) {
   message = 'Ticket Agents:'  +  '\n';
   var sql = "SELECT ticket_agent from connection";
   console.log('SQL query ticket_agent');
   db.query(sql, function (err, results) {
      if (err) throw err;
      console.log('SQL query result');
      if (results.length) {
          for(i = 0; i < results.length; i++) {
          message = message + results[i].ticket_agent + '\n';
         }

         res.render('display.ejs', { message: message });
      }

   });
};

