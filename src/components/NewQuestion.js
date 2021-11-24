import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Button, Card, Container, Divider, Header, Input } from 'semantic-ui-react';
import { lighterPurple, darkPurple } from '../utils/colours';
import { addQuestionAsync } from "../redux/slices/combinedSlice";

const NewQuestion = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authedUser = useSelector(state => state.combined.authedUser);

  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');

  const handleSubmit = () => {
    if (!optionOneText || !optionTwoText) {
      // todo add message bar
      alert('Type something!!')
    } else {
      const question = {
        author: authedUser, 
        optionOneText, 
        optionTwoText
      }
      dispatch(
        addQuestionAsync(question)
      );
    }

    setTimeout(() => { 
      history.push('/')
     }, 1000);
    
  }
  
  return (
    <Container>
      <Card fluid>
        <Card.Content style={{backgroundColor: lighterPurple}}>
          <Header as='h4' style={{color: darkPurple}}>
            Create New Question
          </Header>
        </Card.Content>
        <Card.Content>
          <Card.Description textAlign='left' style={{color: darkPurple}}>
            Complete the question:
          </Card.Description>
          <Header as='h5' textAlign='left' style={{color: darkPurple}}>
            Would you rather .....
          </Header>
          <Input 
            fluid 
            className='my-input' 
            placeholder='Enter option one'
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)} 
          />
          <Divider horizontal style={{color: darkPurple}}>or</Divider>
          <Input 
            fluid 
            className='my-input' 
            placeholder='Enter option two'
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
          />
          <Button 
            fluid 
            color='purple' 
            style={{margin: '10px auto 2px'}}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default NewQuestion;