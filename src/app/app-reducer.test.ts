import {appReducer, InitialStateType, setAppErrorAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error:null,
        status: 'idle',
        isInitialized: true
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('someError')
})