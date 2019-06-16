import React, {Component} from 'react';
import {getTest, postTest} from "../actions/tests_action.js";
import {connect} from 'react-redux';


class Test extends Component {
    constructor(props) {
        super(props);
    
        this.onButtonPress = this.onButtonPress.bind(this);
        this.state = {}
    }
    
    onButtonPress(){
        console.log('You pressed');
    }

    render() {
        console.log('indexTest', this.props.test);
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

function mapStateToProps(state){
    return {
        test: state.test,
    }
}

export default connect(mapStateToProps, {getTest, postTest})(Test);