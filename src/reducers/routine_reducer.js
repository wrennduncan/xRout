import {GET_ROUTINE} from '../contexts/routine/actions/routine_action';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_ROUTINE: 
            return action.payload;
    }
    return state;
}