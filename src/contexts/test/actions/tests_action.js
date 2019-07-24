import firebase from '../../../utils/firebase';
export const GET_TEST = 'get_test';
export const POST_TEST = 'post_test';

var database = firebase.database();
export function postTest() {
    const test = database.ref('Test').push().set({
        testValue : 'inputValue',
    })

    return dispatch => {
        dispatch({
            type: POST_TEST,
            payload: 'win',
        })
    }
}

export function getTest() {
    const tests = database.ref('Test');

    return dispatch => {
        tests.on('value', snapshot => {
            dispatch({
                type: GET_TEST,
                payload: snapshot.val(),
            })
        })
    }
}