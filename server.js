var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();
var router = express.Router();
var db;

var nodemailer = require('nodemailer');

var Schema = mongoose.Schema;

var NewEmployee = new Schema({
    first: String,
    last: String,
    email: String,
    phone: String,
    start: String,
    I9: String,
    W4: String,
    International: String,
    Payment: String,
    Register: String,
    RegisterDate: String,
    Refunds: String,
    ReturnsDate: String,
    CustServ: String,
    CSDate: String,
    GM: String,
    GMDate: String,
    TextDepart: String,
    TXDate: String
});


   

var Employee = mongoose.model('Employee', NewEmployee);

mongoose.connect('mongodb://Admin1:Password1@ds111178.mlab.com:11178/bookshelf')

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

// add an employee
app.post('/employees', function(req, res) {

    employee = new Employee({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        phone: req.body.phone,
        start: req.body.start,
        I9: req.body.I9,
        W4: req.body.W4,
        International: req.body.International,
        PayOption: req.body.PayOption,
        Register: req.body.Register,
        RegisterDate: req.body.RegisterDate,
        Refunds: req.body.Refunds,
        ReturnsDate: req.body.ReturnsDate,
        CustServ: req.body.CustServ,
        CSDate: req.body.CSDate,
        GM: req.body.GM,
        GMDate: req.body.GMDate,
        TextDepart: req.body.TextDepart,
        TXDate: req.body.TXDate
    });

    employee.save(function(err) {
        if (err)
            res.send(err);

        res.redirect('/');
    });
});

// get ALL THE Employees
app.get('/employees', function(req, res) {
    Employee.find(function(err, employees) {
        if (err)
            res.send(err);
        res.json(employees);
    });
});

// get ONE Employee

app.get('/employees/:_id', function(req, res) {
    Employee.findById(req.params._id, function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
})

// delete a book
app.delete('/employees/:_id', function(req, res) {
  console.log(req.params._id)
    Employee.findByIdAndRemove(req.params._id, function(err, employee) {
        if (err) {
          console.log("error message")
            return res.status(500).json({
                // message: 'Internal Server Error'
            });
        }
        res.status(201).json({
            message: 'Item was deleted'
        })
    })
})

//update a book
app.put('/employees/:_id', function(req, res) {
    var queryID = {
        _id: req.params._id
    }
    var updateThis = req.body;
    // console.log(updateThis)
    updatedemployee = new Employee({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        phone: req.body.phone,
        start: req.body.start,
        I9: req.body.I9,
        W4: req.body.W4,
        International: req.body.International,
        PayOption: req.body.PayOption,
        Register: req.body.Register,
        RegisterDate: req.body.RegisterDate,
        Refunds: req.body.Refunds,
        ReturnsDate: req.body.ReturnsDate,
        CustServ: req.body.CustServ,
        CSDate: req.body.CSDate,
        GM: req.body.GM,
        GMDate: req.body.GMDate,
        TextDepart: req.body.TextDepart,
        TXDate: req.body.TXDate
    });
    
    Employee.findOneAndUpdate(queryID, updateThis,
        function(err, employee) {
            if (err) {
                return res.status(500).json({
                    // message: 'Internal Server Error'
                })
            }
            res.status(201).json({
                message: 'Item was updated'
            })
        })

})


function handleEmployeeEmail(req, res) {
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'frontendmanager656@gmail.com', // Your email id
            pass: 'Terrier35' // Your password
        }
    });

    var text = 'Hello world from \n\n' + req.body.name;

    var mailOptions = {
    from: 'frontendmanager656@gmail.com', // sender address
    to: 'saramcashman@gmail.com', // list of receivers
    subject: 'FIRED', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});

// var Checklist = mongoose.model('Checklist', TrainingList);

// mongoose.createConnection('mongodb://Admin1:Password1@ds111178.mlab.com:11178/bookshelf')

// app.use(express.static('public'));

// app.use(bodyParser.urlencoded({
//     extended: true
// }))
// app.use(bodyParser.json());

// // add an employee
// app.post('/traininglist', function(req, res) {

//     list = new Checklist({
//         I9: req.body.I9,
//         W4: req.body.W4,
//         International: req.body.International,
//         PayOption: req.body.PayOption,
//         Register: req.body.Register,
//         RegisterDate: req.body.RegisterDate,
//         Refunds: req.body.Refunds,
//         ReturnsDate: req.body.ReturnsDate,
//         CustServ: req.body.CustServ,
//         CSDate: req.body.CSDate,
//         GM: req.body.GM,
//         GMDate: req.body.GMDate,
//         TextDepart: req.body.TextDepart,
//         TXDate: req.body.TXDate
//     });
//  console.log(list);
//     list.save(function(err) {
//         if (err)
//             res.send(err);

//         res.redirect('/');
//     });
// });

// // get ALL THE Employees
// app.get('/traininglist', function(req, res) {
//     Checklist.find(function(err, list) {
//         if (err)
//             res.send(err);
//         res.json(list);
//     });
// });

// // // get ONE Employee

// app.get('/traininglist/:_id', function(req, res) {
//     Checklist.findById(req.params._id, function(err, list) {
//         if (err)
//             res.send(err);
//         res.json(list);
//     });
// })

// // delete a book
// app.delete('/traininglist/:_id', function(req, res) {
//     Checklist.findByIdAndRemove(req.params._id, function(err, list) {
//         if (err) {
//             return res.status(500).json({
//                 // message: 'Internal Server Error'
//             });
//         }
//         res.status(201).json({
//             message: 'Item was deleted'
//         })
//     })
// })

// //update a book
// app.put('/traininglist/:_id', function(req, res) {
//     var queryID = {
//         _id: req.params._id
//     }
//     var updateThis = req.body;
//     // console.log(updateThis)
//     updatedlist = new Checklist({
//         I9: req.body.I9,
//         W4: req.body.W4,
//         International: req.body.International,
//         Payment: req.body.Payment,
//         Register: req.body.Register,
//         Rentals: req.body.Rentals,
//         Refunds: req.body.Refunds,
//         CustServ: req.body.CustServ,
//         GM: req.body.GM,
//         TextDepart: req.body.TextDepart,
//     });
//     console.log(req.params)
//     console.log(req.body)
//     Checklist.findOneAndUpdate(queryID, updateThis,
//         function(err, list) {
//             if (err) {
//                 return res.status(500).json({
//                     // message: 'Internal Server Error'
//                 })
//             }
//             res.status(201).json({
//                 message: 'Item was updated'
//             })
//         })

// })

// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var passport = require('passport');
// var gcal     = require('google-calendar');
  
//   var google_calendar = new gcal.GoogleCalendar(accessToken);

// passport.use(new GoogleStrategy({
//     clientID: "258527515068-ml668r91ifenl6uurhtegjrp4qsc7jc5.apps.googleusercontent.com",
//     clientSecret: "cssIibY35vsRt0Lm13yVfh3p",
//     callbackURL: "http://localhost:8082/auth/callback",
//     scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
//   },
//   function(accessToken, refreshToken, profile, done) {

//     //google_calendar = new gcal.GoogleCalendar(accessToken);

//     return done(null, profile);
//   }
// ));

// var util = require('util');
// var express  = require('express');

// var config = require('./config');
// var gcal = require('../GoogleCalendar');

// /*
//   ===========================================================================
//             Setup express + passportjs server for authentication
//   ===========================================================================
// */

// var app = express();
// var passport = require('passport')
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// app.configure(function() {
//   app.use(express.cookieParser());
//   app.use(express.bodyParser());
//   app.use(express.session({ secret: 'keyboard cat' }));
//   app.use(passport.initialize());
// });
// app.listen(8082);

// passport.use(new GoogleStrategy({
//     clientID: config.consumer_key,
//     clientSecret: config.consumer_secret,
//     callbackURL: "http://localhost:8082/auth/callback",
//     scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
//   },
//   function(accessToken, refreshToken, profile, done) {
//     profile.accessToken = accessToken;
//     return done(null, profile);
//   }
// ));

// app.get('/auth',
//   passport.authenticate('google', { session: false }));

// app.get('/auth/callback', 
//   passport.authenticate('google', { session: false, failureRedirect: '/login' }),
//   function(req, res) { 
//     req.session.access_token = req.user.accessToken;
//     res.redirect('/');
//   });



//   ===========================================================================
//                                Google Calendar
//   ===========================================================================


// app.all('/', function(req, res){
  
//   if(!req.session.access_token) return res.redirect('/auth');
  
//   //Create an instance from accessToken
//   var accessToken = req.session.access_token;

//   gcal(accessToken).calendarList.list(function(err, data) {
//     if(err) return res.send(500,err);
//     return res.send(data);
//   });
// });

// app.all('/:calendarId', function(req, res){
  
//   if(!req.session.access_token) return res.redirect('/auth');
  
//   //Create an instance from accessToken
//   var accessToken     = req.session.access_token;
//   var calendarId      = req.params.calendarId;
  
//   gcal(accessToken).events.list(calendarId, {maxResults:1}, function(err, data) {
//     if(err) return res.send(500,err);
    
//     console.log(data)
//     if(data.nextPageToken){
//       gcal(accessToken).events.list(calendarId, {maxResults:1, pageToken:data.nextPageToken}, function(err, data) {
//         console.log(data.items)
//       })
//     }
    
    
//     return res.send(data);
//   });
// });


// app.all('/:calendarId/:eventId', function(req, res){
  
//   if(!req.session.access_token) return res.redirect('/auth');
  
//   //Create an instance from accessToken
//   var accessToken     = req.session.access_token;
//   var calendarId      = req.params.calendarId;
//   var eventId         = req.params.eventId;
  
//   gcal(accessToken).events.get(calendarId, eventId, function(err, data) {
//     if(err) return res.send(500,err);
//     return res.send(data);
//   });
// });

exports.app = app;

app.listen(process.env.PORT || 8080)
console.log("i always feel like somebody's watching me (on port 8080)")