const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    userEmail:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:false
    },
    quizScore:{
        type:Number,
        required:false
    },

});

const Quiz = mongoose.model('quiz',QuizSchema);

module.exports = Quiz;