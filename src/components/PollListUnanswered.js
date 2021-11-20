import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Card, Image, Grid, Button, Form, Radio, Header } from 'semantic-ui-react';
import { darkPurple, lighterPurple } from "../utils/colours";
import { saveAnswerAsync } from '../redux/slices/questionsSlice';


const PollListUnanswered = (props) => {
  const dispatch = useDispatch();

  const { currentUser, allUsers } = useSelector(state => state.users);
  const { id, author, optionOneText, optionTwoText } = props;
  
  const [selectedOption, setSelectedOption] = useState({});

  const authorDetails = Object.keys(allUsers)
    .filter((user) => allUsers[user].id === author)
    .map(filteredUser => {
      return { 
        name: allUsers[filteredUser].name, 
        avatar: allUsers[filteredUser].avatarURL.default 
      };
    });
  
  const handleChange = (e, { value }) => {
    setSelectedOption({ value });
  };
  
  const handleSubmit = () => {
    const value = selectedOption.value
    if (!value) {
      alert('Click an option!!')
    } else {
      console.log('submit: ',{authedUser: currentUser, qid: id, answer: value})
      dispatch(
        saveAnswerAsync({authedUser: currentUser, qid: id, answer: value})
      );
    }
  };


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
                    checked={selectedOption.value === 'optionOne'}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label={optionTwoText}
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
