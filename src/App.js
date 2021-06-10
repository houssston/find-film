import React from 'react';
import Header from "./components/Header/Header";
import HomeContainer from "./pages/Home/HomeContainer";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <>
            <Header/>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Route path='/' render={ () => <HomeContainer/>}/>
            </BrowserRouter>
            <Footer/>
        </>
    );
}


export default App;
