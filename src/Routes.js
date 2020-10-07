import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateCompany from './Components/CreateCompany'
import Home from './Components/Home'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/add-company" exact component={CreateCompany} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;