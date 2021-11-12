import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { getInitialQuestions } from "../../utils/api";
import { _saveQuestionAnswer } from "../../utils/_DATA";

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const fetchQuestionsAsync = createAsyncThunk(
  'questions/fetchAll',
  async () => {
    const response = await getInitialQuestions()
    return response
  }
);

export const saveQuestionAnswerAsync = createAsyncThunk(
  'questions/saveQuestionAnswerAsync',
  // (payload) => {
  //   console.log('payload: ', payload);
  //   return axios.post(saveQuestionAnswer(payload))
  // }
  async (ans) => {
    console.log('await1: ', ans);
    const res = await _saveQuestionAnswer(ans)
    console.log('await2: ', res);

    return res;  
  }
);

// export const fetchQuestions = () => async (dispatch) => {
//   dispatch(questionsLoading())
//   const response = await getInitialQuestions()
//   dispatch(questionsReceived(response))
// }

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    loading: 'idle',
    questions: {},
    answers: [],
  },
  reducers: {
    questionsLoading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    questionsReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.questions = {...action.payload}
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
      state.questions = {...action.payload}
    });
    builder.addCase(saveQuestionAnswerAsync.fulfilled, (state, action) => {
      console.log('action: ',action)
      // state.answers.push(action.payload)
    });
  }
})


// const { questionsLoading, questionsReceived, answersReceived } = questionsSlice.actions

// export const fetchQuestions = () => async (dispatch) => {
//   dispatch(questionsLoading())
//   const response = await getInitialQuestions()
//   dispatch(questionsReceived(response))
// }

// ...state,
//   [action.questionId] : {
//       ...state[action.questionId],
//       [action.answer]: {
//           ...state[action.questionId][action.answer],
//           votes: state[action.questionId][action.answer].votes.concat([action.authedUser])
//       }
//   }

export default questionsSlice.reducer;