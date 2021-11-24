import { Container, Tab } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import Polls from "../components/Polls";
import { darkPurple } from '../utils/colours';


const Home = () => {
  const questions = useSelector(state => state.combined.questions);
  const authedUser = useSelector(state => state.combined.authedUser);

  const unansweredQuestions = Object.keys(questions)
    .filter((i) => (
        !questions[i].optionOne.votes.includes(authedUser) &&
        !questions[i].optionTwo.votes.includes(authedUser)
    ))
    .sort((a,b) => (
        questions[b].timestamp - questions[a].timestamp
    ))
    .map(question => {
      const mapUnansweredQuestions = {
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
    return mapUnansweredQuestions;
    });
  
  const answeredQuestions = Object.keys(questions)
    .filter((i) => (
      questions[i].optionOne.votes.includes(authedUser) ||
      questions[i].optionTwo.votes.includes(authedUser)
    ))
    .sort((a,b) => (
      questions[b].timestamp - questions[a].timestamp
    ))
    .map(question => {
      const mapUnansweredQuestions = {
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
    return mapUnansweredQuestions;
    });


  const panes = [
    { 
      menuItem: 'Unanswered Questions', 
      render: () => 
        <Tab.Pane style={{color: darkPurple}}>
          {
            unansweredQuestions.length === 0 
              ? (
                <>
                  <p>No more unanswered questions!</p>
                  <p>Click New Question to add more</p>
                </>
              ) : (
                unansweredQuestions.map(q => (
                  <div key={q.id} className='list'>
                    <Polls 
                      id={q.id}
                      author={q.author}
                      optionOne={q.optionOne}
                      optionTwo={q.optionTwo}
                    />
                  </div>
                ))
              )
          }
        </Tab.Pane> 
    },
    { 
      menuItem: 'Answered Questions', 
      render: () => 
        <Tab.Pane  style={{color: 'darkPurple'}}>
          {
            answeredQuestions.length === 0 
              ? (
                <>
                  <p>Answered questions will appear here.</p>
                  <p>You have not answered any questions yet!</p>
                </>
              ) : (
                answeredQuestions.map(q => (
                  <div key={q.id} className='list'>
                    <Polls 
                      id={q.id}
                      author={q.author}
                      optionOne={q.optionOne}
                      optionTwo={q.optionTwo}
                    />
                  </div>
                ))
              )
          }
        </Tab.Pane> 
    },
  ];
  
  return (
    <Container>
      <Tab 
        menu={{ widths: 2, color: 'purple', attached: true, tabular: false, pointing: true }}
        panes={panes} 
      />
    </Container>
  );
}

export default Home;