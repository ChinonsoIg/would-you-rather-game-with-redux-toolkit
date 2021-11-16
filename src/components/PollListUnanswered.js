import React, { useState } from 'react'
// import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Image, Grid, Button, Form, Radio, Header } from 'semantic-ui-react';
import { darkPurple, lighterPurple } from "../utils/colours";
import { saveAnswer } from '../redux/slices/questionsSlice';


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
    if (!value) {
      alert('Click an option!!')
    } else {
      console.log('submit: ',{authedUser, qid: id, answer: value})
      dispatch(
        saveAnswer({authedUser, qid: id, answer: value})
      );
    }
  }

  // const handleUpdateAnswer = async (formikHelpers) => {
  //   const value = state.value
  //   const resultAction = await dispatch(saveAnswerAsync({ authedUser, qid: id, answer: value }));

  //   if (saveAnswerAsync.fulfilled.match(resultAction)) {
  //     // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
  //     const answer = resultAction.payload
  //     console.log('success', `Updated ${answer}`)
  //   } else {
  //     if (resultAction.payload) {
  //       // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
  //       formikHelpers.setErrors(resultAction.payload.field_errors)
  //     } else {
  //       console.log('error', `Update failed: ${resultAction.error}`)
  //     }
  //   }
  // }

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
