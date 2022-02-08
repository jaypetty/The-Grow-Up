import React from "react"

export const PlantDetail = ({plants}) => {


    return(
        <p key={`plant--${plants.id}`}>{plants.wateringRequirement}</p>
    )
}