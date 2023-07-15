const initialState = { userId: '', email: '' }
export default function authReducer(state = initialState, action) {
    // Check to see if the reducer cares about this action 
    switch (action.type) {
        case "userDetails":
            return {
                ...state,
                userId: action.payload.userId,
                email: action.payload.email
            };
        default:
            return state;
    }
}