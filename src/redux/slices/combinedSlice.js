import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../../utils/_DATA";

export const getUsersAsync = createAsyncThunk(
	'users/getUsersAsync',
	async () => {
		const users = await _getUsers();
    return users;
	}
);

export const fetchQuestionsAsync = createAsyncThunk(
  'questions/fetchAll',
  async () => {
    const response = await _getQuestions();
    return response;
  }
);


export const addQuestionAsync = createAsyncThunk(
  'questions/addQuestionAsync',
  async (question, { rejectWithValue }) => {
    try {
      const response = await _saveQuestion(question);
      return response;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response);
    }
  }
);

    
export const saveAnswerAsync = createAsyncThunk(
  'questions/saveAnswerAsync',
  async ({ authedUser, qid, answer }, { rejectWithValue }) => {
    try {
      await _saveQuestionAnswer({ authedUser, qid, answer })
      return { authedUser, qid, answer };
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const combinedSlice = createSlice({
  name: 'combined',
  initialState: {
    loading: 'idle',
    authedUser: null,
    users: {},
    questions: {},
  },
  reducers: {
    login: (state, action) => {
      state.authedUser = action.payload;
		},
    logout: (state) => {
      state.authedUser = null;
		},
    questionsLoading: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    questionsReceived: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.questions = { ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // to fetch users
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload
    })

    // to fetch questions
    builder.addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
      state.questions = action.payload;
		})

    // to dispatch question
		builder.addCase(addQuestionAsync.fulfilled, (state, action) => {
      // to add question to questions object
      state.questions = {
        ...state.questions,
        [action.payload.id]: action.payload
      }

      // to add question to users object
      state.users = {
        ...state.users,
        [action.payload.author]: {
          ...state.users[action.payload.author],
          questions: state.users[action.payload.author].questions.concat([action.payload.id])
        }
      }
		})
    builder.addCase(addQuestionAsync.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error.message
      }
    })


    // to dispatch answer
    builder.addCase(saveAnswerAsync.fulfilled, (state, action) => {
      // to add answer to questions object
      state.questions = {
        ...state.questions,
          [action.payload.qid] : {
            ...state.questions[action.payload.qid],
            [action.payload.answer]: {
              ...state.questions[action.payload.qid][action.payload.answer],
              votes: state.questions[action.payload.qid][action.payload.answer].votes.concat([action.payload.authedUser])
            }
          }
      }

      // to add answer to users object
      state.users = {
        ...state.users,
        [action.payload.authedUser]: {
          ...state.users[action.payload.authedUser],
          answers: {
            ...state.users[action.payload.authedUser].answers,
            [action.payload.qid]: action.payload.answer
          }
        }
      }
		})
    builder.addCase(saveAnswerAsync.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error.message
      }
    })
  }
})


export const { login, logout, questionsLoading, questionsReceived } = combinedSlice.actions;

export default combinedSlice.reducer;
