import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  async (payload) => {
    // const response = await saveQuestionAnswer({payload})
    // console.log('res: ', response)
    // return response
    // const res = await _saveQuestionAnswer({payload})
    const { authedUser, qid, answer } = payload
    console.log('res: ', authedUser, qid, answer)

    const res = await _saveQuestionAnswer({authedUser, qid, answer})

    return res;
    
  }
)

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    loading: 'idle',
    questions: {},
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
      console.log(action.payload)
      // state.questions = { ...state.questions, ...action.payload }
    })
  }
})


// const { questionsLoading, questionsReceived } = questionsSlice.actions

// export const fetchQuestions = () => async (dispatch) => {
//   dispatch(questionsLoading())
//   const response = await getInitialQuestions()
//   dispatch(questionsReceived(response))
// }

export default questionsSlice.reducer;