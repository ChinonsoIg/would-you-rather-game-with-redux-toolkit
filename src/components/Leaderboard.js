import React from 'react'
import { Container } from 'semantic-ui-react';
import LeaderboardSlice from "./LeaderboardSlice";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  // const questions = useSelector(state => state.questions.questions);
  const { allUsers } = useSelector(state => state.users);

  const usersDetails = Object.keys(allUsers)
    .map((user) => {
        const mapUserDetails = {
          id: allUsers[user].id,
          name: allUsers[user].name,
          avatarURL: allUsers[user].avatarURL.default,
          questionsCreated: allUsers[user].questions.length,
          questionsAnswered: Object.keys(allUsers[user].answers).length
        }
        const rank = mapUserDetails.questionsAnswered + mapUserDetails.questionsCreated;
        
        // add rank to mapUserDetails
        mapUserDetails.rank = rank;
        
        return (mapUserDetails)
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
