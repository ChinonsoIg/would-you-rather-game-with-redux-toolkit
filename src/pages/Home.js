import { Container, Tab } from 'semantic-ui-react'
import { useSelector } from "react-redux";
import Polls from "../components/Polls";
import { darkPurple } from '../utils/colours';


const Home = () => {
  const questions = useSelector(state => state.questions.questions);
  const authedUser = useSelector(state => state.users.currentUser);

  console.log('ques: ',questions)

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
            unansweredQuestions.map(q => (
              <li key={q.id}>
                <Polls 
                  id={q.id}
                  author={q.author}
                  optionOne={q.optionOne}
                  optionTwo={q.optionTwo}
                />
              </li>
            ))
          }
        </Tab.Pane> 
    },
    { 
      menuItem: 'Answered Questions', 
      render: () => 
        <Tab.Pane  style={{color: 'darkPurple'}}>
          {
            answeredQuestions.map(q => (
              <li key={q.id}>
                <Polls 
                  id={q.id}
                  author={q.author}
                  optionOne={q.optionOne}
                  optionTwo={q.optionTwo}
                />
              </li>
            ))
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