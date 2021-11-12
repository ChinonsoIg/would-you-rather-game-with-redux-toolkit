import React from 'react';
import { Button, Card, Container, Divider, Header, Input } from 'semantic-ui-react';
import { lighterPurple } from '../utils/colours';

const NewQuestion = () => {
  return (
    <Container>
      <Card fluid>
        <Card.Content style={{backgroundColor: lighterPurple}}>
          <Card.Header>Create New Question</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Description textAlign='left'>
            Complete the question:
          </Card.Description>
          <Header textAlign='left'>
            Would you rather .....
          </Header>
          <Input fluid placeholder='Enter option one' />
          <Divider horizontal>or</Divider>
          <Input fluid placeholder='Enter option two' />
          <Button fluid color='purple'>Under implementation</Button>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default NewQuestion;
