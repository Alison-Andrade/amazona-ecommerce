import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" component={HomeScreen} exact />
			<Route path="product/:id" component={ProductScreen} />
        </BrowserRouter>
    )
}