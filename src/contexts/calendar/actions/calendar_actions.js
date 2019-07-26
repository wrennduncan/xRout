import firebase from '../../../utils/firebase';
export const GET_CHECK = 'get_check';
export const GET_CHECK_BY_ROUTINE = 'get_check_by_routine';
export const POST_CHECK = 'post_check';

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

export function getCheckByRoutine(routineId) {
    const checks = database.ref("Check");
    //need to get past the first check1, check2 section
    const checksByRoutine = checks.orderByChild("routine").equalTo(routineId);


    return dispatch => {
        checksByRoutine.on('value', snapshot => {
            dispatch({ 
                type: GET_CHECK_BY_ROUTINE,
                payload: snapshot.val(),
            })
        })
    }
}

export function createCheck(routineId, date) {
    const check = database.ref('Check').push().set({
        date : date.toString(),
        routine: routineId,
    })

    return dispatch => {
        dispatch({
            type: POST_CHECK,
            payload: 'I made a new check in the database',
        })
    }
}

export function deleteCheck(key) {
    const check = database.ref('Check').child(key);
    return dispatch => {
        check.remove();
    }
}