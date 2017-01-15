var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema  = new Schema({
   first: String,
    last: String,
    email: String,
    phone: String,
    hired: String,
    start: String,
    
});

module.exports = mongoose.model('Employee', NewEmployee);