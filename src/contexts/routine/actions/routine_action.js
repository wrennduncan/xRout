import firebase from '../../../utils/firebase';
export const GET_ROUTINE = 'get_routine';
export const POST_ROUTINE = 'post_routine';
export const SELECT_ROUTINE = 'select_routine';

var database = firebase.database();
export function postRoutine() {
    const routine = database.ref('Routine').push().set({
        name : 'inputRoutine',
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
            //_.each(snapshot.val(), () => )
            dispatch({
                type: GET_ROUTINE,
                payload: snapshot.val(),
            })
        })
    }
}

export function selectRoutine(routineId) {
    return dispatch => {
        dispatch({
            type: SELECT_ROUTINE,
            payload: {routineId : routineId},
        })
    }
}