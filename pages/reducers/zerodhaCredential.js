const initialState = { login: false, url: '', reqToken: "", accessToken: "" }
export default function authReducer(state = initialState, action) {
    // Check to see if the reducer cares about this action 
    switch (action.type) {
        case "zerodhaCredential":
            return {
                ...state,
                login: action.payload.login,
                url: action.payload.url,
                reqToken: action.payload.reqToken,
                accessToken: action.payload.accessToken
            };
        default:
            return state;
    }
}