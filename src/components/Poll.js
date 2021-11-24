import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Grid, Header, Image, Segment, Progress, Container, Button, Form, Radio } from 'semantic-ui-react';
import { saveAnswerAsync } from '../redux/slices/combinedSlice';
import VoteSticker from "./VoteSticker";
import { darkPurple, lighterPurple, lightPurple, white } from "../utils/colours";


const Poll = () => {
  const [selectedOption, setSelectedOption] = useState({});

  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const questions = useSelector(state => state.combined.questions);
  const { authedUser, users } = useSelector(state => state.combined);
  


  
  const pollView = Object.keys(questions)
    .filter((i) => (
    questions[i].id === id
    ))
    .map(question => {
      const mapPollView = {
        qid: questions[question].id,
        author: questions[question].author,
        optionOne: {
          votes: questions[question].optionOne.votes,
          text: questions[question].optionOne.text,
        },
        optionTwo: {
          votes: questions[question].optionTwo.votes,
          text: questions[question].optionTwo.text,
        }
      }
      return mapPollView;
    });
    
  const authorDetails = Object.keys(users)
    .filter((user) => users[user].id === pollView[0].author)
    .map(filteredUser => {
      return { 
        name: users[filteredUser].name, 
        avatar: users[filteredUser].avatarURL.default 
      };
    });
  
  const handleChange = (e, { value }) => {
    setSelectedOption({ value });
  };

  const handleSubmit = () => {
    const value = selectedOption.value
    if (!value) {
      alert('Select an option!!')
    } else {
      dispatch(
        saveAnswerAsync({authedUser: authedUser, qid: id, answer: value})
      );
    }
  };

  
  if (
    pollView[0].optionOne.votes.includes(authedUser) ||
    pollView[0].optionTwo.votes.includes(authedUser)
    ) {
      return (
        <Container>
          {
            pollView.map((q) => {
              const optionOneVotes = q.optionOne.votes.length;
              const optionTwoVotes = q.optionTwo.votes.length;
              const totalVotes = optionOneVotes + optionTwoVotes;
              const optionOnePercent = ((optionOneVotes / totalVotes) * 100).toFixed(1);
              const optionTwoPercent = ((optionTwoVotes / totalVotes) * 100).toFixed(1);
              const optionOneColor = q.optionOne.votes.includes(authedUser);
              const optionTwoColor = q.optionTwo.votes.includes(authedUser);

              return (
                <div key={q.qid}>
                  <Card fluid raised>
                    <Card.Content style={{backgroundColor: lighterPurple}}>
                      <Header as='h4' textAlign='left' style={{color: darkPurple}}>Asked by {authorDetails[0].name}</Header>
                    </Card.Content>
                    <Card.Content>
                      <Grid verticalAlign='middle'>
                        <Grid.Row>
                          <Grid.Column width={5}>
                            <Image src={authorDetails[0].avatar} size='medium' circular />
                          </Grid.Column>
                          <Grid.Column width={11} textAlign='left'>
                            <Header as='h4' style={{color: darkPurple}}>Results:</Header>
                            <Segment style={{backgroundColor: optionOneColor ? lightPurple : white}}>
                              { optionOneColor && <VoteSticker /> }
                              <p>{q.optionOne.text}</p>
                              <Progress 
                                progress
                                percent={optionOnePercent}  
                                color='purple' 
                                style={{margin: '10px 0 0 0'}} 
                              />
                              <p style={{textAlign: 'center'}}>{`${optionOneVotes} out of ${totalVotes} votes`}</p>
                            </Segment>
                            <Segment style={{backgroundColor: optionTwoColor ? lightPurple : white}}>
                              { optionTwoColor && <VoteSticker /> }
                              <p>{q.optionTwo.text}</p>
                              <Progress 
                                progress
                                percent={optionTwoPercent} 
                                color='purple' 
                                style={{margin: '10px 0 0 0'}} 
                              />
                              <p style={{textAlign: 'center'}}>{`${optionTwoVotes} out of ${totalVotes} votes`}</p>
                            </Segment>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Card.Content>
                  </Card>
                </div>
              );
          })}
        </Container>
      );
    }

  return (
    <Container>
      {
        pollView.map(q => {
          return (
            <div key={q.qid}>
              <Card fluid raised>
                <Card.Content style={{backgroundColor: lighterPurple}}>
                  <Header as='h4' textAlign='left' style={{color: darkPurple}}>{authorDetails[0].name} says:</Header>
                </Card.Content> 
                <Card.Content>
                  <Grid verticalAlign='middle'>
                    <Grid.Row>
                      <Grid.Column width={5}>
                        <Image src={authorDetails[0].avatar} size='medium' circular />
                      </Grid.Column>
                      <Grid.Column width={11} textAlign='left'>
                        <Header as='h4' style={{color: darkPurple}}>Would you rather ...</Header>
                        <Form>
                          <Form.Field>
                            <Radio
                              label={q.optionOne.text}
                              name='radioGroup'
                              value='optionOne'
                              checked={selectedOption.value === 'optionOne'}
                              onChange={handleChange}
                            />
                          </Form.Field>
                          <Form.Field>
                            <Radio
                              label={q.optionTwo.text}
                              name='radioGroup'
                              value='optionTwo'
                              checked={selectedOption.value === 'optionTwo'}
                              onChange={handleChange}
                            />
                          </Form.Field>
                        </Form>
                        <Button
                          color='purple' fluid 
                          style={{marginTop: '5px'}}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
            </div>
          )
        })
      }
    </Container>
  )
}

export default Poll;
