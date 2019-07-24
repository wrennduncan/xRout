import React, {Component} from 'react';
import {getRoutine, postRoutine,} from "../actions/routine_action.js";
import {connect} from 'react-redux';
import _ from 'underscore';
import { thisExpression } from '@babel/types';
//import '../../../index.css';
import {getCheck, getCheckByRoutine} from "../../calendar/actions/calendar_actions";


class Routine extends Component {
    constructor(props) {
        super(props);
    
        this.renderRoutines = this.renderRoutines.bind(this);
        this.alertName = this.alertName.bind(this);

        this.state = {
        }
    }

    componentWillMount() {
        this.props.getRoutine();

    }

    renderRoutines() {
        //how does this.props.routine represent the list of routines? I think it comes from index
        return _.map(this.props.routine, (routine, index, key) => {
            //console.log("full", index)
            return (
                <li key={index} onClick={() => this.alertName(index)}>{routine.name}</li>
            )
        })
    }

    //TODO: look up how to log the key of an li
    //TODO: how to pass a variable into a function on click



    alertName(routineId) {
        this.props.getCheckByRoutine(routineId)

    }

    render() {
        return(
        
        <div>
            <button onClick={this.props.getRoutine}>
            Get Routine
            </button>
            <button onClick={this.props.postRoutine}>
            Add Routine
            </button>
            <ul>
            Routines:
                {this.renderRoutines()}
            </ul>
        </div>)
    }
}

function mapStateToProps(state){
    return {
        routine: state.routine,
    }
}


export default connect(mapStateToProps, {getRoutine, postRoutine, getCheckByRoutine})(Routine);