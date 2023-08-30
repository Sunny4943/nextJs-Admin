import auth from "./auth";
import zerodhaCredential from "./zerodhaCredential";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    auth,
    zerodhaCredential
    //, counter
});
export default rootReducer;