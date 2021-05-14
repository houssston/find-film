import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from "./Home";
import {setActor} from "../../store/actions/actorAction";
import {getActors} from "../../store/selectors/actorSelector";



class HomeContainer extends Component {
    render() {
        return (
            <Home setActor={this.props.setActor}
                  actors={this.props.actors}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        actors:getActors(state),
    };
}
export default connect(
    mapStateToProps,{setActor}
)(HomeContainer);
