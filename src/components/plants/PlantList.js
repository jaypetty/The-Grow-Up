import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


export const PlantList = () => {
    const [plants, setPlant] = useState([])
    const currentUserId = parseInt(localStorage.getItem("grow_user"))
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/plants")
                .then(res => res.json())
                .then((usersPlantData) => {
                    const usersPlants = usersPlantData.filter(
                        (plant) =>
                            plant.userId === (currentUserId)
                    )
                    setPlant(usersPlants)
                })
        },
        []
    )

    return (
        <>
            <h1>My Plants</h1>
            {
                plants.map(
                    (plant) => {
                        return <p key={`plant--${plant.id}`}>{plant.name}</p>
                    }
                )
            }

            <div>
                <button onClick={() => history.push("/plants/create")}>Add A Plant</button>
            </div>
        </>
    )
}