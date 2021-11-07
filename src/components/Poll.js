import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Card, Image, Grid, Button, Form, Radio, Container } from 'semantic-ui-react';
import { lightGrey } from "../utils/colours";


const Poll = () => {
  const [state, setstate] = useState({});
  
  const handleChange = (e, { value }) => {
    console.log('v: ',{value});
    setstate({ value })
  };

  return (
    <Container>
      <Card fluid raised>
        <Card.Content style={{backgroundColor: lightGrey}}>
          <Card.Header textAlign='left'>Matthew says:</Card.Header>
        </Card.Content> 
        <Card.Content>
          <Grid verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' size='medium' circular />
              </Grid.Column>
              <Grid.Column width={11} textAlign='left'>
                <h3>Would you rather ...</h3>
                <Form>
                  <Form.Field>
                    <Radio
                      label='Choose this'
                      name='radioGroup'
                      value='optionOne'
                      checked={state.value === 'optionOne'}
                      onChange={handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Or that'
                      name='radioGroup'
                      value='optionTwo'
                      checked={state.value === 'optionTwo'}
                      onChange={handleChange}
                    />
                  </Form.Field>
                </Form>
                <Button /*</Grid.Column>as={Link} to={`/question/id`}*/ color='teal' fluid style={{marginTop: '5px'}}>
                  Submit
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default Poll;
