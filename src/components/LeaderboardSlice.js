import React from 'react';
import { Card, Grid, Header, Image } from "semantic-ui-react";

const LeaderboardSlice = () => {
  
  return (
    <Card fluid raised>
      <Card.Content>
        <Grid columns='equal'>
          <Grid.Column>
            <Image />
          </Grid.Column>
          <Grid.Column textAlign='justified' width={8}>
            <Header as='h3' content='Bob' />
            <Grid.Row className='flex-justified'>
              <p>Answered questions</p>
              <p>4</p>
            </Grid.Row>
            <Grid.Row className='flex-justified'>
                <p>Unanswered questions</p>
                <p>2</p>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Card fluid raised>
              <Card.Content>
                <Card.Header>Score</Card.Header>
              </Card.Content>
              <Card.Content style={{ display: 'grid', placeItems: 'center' }} >
                <div className='circle'>5</div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default LeaderboardSlice;
