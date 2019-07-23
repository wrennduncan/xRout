import firebase from '../../../utils/firebase';
export const GET_CHECK = 'get_check';
export const GET_CHECK_BY_ROUTINE = 'get_check_by_routine';

var database = firebase.database();

export function getCheck() {
    const checks = database.ref('Check');

    return dispatch => {
        checks.on('value', snapshot => {
            dispatch({
                type: GET_CHECK,
                payload: snapshot.val(),
            })
        })
    }
}

export function getChecksByRoutine(routineId) {
    const checks = database.ref("Check");
    //need to get past the first check1, check2 section
    const checksByRoutine = checks.orderByChild("routine").equalTo("-LkV8aRFiZ52hiGkZ-kr");

    return dispatch => {
        checksByRoutine.on('value', snapshot => {
            console.log("checkByRoutine", snapshot.val())
            dispatch({ 
                type: GET_CHECK_BY_ROUTINE,
                payload: snapshot.val(),
            })
        })
    }
}