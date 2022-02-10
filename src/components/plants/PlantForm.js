import React, {useState, useEffect} from "react"
import { useHistory } from "react-router-dom"


export const PlantForm = () => {

    const [plantTypes, choosePlantType] = useState([])
    const [plant, updatePlant] = useState({
        name: "",
        wateringRequirement: "",
        plantType: ""
    })

    const history = useHistory()

    const submitPlant = (event) => {
        event.preventDefault()
        
        const newPlant = {
            name: plant.name,
            wateringRequirement: plant.wateringRequirement,
            plantTypeId: parseInt(plant.plantType),
            userId: parseInt(localStorage.getItem("grow_user"))
        }
        
        // Add the plant obj to the database.
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlant)
        }

        return fetch("http://localhost:8088/plants", fetchOption)
            .then(() => {
                history.push("/")
            })
    }

    useEffect(
        () => {
            fetch("http://localhost:8088/plantTypes")
            .then(res => res.json())
            .then((plantTypeFromAPI) => {
                    choosePlantType(plantTypeFromAPI)
            })
        },
        []
    )

    return (
        <form className="plantForm">
            <h2 className="plantForm__title">New Plant</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text" id="plantName"
                        className="form-control"
                        placeholder="Plant Name"
                        onChange={
                            (evt) => {
                                const copy = {...plant}
                                copy.name = evt.target.value
                                updatePlant(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="watering">Watering Requirements:</label>
                    <input
                        required autoFocus
                        type="text" id="watering"
                        className="form-control"
                        placeholder="Watering Requirement"
                        onChange={
                            (evt) => {
                                const copy = {...plant}
                                copy.wateringRequirement = evt.target.value
                                updatePlant(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <select name={plantTypes} id={plantTypes}
                     onChange={
                        (evt) => {
                            const copy = {...plant}
                            copy.plantType = evt.target.value
                            updatePlant(copy)
                        }
                    }>
                        <option value={0}>Select A Plant Type</option>
                        {
                            plantTypes.map(
                                (plantType) => {
                                    return <option id={`plantType--${plantType.id}`} key={plantType.id} value={plantType.id}>
                                {plantType.type}
                                </option>
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <button onClick={submitPlant} className="btn btn-primary">
                Submit Plant
            </button>
        </form>
    )
}