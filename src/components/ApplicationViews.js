import React from "react"
import { Route } from "react-router-dom"
import { PlantForm } from "./plants/PlantForm"
import { PlantList } from "./plants/PlantList"

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/plants">
                <PlantList />
            </Route>

            <Route path="/plants/create">
                <PlantForm />
            </Route>
        </>
    )
}