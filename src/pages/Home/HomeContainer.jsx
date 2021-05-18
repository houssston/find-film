import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from "./Home";
import {getActors, getJointFilms} from "../../store/selectors/actorSelector";
import {getActorData} from "../../store/actions/actorAction";



class HomeContainer extends Component {
    render() {
        return (
            <Home actors={this.props.actors}
                  getActorData={this.props.getActorData}
                  getJointFilms={this.props.getJointFilms}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        actors:getActors(state),
        getJointFilms:getJointFilms(state)
    };
}
export default connect(
    mapStateToProps,{getActorData}
)(HomeContainer);
