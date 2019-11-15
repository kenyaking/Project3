/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
//import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Button, Form } from "react-bootstrap";
//import Form from 'react-bootstrap/Form';

import { Card } from "../components/Card/Card";
//import { StatsCard } from "components/StatsCard/StatsCard.jsx";
//import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  quizQuestions,
  quizQuestionAnswers
} from "../variables/Variables";

class Quizes extends Component {
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
     })
     this.setState({userScore: score,quizComplete:true})
  }

  handleRadio(e,questionId){
    console.log('user selected',e.target.value) 
    const existingState = this.state.quizAnswers;
    this.setState({quizAnswers: [...existingState,{questionId: questionId,answerId: e.target.value }]})
  }

  render() {
    console.log('current state',this.state.quizAnswers)
    var questions = null
    if(this.state.displayQuiz === true){
      questions = (
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
                      <div>
                        <input onChange={(e)=>{this.handleRadio(e,questionAnswer.questionId)}} type="radio" id={answer.id} name={questionAnswer.questionId} value={answer.id} />
                      <label for={answer.id}>{answer.value}</label> 
                      </div>
                    )
                  })}
                 
                </div>
              )
            })
            
          }
        </div>
        <div>
          <input  type="submit" value="Submit" onClick={this.handleClick}></input>
        </div>
        </div>
      )
    }

    return (
      <div className="content">
        <Grid fluid>
          <Row> 
            <Col md={4}>
              <Card 
                title="Quiz 1"
                id="quiz1"
                content={
                  <Button id="quiz1" variant="warning" onClick={(e) => this.openQuiz(e.target.id)}>Take Quiz</Button>
                }
              > 
              </Card>
            </Col>
          </Row>
          { questions }
          {this.state.quizComplete && <div>Your final score is : {this.state.userScore}</div>}
        </Grid>
      </div>
    );
  }
}

export default Quizes;