var express = require('express')
    , bc = require('/home/ByteBlockSDK/QuotaCareer/application-javascript/bc') //Blockchain code here
    , http = require('http')
    , path = require('path');

exports.update_fee_info = function (req, res) {
    if (req.method == "POST") {
        message = '';
        var post = req.body;
        var name = post.name;
        var progress = post.fee;
        console.log('exports.updateprogress POST');
        console.log(name);
        var result = bc.updatefeeinfo(name, progress);
        result.then(function (result_user) {
            message = result_user;
            res.render('display.ejs', { message: message });
        }
        );
    } else {
        res.render('student_new');
    }
};

exports.update_documents = function (req, res) {
    if (req.method == "POST") {
        //Call Blockchain App Here
        message = '';
        var post = req.body;
        var name = post.name;
        var progress = post.doc;
        console.log('exports.updateprogress POST');
        console.log(name);
        var result = bc.updatedocinfo(name, progress);
        result.then(function (result_user) {
            message = result_user;
            res.render('display.ejs', { message: message });
        });
    } else {
        res.render('student_new');
    }
};

exports.show_student_page = function (req, res) {
    res.render('student_new');
};
