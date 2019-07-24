import {GET_ROUTINE, SELECT_ROUTINE} from '../contexts/routine/actions/routine_action';
import _ from 'underscore';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_ROUTINE: 
            return action.payload;
        case SELECT_ROUTINE:
            console.log("select routine hit", action.payload)
            // _.extend({state}, {routineId: action.payload.routineId});
            state.routineId = action.payload.routineId;
            console.log("State", state)
            return state;
    }
    return state;
}

