import React, {Component} from 'react';
import {getRoutine, postRoutine,} from "../actions/routine_action.js";
import {connect} from 'react-redux';
import _ from 'underscore';
import '../components/routine.css'
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input,  Container, Row, Col } from 'reactstrap';
import {getCheck, getCheckByRoutine} from "../../calendar/actions/calendar_actions";
import {selectRoutine, deleteRoutine} from "../actions/routine_action";

//TODO: figure out why the this.props.routineId doesn't change on the first time you use selectRoutine
//TODO: apply deleteRoutine() to the button
//TODO: figure out a better way for user's to select which routine to delete

class Routine extends Component {
    constructor(props) {
        super(props);
    
        this.renderRoutines = this.renderRoutines.bind(this);
        this.selectRoutine = this.selectRoutine.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDaysGoal = this.handleDaysGoal.bind(this);
        this.deleteRoutine = this.deleteRoutine.bind(this);

        this.state = {
        }
    }

    componentWillMount() {
        this.props.getRoutine();

    }

    renderRoutines() {
        return _.map(this.props.routine, (routine, index, key) => {
            return (
                <ListGroupItem key={index} onClick={() => this.selectRoutine(index)} className="routines">{routine.name}</ListGroupItem>
            )
        })
    }

    selectRoutine(routineId) {
        console.log("select routine ID", routineId)
        this.props.getCheckByRoutine(routineId);
        this.props.selectRoutine(routineId);
        //TODO: figure out how to make the ListGroupItem active when clicked

        // if (this.props.routine.index == routineId) {
        //     className = "routines-active";
        // }
    }

    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    handleInput(event) {
        this.setState({routineName: event.target.value})
    }
    
    handleDaysGoal(event2) {
        this.setState({daysGoal: event2.target.value})
    }

    addRoutine(routineName, daysGoal) {
        this.props.postRoutine(routineName, daysGoal);
        this.toggle();
        this.setState({routineName: ''})
        this.setState({daysGoal: null})
    }

    //Code: -Ll8Pi1e8tXjPtytCAbF
    deleteRoutine(routineId) {
        console.log("delete button is working", routineId);
        this.props.deleteRoutine(routineId);
    }

    render() {
        return(
            <div>
                <h1 className="routine-header">Routines:</h1>
                <ListGroup>
                    {this.renderRoutines()}
                </ListGroup>

                <Button className="add-routine-button" color="danger" onClick={this.toggle} size="lg">Add Routine</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Routine</ModalHeader>
                    <ModalBody>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">Routine Name</InputGroupAddon>
                        <Input placeholder="Gym" type="text" name="routineName" value={this.state.routineName} onChange={this.handleInput}/>
                        </InputGroup>
                        <br />
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">Days Per Week</InputGroupAddon>
                        <Input placeholder="1 - 7" type="number" min="1" max="7" name="daysGoal" value={this.state.daysGoal} onChange={this.handleDaysGoal}/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.addRoutine(this.state.routineName, this.state.daysGoal)} >Submit</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {/* <Button color="success" onClick={()=> this.deleteRoutine(this.props.routineId)}>Delete Routine</Button> */}
            </div>


        )
    }
}

function mapStateToProps(state){
    return {
        routine: state.routine.routines,
        routineId: state.routine.routineId
    }
}


export default connect(mapStateToProps, {getRoutine, postRoutine, getCheckByRoutine, selectRoutine, deleteRoutine})(Routine);