import React from 'react';
import { Card, Container, Grid, Header, Image, Segment, Progress } from 'semantic-ui-react';
import { lightGrey } from "../utils/colours";

const PollResult = () => {
  return (
    <Container>
      <Card fluid raised>
        <Card.Content style={{backgroundColor: lightGrey}}>
          <Card.Header textAlign='left'>Asked by Matthew</Card.Header>
        </Card.Content>
        <Card.Content>
          <Grid verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' size='medium' circular />
              </Grid.Column>
              <Grid.Column width={11} textAlign='left'>
                <Header as='h2'>Results:</Header>
                <Segment>
                  <b>find yourself $50</b>
                  <Progress value='4' total='5' progress='percent' style={{marginTop: '10px'}} />
                </Segment>
                <Segment style={{backgroundColor: 'teal'}}>
                  <b>Have your friend find $50</b>
                  <Progress value='1' total='5' progress='percent' style={{marginTop: '10px'}} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default PollResult;
