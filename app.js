/**
* Module dependencies.
*/

//Admin 0, student 1, univercity 2, visa 3, ticket 4 (accounts)

var express = require('express')
    , routes = require('./routes')
    , bc = require('/home/ByteBlockSDK/QuotaCareer/application-javascript/bc')
    , user = require('./routes/user')
    , admin = require('./routes/admin')
    , student = require('./routes/student')
    , universityagent = require('./routes/universityagent')
    , ticketagent = require('./routes/ticketagent')
    , visaagent = require('./routes/visaagent')
    , http = require('http')
    , path = require('path');

var multer = require('multer');
var bodyParser = require('body-parser')
const fs = require('fs');
const { exec } = require('child_process');
var app = express();

app.use(express.static("public"));


// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Common for all
app.get('/', function (req, res) {
    res.render('about');
});
app.get('/login', routes.index);//call for login page
app.get('/signup', user.signup);//call for signup page
app.get('/logout', user.logout);//call for signup page
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post

//Student area
app.get('/student', student.show_student_page);
app.post('/stu_updatedocument', student.update_documents);
app.post('/stu_updatefee', student.update_fee_info);

//Admin area
app.get('/admin', admin.display);

app.get('/GetAllStudentInfo', function (req, res) {
    message = '';
    console.log("GetAllStudentInfo : Entry");
    var result = bc.getallstudentinfo();
    result.then(function (result_user) {

	 var obj = JSON.parse(result_user);   
         
Object.entries(obj).forEach(([key, value]) => {
    message =  message + "Student Name = " +  value["Record"]["StudentName"] + '\n';
    message = message + "University Update = " + value["Record"]["UniversityName"] + '\n' + "Visa Update = " + value["Record"]["Visa"] + '\n' + "Fee Update = " + value["Record"]["Fee"] + '\n' + "Ticket Update = " + value["Record"]["Ticket"] +  '\n' + '\n';
});
	    res.render('display.ejs', { message: message });
    });
});

app.post('/ReadStudentInfo', admin.getstudent);
app.post('/EnrollNewStudent', admin.enrollstudent);
app.get('/EnrollNewStudent', admin.enrollstudent);
app.post('/gethistory', admin.gethistory);

app.get('/allstudents', admin.allstudents);
app.get('/alluni', admin.alluni);
app.get('/allvisa', admin.allvisa);
app.get('/allticket', admin.allticket);
/////////////////////////Download files////////////////////////////////////
var upload = require('./app/config/multer.config.js');
global.__basedir = __dirname;
app.use(express.static('resources'));
var router = express.Router();
require('./app/routers/file.router.js')(app, router, upload);

//University agent area
app.get('/university', universityagent.show_university_page);
app.post('/uniupdateadmission', universityagent.updateprogress);

//Ticket agent area
app.get('/ticket', ticketagent.show_ticket_page);
app.post('/updateticketprogress', ticketagent.updateticketprogress);

//Visa agent area
app.get('/visa', visaagent.show_visa_page);
app.post('/updatevisaprogress', visaagent.updatevisaprogress);

app.get('/payment', admin.payment);
app.get('/HowItWork', admin.HowItWork);

const assets = 'public/assets';
const videName = 'Blockchaindemo'; // without extension

///////////////// Video Play ///////////////
router.get('/video', (req, res) => {
    const path = `${assets}/${videName}.mp4`;
    fs.stat(path, (err, stat) => {
        if (err !== null && err.code === 'ENOENT') {
            res.sendStatus(404);
        }
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(path, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    });
});



app.listen(80, () => {
    console.log(`QuotaCareer app listening at 80`)
    bc.startBc();
})
