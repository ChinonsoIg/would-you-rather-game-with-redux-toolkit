import React from 'react';
import { Card, Grid, Header, Image } from "semantic-ui-react";
import { darkPurple, darkerPurple } from "../utils/colours";

const LeaderboardSlice = (props) => {
  const { name, avatarURL, questionsCreated, questionsAnswered, score } = props;

  return (
    <Card fluid raised>
      <Card.Content>
        <Grid columns='equal' divided='vertically'>
          <Grid.Column>
            <Image src={avatarURL} size='tiny' circular alt={`${name} .jpg`} />
          </Grid.Column>
          <Grid.Column textAlign='justified' width={8}>
            <Header as='h4' content={name} style={{color: darkPurple}} />
            <Grid.Row className='flex-justified' style={{color: darkerPurple}}>
              <p>Answered questions</p>
              <p>{questionsAnswered}</p>
            </Grid.Row>
            <Grid.Row className='flex-justified' style={{color: darkerPurple}}>
                <p>Created questions</p>
                <p>{questionsCreated}</p>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <Card fluid raised>
              <Card.Content textAlign='center' style={{margin: '5px auto', padding: '0'}}>
                <Header as='h4' content='Score' style={{color: darkPurple}} />
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
