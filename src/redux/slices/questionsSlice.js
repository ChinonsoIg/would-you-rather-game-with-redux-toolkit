import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _saveQuestionAnswer, _getQuestions, _saveQuestion } from "../../utils/_DATA";


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
      console.log('res1: ', authedUser, qid, answer);
      // const response = 
      await _saveQuestionAnswer({ authedUser, qid, answer })
      // console.log('res2: ', response);
      return { authedUser, qid, answer };
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    loading: 'idle',
    questions: {},
  },
  reducers: {
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
    builder.addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
      state.questions = action.payload;
		})

    // to add question
		builder.addCase(addQuestionAsync.fulfilled, (state, action) => {
      state.questions = {
        ...state.questions,
        [action.payload.id]: action.payload
      }
		})
    builder.addCase(addQuestionAsync.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error.message
      }
    })

    // to add answer
    builder.addCase(saveAnswerAsync.fulfilled, (state, action) => {
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


export const { questionsLoading, questionsReceived } = questionsSlice.actions;

export default questionsSlice.reducer;
