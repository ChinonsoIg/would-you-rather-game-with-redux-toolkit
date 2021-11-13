import React from 'react';
import { Button, Card, Container, Divider, Header, Input } from 'semantic-ui-react';
import { lighterPurple, darkPurple } from '../utils/colours';

const NewQuestion = () => {
  return (
    <Container>
      <Card fluid>
        <Card.Content style={{backgroundColor: lighterPurple}}>
          <Header as='h4' style={{color: darkPurple}}>Create New Question</Header>
        </Card.Content>
        <Card.Content>
          <Card.Description textAlign='left' style={{color: darkPurple}}>
            Complete the question:
          </Card.Description>
          <Header as='h5' textAlign='left' style={{color: darkPurple}}>
            Would you rather .....
          </Header>
          <Input fluid className='my-input' placeholder='Enter option one' />
          <Divider horizontal style={{color: darkPurple}}>or</Divider>
          <Input fluid className='my-input' placeholder='Enter option two' />
          <Button fluid color='purple' style={{margin: '10px auto 2px'}}>
            Under implementation
          </Button>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default NewQuestion;
