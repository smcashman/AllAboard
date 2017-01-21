var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema  = new Schema({
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

module.exports = mongoose.model('Employee', NewEmployee);