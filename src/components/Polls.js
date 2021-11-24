import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Image, Grid, Button, Header } from 'semantic-ui-react';
import { darkPurple, lighterPurple } from "../utils/colours";
import { sliceFxn } from "../utils/helpers";

const Polls = (props) => {
  const users = useSelector(state => state.combined.users)
  const { id, author, optionOne } = props;

  const userDetails = Object.keys(users).filter((user) => users[user].id === author).map(filteredUser => {
    return { 
      name: users[filteredUser].name, 
      avatar: users[filteredUser].avatarURL.default 
    };
  });
  

  return (
    <Card fluid raised>
      <Card.Content style={{backgroundColor: lighterPurple}}>
        <Header as='h4' textAlign='left' style={{color: darkPurple}}>{userDetails[0].name} says:</Header>
      </Card.Content>
      <Card.Content>
        <Grid divided verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image src={userDetails[0].avatar} size='tiny' circular />
            </Grid.Column>
            <Grid.Column width={11}>
              <Header as='h5' style={{color: darkPurple}}>Would you rather</Header>
              <p>... {sliceFxn(optionOne.text)} ... </p>
              <Button basic color='purple' as={Link} to={`/question/${id}`} fluid>
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
