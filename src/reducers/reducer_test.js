import {GET_TEST} from '../contexts/test/actions/tests_action';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_TEST: 
            return action.payload;
    }
    return state;
}