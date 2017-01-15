var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();
var router = express.Router();
var db;

var Schema = mongoose.Schema;

var NewEmployee = new Schema({
    first: String,
    last: String,
    email: String,
    phone: String,
    hired: String,
    start: String,
});

var TrainingList = new Schema({
    I9: Boolean,
    W4: Boolean,
    International: Boolean,
    Payment: String,
    Register: Boolean,
    Rentals: Boolean,
    Refunds: Boolean,
    CustServ: Boolean,
    GM: Boolean,
    TextDepart: Boolean,

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
        hired: req.body.hired,
        start: req.body.start
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
    Employee.findByIdAndRemove(req.params._id, function(err, employee) {
        if (err) {
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
        hired: req.body.hired,
        start: req.body.start
    });
    console.log(req.params)
    console.log(req.body)
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

// var Checklist = mongoose.model('Checklist', TrainingList);

// mongoose.connect('mongodb://Admin1:Password1@ds111178.mlab.com:11178/bookshelf')

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
//         Payment: req.body.Payment,
//         Register: req.body.Register,
//         Rentals: req.body.Rentals,
//         Refunds: req.body.Refunds,
//         CustServ: req.body.CustServ,
//         GM: req.body.GM,
//         TextDepart: req.body.TextDepart,
//     });

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

// // get ONE Employee

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


exports.app = app;

app.listen(process.env.PORT || 8080)
console.log("i always feel like somebody's watching me (on port 8080)")