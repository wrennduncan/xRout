import React, {Component} from 'react';
import {getRoutine, postRoutine,} from "../actions/routine_action.js";
import {connect} from 'react-redux';
import _ from 'underscore';
import { thisExpression } from '@babel/types';
//import '../../../index.css';
import {getCheck, getCheckByRoutine,} from "../../calendar/actions/calendar_actions";
import {selectRoutine} from "../actions/routine_action";


class Routine extends Component {
    constructor(props) {
        super(props);
    
        this.renderRoutines = this.renderRoutines.bind(this);
        this.selectRoutine = this.selectRoutine.bind(this);

        this.state = {
        }
    }

    componentWillMount() {
        this.props.getRoutine();

    }

    renderRoutines() {
        //how does this.props.routine represent the list of routines? I think it comes from index
        return _.map(this.props.routine, (routine, index, key) => {
            return (
                <li key={index} onClick={() => this.selectRoutine(index)}>{routine.name}</li>
            )
        })
    }

    //TODO: look up how to log the key of an li
    //TODO: how to pass a variable into a function on click



    selectRoutine(routineId) {
        this.props.getCheckByRoutine(routineId);
        this.props.selectRoutine(routineId);
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
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        routine: state.routine.routines,
        routineId: state.routine.routineId
    }
}


export default connect(mapStateToProps, {getRoutine, postRoutine, getCheckByRoutine, selectRoutine})(Routine);