/*const auth = (state = false, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                value: action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                value: action.payload
            };
        default:
            return state;
    }
};

export default auth;*/
const initialState = { login: false, email: '' }
export default function authReducer(state = initialState, action) {
    // Check to see if the reducer cares about this action 
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                login: action.payload.login,
                email: action.payload.email
            };
        default:
            return state;
    }
}