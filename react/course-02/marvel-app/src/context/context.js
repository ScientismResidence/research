import { createContext, useContext, useReducer } from "react";

export class AppActionType {
    static UpdateRandomCharacter = "UpdateRandomCharacter";
    static ToggleIsSomething = "ToggleIsSomething";
}

const initial = {
    randomCharacter: {
        id: -1,
        name: "Name",
        description: null,
        thumbnail: null,
        homepage: null,
        wiki: null,
        comics: []
    },
    isSomething: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case AppActionType.UpdateRandomCharacter:
            return { ...state, randomCharacter: action.payload }
        case AppActionType.ToggleIsSomething:
            return { ...state, isSomething: !state.isSomething }
        default:
            throw new Error(`Unknown AppActionType [${action.type}]`)
    }
}

export const AppContext = createContext(initial);
const { Provider } = AppContext;

const useAppContext = () => {
    return useContext(AppContext);
}

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const context = { ...state, dispatch };
    return <Provider value={context}>{children}</Provider>
}

export default useAppContext;