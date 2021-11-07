import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInitialQuestions } from "../../utils/api";

export const fetchQuestionsAsync = createAsyncThunk(
  'questions/fetchAll',
  async () => {
    const response = await getInitialQuestions()
    return response
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
    })
  }
})


const { questionsLoading, questionsReceived } = questionsSlice.actions

// export const fetchQuestions = () => async (dispatch) => {
//   dispatch(questionsLoading())
//   const response = await getInitialQuestions()
//   dispatch(questionsReceived(response))
// }

export default questionsSlice.reducer;