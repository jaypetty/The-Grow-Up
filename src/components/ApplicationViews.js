import React from "react"
import { Route } from "react-router-dom"
import { PlantForm } from "./plants/PlantForm"
import { PlantList } from "./plants/PlantList"
import { Plant } from "./plants/Plant"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/plants">
                <PlantList />
            </Route>

            <Route path="/plants/create">
                <PlantForm />
            </Route>

            <Route exact path="/plants/:plantId(\d+)">
                <Plant />
            </Route>
        </>
    )
}