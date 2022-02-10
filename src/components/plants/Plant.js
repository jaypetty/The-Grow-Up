import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const Plant = () => {
    const [plant, set] = useState({})  // State variable for current plant object
    const { plantId } = useParams()  // Variable storing the route parameter
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/plants/${plantId}?_expand=plantType&_embed=tasks`)
                .then(res => res.json())
                .then(data => set(data))  
        },
        [ plantId ]  // Above function runs when the value of plantId change
    )

    const deletePlant = (plantid) => {
        fetch(`http://localhost:8088/plants/${plantid}`, {
          method: "DELETE"
        }).then(() => Plant())
    }    
    
    return (
        <>
            <section className="plant">
                <h1 className="plant__name">{plant.name}</h1>
                <div className="plant__watering">Watering Requirements: {plant.wateringRequirement}</div>
                <div className="plant__type">Plant Type: {plant.plantType?.type}</div>
                <div className="plant__task">Tasks: {plant.tasks?.map(
                    (task) => {
                        return task.todoDescription}
                )}</div>
            </section>
            <div>
                <button onClick={() => history.push(`/tasks/create/${plant.id}`)}>Create New Task </button>
            </div>

            <div>
            <button onClick={() => {deletePlant(plant.id)}}>Delete</button>
            </div>           


        </>
    )
}