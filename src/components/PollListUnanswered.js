import React, { useState } from 'react'
// import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Image, Grid, Button, Form, Radio, Header } from 'semantic-ui-react';
import { darkPurple, lighterPurple } from "../utils/colours";
import { saveQuestionAnswerAsync } from '../redux/slices/questionsSlice';


const PollListUnanswered = (props) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.allUsers);
  const authedUser = useSelector(state => state.users.currentUser);
  const { id, author, optionOneText, optionTwoText } = props;
  
  const [state, setState] = useState({});

  const authorDetails = Object.keys(users)
    .filter((user) => users[user].id === author)
    .map(filteredUser => {
      return { 
        name: users[filteredUser].name, 
        avatar: users[filteredUser].avatarURL.default 
      };
    });
  
  const handleChange = (e, { value }) => {
    // console.log('e: ',e.label)
    setState({ value })
  };
  
  const handleSubmit = () => {
    const value = state.value
    console.log('submit: ',{authedUser, qid: id, answer: value})
    dispatch(
      saveQuestionAnswerAsync({authedUser, qid: id, answer: value})
    );
  }

  return (
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
                    label={optionOneText}
                    name='radioGroup'
                    value='optionOne'
                    checked={state.value === 'optionOne'}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label={optionTwoText}
                    name='radioGroup'
                    value='optionTwo'
                    checked={state.value === 'optionTwo'}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Form>
              <Button
                color='purple' fluid 
                style={{marginTop: '5px'}}
                onClick={handleSubmit}
              >
                Under implementation
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default PollListUnanswered;
