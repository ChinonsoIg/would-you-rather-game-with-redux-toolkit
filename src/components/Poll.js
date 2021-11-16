import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from 'semantic-ui-react';
import PollListUnanswered from "./PollListUnanswered";
import PollListAnswered from './PollListAnswered';


const Poll = () => {
  const questions = useSelector(state => state.questions.questions);
  const authedUser = useSelector(state => state.users.currentUser);
  
  const params = useParams();
  const { id } = params;
  
  const pollView = Object.keys(questions)
    .filter((i) => (
      questions[i].id === id
    ))
    .map(question => {
      const mapPollView = {
        id: questions[question].id,
        author: questions[question].author,
        optionOne: {
          votes: questions[question].optionOne.votes,
          text: questions[question].optionOne.text,
        },
        optionTwo: {
          votes: questions[question].optionTwo.votes,
          text: questions[question].optionTwo.text,
        }
      }
      return mapPollView;
    });

  
    useEffect(() => {
     
    }, [id])

  if (
    pollView[0].optionOne.votes.includes(authedUser) ||
    pollView[0].optionTwo.votes.includes(authedUser)
    ) {
      return (
        <Container>
          {
            pollView.map((q) => {
              let optionOneVotes = q.optionOne.votes.length;
              let optionTwoVotes = q.optionTwo.votes.length;
              let totalVotes = optionOneVotes + optionTwoVotes;
              let optionOneColor = q.optionOne.votes.includes(authedUser);
              let optionTwoColor = q.optionTwo.votes.includes(authedUser);
              return (
                <div key={q.id}>
                  <PollListAnswered
                    id={q.id}
                    author={q.author}
                    optionOneText={q.optionOne.text}
                    optionTwoText={q.optionTwo.text}
                    optionOneVotes={optionOneVotes}
                    optionTwoVotes={optionTwoVotes}
                    totalVotes={totalVotes}
                    optionOneColor={optionOneColor}
                    optionTwoColor={optionTwoColor}
                  />
                </div>
              )
            })
          }
        </Container>
      );
    }

  return (
    <Container>
      {
        pollView.map((q) => (
          <div key={q.id}>
            <PollListUnanswered
              id={q.id}
              author={q.author}
              optionOneText={q.optionOne.text}
              optionTwoText={q.optionTwo.text}
            />
          </div>
        ))
      }
    </Container>
  )
}

export default Poll;
