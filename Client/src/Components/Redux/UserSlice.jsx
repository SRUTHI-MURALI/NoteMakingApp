import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentState {
  student: string;
}

const initialState: StudentState = {
  student: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.student = action.payload;
    },
    logout: (state) => {
      state.student = "";
      localStorage.removeItem("studentData");
    },
  },
});

export const { login, logout } = studentSlice.actions;
export const selectStudent = (state: { student: StudentState }) =>
  state.student.student;

export default studentSlice.reducer;
