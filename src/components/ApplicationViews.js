import React from "react"
import { Route } from "react-router-dom"
import { PlantForm } from "./plants/PlantForm"
import { PlantList } from "./plants/PlantList"
import { Plant } from "./plants/Plant"
import { TaskForm } from "./Tasks/TaskForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <PlantList />
            </Route>

            <Route path="/plants/create">
                <PlantForm />
            </Route>

            <Route path="/tasks/create/:plantId(\d+)">
                <TaskForm />
            </Route>

            <Route exact path="/plants/:plantId(\d+)">
                <Plant />
            </Route>
        </>
    )
}