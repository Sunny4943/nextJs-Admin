
export function loadState() {
    try {
        let serializedState = localStorage.getItem("Test");

        if (serializedState === null) {
            return this.initializeState();
        }

        return JSON.parse(serializedState);
    }
    catch (err) {
        return this.initializeState();
    }
}

export function saveState(state) {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem("ReduxStore", serializedState);
    }
    catch (err) {
    }
}

export function initializeState() {
    return {
        //state object
    }
};


