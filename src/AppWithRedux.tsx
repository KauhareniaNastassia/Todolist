import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    addTodolistAC,
    changeTodolistFilterACType,
    changeTodolistTitleAC,
    FilterPropsType,
    getTodolistsThunkCreator,
    removeTodolistAC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {
    addTasksThunkCreator,
    changeTaskTitleAC,
    deleteTasksThunkCreator,
    updateTaskThunkCreator
} from "./state/task-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {useAppDispatch} from "./state/hooks";

export type TasksPropsType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksPropsType>(state => state.tasks)

    const dispatch = useAppDispatch()


    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTasksThunkCreator(taskId, todolistId))
        /*let action = removeTaskAC(todoId, id)
        dispatch(action)*/
    }, [])

    const changeFilter = useCallback((todoId: string, value: FilterPropsType) => {
        let action = changeTodolistFilterACType(todoId, value)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((taskTitle: string, todolistId: string) => {
        dispatch(addTasksThunkCreator(todolistId, taskTitle))
        /*let action = addTaskAC(title, todoId)
        dispatch(action)*/
    }, [])


    /*const changeStatus = useCallback((todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskThunkCreator(todoId, taskId, status))
       /!* let action = changeTaskStatusAC(todoId, id, status)
        dispatch(action)*!/
    }, [])*/

// санка универсальная, но колбэки будут разные для каждого изменяемого в таске свойства
    /*const changeStatus = useCallback((todoId: string, taskId: string, title: string) => {
        dispatch(updateTaskThunkCreator(todoId, taskId, {title}))
    }, [])*/
    const changeStatus = useCallback((todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskThunkCreator(todoId, taskId, {status}))
    }, [])



    const removeTodolist = useCallback((todoId: string) => {
        let action = removeTodolistAC(todoId)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((newTodoTitle: string) => {
        let action = addTodolistAC(newTodoTitle)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((todoId: string, id: string, inputTitle: string) => {
        let action = changeTaskTitleAC(todoId, id, inputTitle)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((todoId: string, newTodoTitle: string) => {
        let action = changeTodolistTitleAC(todoId, newTodoTitle)
        dispatch(action)
    }, [dispatch])



    useEffect( () => {
        dispatch(getTodolistsThunkCreator())
    }, [] )


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todolists.map(tl => {

                    return <Todolist
                        key={tl.id}
                        todoId={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default AppWithRedux;