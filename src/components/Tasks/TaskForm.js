import React, {useState, useEffect} from "react"
import { useHistory, useParams } from "react-router-dom"


export const TaskForm = () => {

    const [plant, set] = useState({})  // State variable for current plant object
    const { plantId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    const [task, updateTask] = useState({
        todoDescription: "",
        plantId: ""
    })
    
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/plants/${plantId}?_expand=plantType&_embed=tasks`)
                .then(res => res.json())
                .then(data => set(data))  
        },
        [ plantId ]  // Above function runs when the value of plantId change
    )

    const submitTask = (event) => {
        event.preventDefault()
        
        const newTask = {
            todoDescription: task.todoDescription,
            plantId:parseInt(plant.id)   
        }
        
        // Add the task obj to the database.
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }

        return fetch("http://localhost:8088/tasks", fetchOption)
            .then(() => {
                history.push(`/plants/${plant.id}`)
            })
    }



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