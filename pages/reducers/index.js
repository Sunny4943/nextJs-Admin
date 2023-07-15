import auth from "./auth";
import counter from "./counter";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    auth
    //, counter
});
export default rootReducer;