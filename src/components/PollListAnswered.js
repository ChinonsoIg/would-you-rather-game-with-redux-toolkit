import React from 'react';
import { useSelector } from "react-redux";
import { Card, Grid, Header, Image, Segment, Progress } from 'semantic-ui-react';
import { darkPurple, lighterPurple, lightPurple, white } from "../utils/colours";

const PollListAnswered = (props) => {
  const { author, optionOneText, optionTwoText, optionOneVotes, optionTwoVotes, totalVotes, optionOneColor, optionTwoColor } = props;

  const users = useSelector(state => state.users.allUsers);

  const authorDetails = Object.keys(users)
    .filter((user) => users[user].id === author)
    .map(filteredUser => {
      return { 
        name: users[filteredUser].name, 
        avatar: users[filteredUser].avatarURL.default 
      };
    });

  return (
    <Card fluid raised>
      <Card.Content style={{backgroundColor: lighterPurple}}>
        <Header as='h4' textAlign='left' style={{color: darkPurple}}>Asked by {authorDetails[0].name}</Header>
      </Card.Content>
      <Card.Content>
        <Grid verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={authorDetails[0].avatar} size='medium' circular />
            </Grid.Column>
            <Grid.Column width={11} textAlign='left'>
              <Header as='h4' style={{color: darkPurple}}>Results:</Header>
              <Segment style={{backgroundColor: optionOneColor ? lightPurple : white}}>
                <p>{optionOneText}</p>
                <Progress 
                  value={optionOneVotes} 
                  total={totalVotes} 
                  progress='percent' 
                  color='purple' 
                  style={{margin: '10px 0'}} 
                />
                <p>{`${optionOneVotes} out of ${totalVotes} votes`}</p>
              </Segment>
              <Segment style={{backgroundColor: optionTwoColor ? lightPurple : white}}>
                <p>{optionTwoText}</p>
                <Progress 
                  value={optionTwoVotes} 
                  total={totalVotes} 
                  progress='percent' 
                  color='purple' 
                  style={{margin: '10px 0'}} 
                />
                <p>{`${optionTwoVotes} out of ${totalVotes} votes`}</p>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  )
}

export default PollListAnswered;
