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
    PayOption: String,
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

var transporter = nodemailer.createTransport('smtps://frontendmanager656%40gmail.com:Password656@smtp.gmail.com');

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
    console.log(req.body.PayOption)
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



app.get('/send',function(req,res){
var mailOptions={
   to : req.query.to,
   subject : req.query.subject,
   text : req.query.text
}
console.log(mailOptions);
transporter.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.end("error");
}else{
console.log("Message sent: " + response.message);
res.end("sent");
}
});
});

exports.app = app;
exports.NewEmployee = NewEmployee;

app.listen(process.env.PORT || 8080)
console.log("i always feel like somebody's watching me (on port 8080)")