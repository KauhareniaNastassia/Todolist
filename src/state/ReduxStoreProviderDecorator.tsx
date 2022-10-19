import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {taskReducer} from './task-reducer'
import {todolistReducer} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";



const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todolistReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, todoListId: 'todolistId1',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'JS', status: TaskStatuses.New, todoListId: 'todolistId1',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: 'todolistId2',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: 'React Book', status: TaskStatuses.New, todoListId: 'todolistId2',description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)


export const ReduxStoreProviderDecorator = (storeFn: () =>  JSX.Element) => {
    return <Provider store={storyBookStore}> {storeFn()} </Provider>
}