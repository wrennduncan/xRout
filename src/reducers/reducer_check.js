import {GET_CHECK, GET_CHECK_BY_ROUTINE} from '../contexts/calendar/actions/calendar_actions';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_CHECK: 
            return action.payload;
        case GET_CHECK_BY_ROUTINE:
            return action.payload;
    }
    return state;
}