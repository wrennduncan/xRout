import {GET_ROUTINE, SELECT_ROUTINE, DELETE_ROUTINE} from '../contexts/routine/actions/routine_action';
import _ from 'underscore';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_ROUTINE: 
            state.routines = action.payload;
            const firstKey = Object.keys(action.payload)[0];
            state.routineId = firstKey;
            return state;
        case SELECT_ROUTINE:
            console.log("select routine hit", action.payload)
            // _.extend({state}, {routineId: action.payload.routineId});
            //shouldn't this.props.routineId be getting set here every time we hit selectRoutine
            state.routineId = action.payload.routineId;
            console.log("State", state)
            return state;
        case DELETE_ROUTINE: {
            console.log("delete routine hit", state)
            return state;
        }
    }
    return state;
}

