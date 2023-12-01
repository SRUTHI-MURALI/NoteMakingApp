/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";

import StudentSlice from "../ReduxComponents/StudentSlice";
import TutorSlice from "../ReduxComponents/TutorSlice";
import AdminSlice from "../ReduxComponents/AdminSlice";

export default configureStore({
  reducer: {
    student: StudentSlice,
    tutor: TutorSlice,
    admin:AdminSlice,
  },
});
