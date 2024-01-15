// quizReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: [],
  questionSkipped: 0,
  loading: false,
  error: null,
  earnedPoints: 0,
  user: [],
  profileImage: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchQuestionsRequest: (state) => {
      state.loading = true;
    },
    fetchQuestionsSuccess: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },
    fetchQuestionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    submitAnswer: (state, action) => {
      state.userAnswers.push(action.payload);
      state.currentQuestionIndex += 1;
    },
    submitSkip: (state) => {
      state.questionSkipped += 1;
    },
    updateEarnedPoints: (state, action) => {
      state.earnedPoints += action.payload;
    },
    updateUser: (state, action) => {
      state.user.push(action.payload);
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    resetQuiz: (state) => {
      const { earnedPoints, user, profileImage } = state;
      return { ...initialState, earnedPoints, user, profileImage };
    },
  },
});

export const {
  fetchQuestionsRequest,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  setCurrentQuestion,
  submitAnswer,
  resetQuiz,
  submitSkip,
  updateEarnedPoints,
  updateUser,
  setProfileImage
} = quizSlice.actions;

export default quizSlice.reducer;
