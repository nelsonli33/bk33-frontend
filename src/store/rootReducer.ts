import counterReducer from "./counter/slice";
import modalReducer from "./modal/slice";
import authReducer from "./auth/slice";

const rootReducer = {
  counter: counterReducer,
  modal: modalReducer,
  auth: authReducer,
};

export default rootReducer;
