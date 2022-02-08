import React, {useState, useEffect} from "react"
import { useHistory } from "react-router-dom"

export const TaskForm = () => {

    const [plants, choosePlants] = useState([])
    const [task, updateTask] = useState({
        todoDescription: "",
        plant: ""
    })

    const history = useHistory()

    const submitTask = (event) => {
        event.preventDefault()
        
        const newTask = {
            todoDescription: task.todoDescription,
            plantId:parseInt(task.plant)   
        }
        
        // Add the plant obj to the database.
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }

        return fetch("http://localhost:8088/tasks", fetchOption)
            .then(() => {
                history.push("/tasks")
            })
    }

    useEffect(
        () => {
            fetch("http://localhost:8088/plants")
            .then(res => res.json())
            .then((plantsFromAPI) => {
                    choosePlants(plantsFromAPI)
            })
        },
        []
    )


    return (
        <form className="taskForm">
            <h2 className="taskForm__title">New Task</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text" id="taskdescription"
                        className="form-control"
                        placeholder="Description of task"
                        onChange={
                            (evt) => {
                                const copy = {...task}
                                copy.todoDescription = evt.target.value
                                updateTask(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <button onClick={submitTask} className="btn btn-primary">
                Submit Task
            </button>
        </form>
    )
}