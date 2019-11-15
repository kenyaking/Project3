const QuizController = require('../controller/quiz_controller');
module.exports = (app)=>{
    /// api/createUser endpoint gets invoked from client app when user signs in
    app.post('/api/createUser',QuizController.createUser);

    /// api/saveQuiz endpoints gets invoked from client app when user clicks on the Submit button 
    //after answering all the quiz answers
    app.post('/api/saveQuiz',QuizController.saveQuiz)


}