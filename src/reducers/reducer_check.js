import {GET_CHECK} from '../contexts/calendar/actions/calendar_actions';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_CHECK: 
            return action.payload;
    }
    return state;
}