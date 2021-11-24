import React from 'react'
import { Container } from 'semantic-ui-react';
import { useSelector } from "react-redux";
import LeaderboardSlice from "./LeaderboardSlice";

const Leaderboard = () => {
  const { users } = useSelector(state => state.combined);

  const usersDetails = Object.keys(users)
    .map((user) => {
        const mapUserDetails = {
          id: users[user].id,
          name: users[user].name,
          avatarURL: users[user].avatarURL.default,
          questionsCreated: users[user].questions.length,
          questionsAnswered: Object.keys(users[user].answers).length
        }
        const rank = mapUserDetails.questionsAnswered + mapUserDetails.questionsCreated;
        
        // add rank to mapUserDetails
        mapUserDetails.rank = rank;
        
        return mapUserDetails;
    })
    .sort((a,b) => (b.rank - a.rank))
    

  return (
    <Container>
      {
        usersDetails.map(userDetail => (
          <div key={userDetail.id} className='list'>
            <LeaderboardSlice 
              name={userDetail.name}
              avatarURL={userDetail.avatarURL}
              questionsCreated={userDetail.questionsCreated}
              questionsAnswered={userDetail.questionsAnswered}
              score={userDetail.rank}
            />
          </div>
        ))
      }
    </Container>
  );
}

export default Leaderboard;
