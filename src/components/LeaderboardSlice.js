import React from 'react';
import { Card, Grid, Header, Image, Divider } from "semantic-ui-react";

const LeaderboardSlice = (props) => {
  const { name, avatarURL, questionsCreated, questionsAnswered, score } = props;

  return (
    <Card fluid raised>
      <Card.Content>
        <Grid columns='equal'>
          <Grid.Column>
            <Image src={avatarURL} size='tiny' circular alt={`${name} .jpg`} />
          </Grid.Column>
          <Divider vertical ></Divider>
          <Grid.Column textAlign='justified' width={8}>
            <Header as='h4' content={name} />
            <Grid.Row className='flex-justified'>
              <p>Answered questions</p>
              <p>{questionsAnswered}</p>
            </Grid.Row>
            <Grid.Row className='flex-justified'>
                <p>Unanswered questions</p>
                <p>{questionsCreated}</p>
            </Grid.Row>
          </Grid.Column>
          <Divider vertical ></Divider>
          <Grid.Column>
            <Card fluid raised>
              <Card.Content textAlign='center' style={{margin: '5px auto', padding: '0'}}>
                <Header as='h4' content='Score' />
              </Card.Content>
              <Card.Content style={{ display: 'grid', placeItems: 'center' }} >
                <div className='circle'>{score}</div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default LeaderboardSlice;
