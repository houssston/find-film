import React, {Component} from 'react';
import {connect} from 'react-redux';
import Home from "./Home";
import {getActors, getJointFilms} from "../../store/selectors/actorSelector";
import {getActorData, removeActorData} from "../../store/actions/actorAction";



class HomeContainer extends Component {
    render() {
        return (
            <Home actors={this.props.actors}
                  jointFilms={this.props.jointFilms}
                  getActorData={this.props.getActorData}
                  removeActorData={this.props.removeActorData}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        actors:getActors(state),
        jointFilms:getJointFilms(state)
    };
}
export default connect(
    mapStateToProps,{getActorData,removeActorData}
)(HomeContainer);
