import React, {useCallback, useEffect} from 'react';

import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterPropsType, TodolistDomainType} from "../todolist-reducer";
import {getTasksThunkCreator} from "../task-reducer";
import {useAppDispatch} from "../../../state/hooks";
import {Button, IconButton} from "@mui/material";
import {Delete} from '@mui/icons-material';

type TodolistPropsType = {
    todolist: TodolistDomainType

    tasks: Array<TaskType>
    removeTask: (id: string, todoId: string) => void
    changeFilter: (todoId: string, value: FilterPropsType) => void
    addTask: (todoId: string, title: string) => void
    changeStatus: (id: string, status: TaskStatuses, todoId: string) => void

    removeTodolist: (todoId: string) => void
    changeTaskTitle: (todoId: string, id: string, inputTitle: string) => void
    changeTodolistTitle: (todoId: string, newTodoTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {

    const dispatch = useAppDispatch()

    let onClickAllHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, 'all')
    }, [props])

    let onClickActiveHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, 'active')
    }, [props])

    let onClickCompletedHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, 'completed')
    }, [props])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props])

    let removeTodolistHandler = () => {
        props.removeTodolist(props.todolist.id)
    }

    const onChangeTodolistTitleHandler = useCallback((newTodoTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTodoTitle)
    }, [props])


    let tasks = props.tasks
    if (props.todolist.filter === 'active') {
        tasks = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
    }


    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTasksThunkCreator(props.todolist.id))
    }, [demo, dispatch, props.todolist.id])


    return (
        <div>
            <h3>
                <EditableSpan value={props.todolist.title} onChange={onChangeTodolistTitleHandler}/>
                <IconButton disabled={props.todolist.entityStatus === 'loading'} onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks?.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                todolistId={props.todolist.id}
                                task={task}
                                removeTask={props.removeTask}
                                changeStatus={props.changeStatus}
                                changeTaskTitle={props.changeTaskTitle}

                            />
                        )
                    })}
            </div>
            <div style={{paddingTop: '10px'}}>

                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onClickAllHandler}
                        color={'inherit'}> All </Button>

                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onClickActiveHandler}
                        color={'primary'}>Active
                </Button>

                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onClickCompletedHandler}
                        color={'secondary'}>Completed
                </Button>

            </div>
        </div>
    );
})

