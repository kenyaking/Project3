import React from 'react';
import {
    quizQuestions,
    quizQuestionAnswers
  } from "../variables/Variables";

class Quiz extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          //quizQuestions: quizQuestions,
          displayQuiz: false,
          quizAnswers:[]
        };
      }

      openQuiz(id){
        console.log(id)
        this.setState({
          displayQuiz: true,
          quizComplete:false
        })
      }
    
      handleClick=(e)=>{
         //user clicked submit, so lets evaluate all the user answers
         const userAnswers = this.state.quizAnswers;
         let score = 0;
         userAnswers.map(userAnswer=>{
           const currentQuestionDetails = quizQuestionAnswers.find(q=>q.questionId === userAnswer.questionId);
           if (userAnswer.answerId === currentQuestionDetails.correctAnswerId){
             score = score + 1;
           }
         });
         this.props.saveQuiz(score);
         this.setState({userScore: score,quizComplete:true})
      }
    
      handleRadio(e,questionId){
        console.log('user selected',e.target.value) 
        const existingState = this.state.quizAnswers;
        this.setState({quizAnswers: [...existingState,{questionId: questionId,answerId: e.target.value }]})
      }

    render(){
        return(
            <div  class="container" style={{marginTop:"100px"}}>
               
                <div class="page-header" id="banner">
                    <div class="row">
                        <div class="col-lg-8 col-md-7 col-sm-6">
                            <h1>Quiz</h1>
                            
                        </div>
                        <div class="col-lg-4 col-md-5 col-sm-6">
                           
                        </div>
                    </div>
                </div>
                <div class="bs-docs-section clearfix">
               
                 <div class="row">
                    <div class="col-lg-12">
                        <div class="bs-component">
                            <form>
                                <fieldset>
                                <fieldset class="form-group">
                                    
                                        <div>
                                            <div> 
                                            {
                                                    quizQuestionAnswers.map(questionAnswer=>{
                                                    
                                                    const answers = questionAnswer.answers;
                                                    return (
                                                        <div>
                                                           
                                                            <h4>{questionAnswer.question}</h4>
                                                            {answers.map(answer=>{
                                                                return (
                                                                    <div class="form-check">
                                                                    <label class="form-check-label">
                                                                        <input type="radio" className="form-check-input" 
                                                                        onChange={(e)=>{this.handleRadio(e,questionAnswer.questionId)}}
                                                                        id={answer.id} name={questionAnswer.questionId} value={answer.id} />
                                                                        <label for={answer.id}>{answer.value}</label>
                                                                    </label>
                                                                    </div>
                                                                )
                                                            })}
                                                        
                                                        </div>
                                                    )
                                                    })
                                                    
                                                }
                                            </div>
                                        </div>        
                                            
                                    
                                
                                </fieldset>
                                </fieldset>
                                <fieldset class="form-group">
                                <p className="bs-component" onClick={this.handleClick}>
                            
                                    <button  type="button" className="btn btn-primary">Submit</button>
                                </p>
                                </fieldset>
                        </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                {this.state.quizComplete && <div class="col-lg-12">
                    Your final score is : {this.state.userScore}
                    </div>}
                </div>
            </div>
            </div>
        );
    
}

}

export default Quiz;