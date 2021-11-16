import { 
  // _getUsers,
  // _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";


// export const getInitialUsers = () => {

//   return Promise.all([
//     _getUsers(),
//   ]).then(([ users ]) => {
//     return users;
//   })
// };

// export const getInitialQuestions = () => {

//   return Promise.all([
//     _getQuestions(),
//   ]).then(([ questions ]) => {
//     return { questions };
//   })
// };


export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer (ans) {
  console.log('ans: ',ans)
  return _saveQuestionAnswer(ans)
}