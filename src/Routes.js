import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateCompany from './Components/CreateCompany'
import Home from './Components/Home'
import Reload from './Components/Reload'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/Home" exact component={Home} />
                <Route path="/" exact component={Reload} />
                <Route path="/add-company" exact component={CreateCompany} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;