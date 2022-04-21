import counterReducer from "./counter/slice";
import modalReducer from "./modal/slice";

const rootReducer = {
  counter: counterReducer,
  modal: modalReducer,
};

export default rootReducer;
