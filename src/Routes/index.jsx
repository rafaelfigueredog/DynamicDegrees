import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Application from '../pages/Application';
import About from '../pages/About';
import Docs from '../pages/Docs';

export default function Routes({paletteType, setPaletteType}) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">  
                    <Application paletteType={paletteType} setPaletteType={setPaletteType} />
                </Route>
                <Route path="/about">
                    <About paletteType={paletteType} setPaletteType={setPaletteType} />
                </Route>
                <Route path="/docs">
                    <Docs paletteType={paletteType} setPaletteType={setPaletteType} />
                </Route>
            </Switch>
        </Router>
    )
}
