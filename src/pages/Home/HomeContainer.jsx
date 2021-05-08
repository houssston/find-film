import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from "./Home";



export default class HomeContainer extends Component {
    render() {
        return (
            <Home/>
        );
    }
}

function mapStateToProps(state) {
    return {};
}
/*export default connect(
    mapStateToProps,
)(HomeContainer);*/
