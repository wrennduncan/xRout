import { combineReducers } from 'redux';

import TestReducer from './reducer_test';
import RoutineReducer from './routine_reducer'
import CheckReducer from './reducer_check';

const rootReducer = combineReducers({
    test : TestReducer,
    routine : RoutineReducer,
    checks : CheckReducer,
})

export default rootReducer;