var express = require('express')
    , bc = require('/home/ByteBlockSDK/QuotaCareer/application-javascript/bc') //Blockchain code here
    , http = require('http')
    , path = require('path');

exports.updateticketprogress = function (req, res) {
    if (req.method == "POST") {
        message = '';
        var post = req.body;
        var name = post.name;
        var progress = post.progress;
        console.log('exports.updateticketprogress POST');
        console.log(name);
        var result = bc.updateticket(name, progress);
        result.then(function (result_user) {
            message = result_user;
            res.render('display.ejs', { message: message });

        });

        //Call Blockchain App Here
    } else {
        res.render('universityagent_new');
    }
};


exports.show_ticket_page = function (req, res) {
    res.render('universityagent_new');
};
