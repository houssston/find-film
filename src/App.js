import React from 'react';
import Header from "./components/Header/Header";
import HomeContainer from "./pages/Home/HomeContainer";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";



function App() {
    return (
        <>
            <Header/>
            <BrowserRouter>
                <Route path='' render={ () => <HomeContainer/>}/>
            </BrowserRouter>
        </>
    );
}


export default App;
