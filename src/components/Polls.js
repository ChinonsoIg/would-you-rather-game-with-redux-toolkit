import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Divider, Grid, Button } from 'semantic-ui-react';
import { lightGrey } from "../utils/colours";

const Polls = () => {
  return (
    <Card fluid raised>
      <Card.Content style={{backgroundColor: lightGrey}}>
        <Card.Header textAlign='left'>Matthew says:</Card.Header>
      </Card.Content>    
      <Card.Content>
        <Grid divided verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' size='medium' circular />
            </Grid.Column>
            <Grid.Column width={11}>
              <h5>Would you rather</h5>
              <p>... save for summer ...</p>
              <Button as={Link} to={`/question/id`} basic color='teal' fluid>
                View Poll
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default Polls;
