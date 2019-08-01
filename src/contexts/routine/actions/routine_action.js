import firebase from '../../../utils/firebase';
export const GET_ROUTINE = 'get_routine';
export const POST_ROUTINE = 'post_routine';
export const SELECT_ROUTINE = 'select_routine';
export const DELETE_ROUTINE = 'delect_routine';

var database = firebase.database();
export function postRoutine(routineName, daysGoal) {
    const routine = database.ref('Routine').push().set({
        name : routineName,
        daysGoal: daysGoal,
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
    return dispatch => {
        dispatch({
            type: SELECT_ROUTINE,
            payload: {routineId : routineId},
        })
    }
}

export function deleteRoutine(routineId) {
    const routine = database.ref('Routine').equalTo(routineId);
    return dispatch => {
        console.log("routine that will be removed", routineId)
        //routine.remove();
    }

}