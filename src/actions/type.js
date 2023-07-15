const login = (textObj) => {
    return {
        type: "LOGIN",
        payload: textObj
    };
};
export {
    login
}
