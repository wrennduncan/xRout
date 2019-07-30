import firebase from '../../../utils/firebase';
export const GET_ROUTINE = 'get_routine';
export const POST_ROUTINE = 'post_routine';
export const SELECT_ROUTINE = 'select_routine';

var database = firebase.database();
//put routineName as parameter and in place of 'inputRoutine'
export function postRoutine(routineName) {
    const routine = database.ref('Routine').push().set({
        name : routineName,
    })

    return dispatch => {
        dispatch({
            type: POST_ROUTINE,
            payload: 'I input a routine',
        })
    }
}

export function getRoutine() {
    const routines = database.ref('Routine');

    return dispatch => {
        routines.on('value', snapshot => {
            dispatch({
                type: GET_ROUTINE,
                payload: snapshot.val(),
            })
        })
    }
}

export function selectRoutine(routineId) {
    console.log("Label for Austin", routineId);
    return dispatch => {
        dispatch({
            type: SELECT_ROUTINE,
            payload: {routineId : routineId},
        })
    }
}