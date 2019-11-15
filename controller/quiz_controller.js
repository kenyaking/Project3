const Quiz = require('../models/quiz');

module.exports = {
    createUser(req,res){
        console.log('create user method called');
        const userProps = req.body;
        console.log('user values',userProps);
        //check if the userEmail already exists in our quiz model in mongodb
        Quiz.findOne({userEmail: userProps.userEmail}).then(user=>{
            if (user){
                //looks like we found a record
                console.log('user already exists',user);
                res.send(user)
            }else{
                //looks like the email does not exist in the database, so lets go ahead insert the record
                Quiz.create(userProps).then(user=>{
                console.log('record created in the db',user);
                res.send(user);
                })
            }
        })

       
    },

    saveQuiz(req,res){
        const userProps = req.body;
        console.log('user passed data : ',userProps);
        Quiz.updateOne({userEmail: userProps.userEmail}, userProps).then(user=>{
            console.log('update mongodb with coursename and quizScore',user);
            res.send(user)
        })
    }
}