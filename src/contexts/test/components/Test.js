import React, {Component} from 'react';
import {getTest, postTest} from "../actions/tests_action.js";
import {connect} from 'react-redux';
import Calendar from '../../calendar/components/Calendar.js';


class Test extends Component {
    constructor(props) {
        super(props);
    
        this.onButtonPress = this.onButtonPress.bind(this);
        this.state = {}
    }
    
    onButtonPress(){
    }

    render() {
        return(
        <div>
            <button onClick={this.props.getTest}>
            Test
            </button>
            <button onClick={this.props.postTest}>
            Add
            </button>

        </div>)
    }
}

// function mapStateToProps(state){
//     return {
//         test: state.test,
//     }
// }

export default Calendar;
//connect(mapStateToProps, {getTest, postTest})(Test);