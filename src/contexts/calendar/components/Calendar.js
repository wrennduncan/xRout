import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import _ from 'underscore';
import moment from 'moment'
import './calendar.css';
import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {getCheck, getCheckByRoutine, createCheck, deleteCheck} from "../actions/calendar_actions";
import {postRoutine} from "../../routine/actions/routine_action";

// moment.locale("en");
// BigCalendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment);

class Calendar extends React.Component {
//TODO: ask Austin if adding props into the constructor and super affects our implementation

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      routineName: "",
    };

    this.makeChecks = this.makeChecks.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.testSubmit = this.testSubmit.bind(this);
  }

  makeChecks() {
    let checks = [];

    _.each(this.props.checks, (check, index) => {
      const now = new Date();

      const chk = {
        id: index,
        title: '',
        start: check.date,
        end: check.date,
      }
      checks.push(chk);
    });
    return checks;
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    this.props.getCheck();
  }

  componentDidUpdate(prevProps) {
    if(this.props.routineId && this.props.routineId !== prevProps.routineId) {
      this.props.getCheckByRoutine(this.props.routineId);
    }
  }

  handleInput(event) {
    this.setState({routineName: event.target.value})
  }

  handleSelect = ({start}) => {
    this.props.createCheck(this.props.routineId, start);
  }

  deleteCheck = (check) => {
    this.props.deleteCheck(check.id);
  }

  addRoutine(routineName) {
    console.log("hit add routine", routineName)
    this.props.postRoutine(routineName);
    this.toggle();
    this.setState({routineName: ''})
  }

  testSubmit() {
    this.toggle();
    console.log("yoyo")
  }

  //TODO: take the Routine Name input from the Add Routine Modal and use that in the creation of a new routine

  render() {
    const checks = this.props.checks ? this.makeChecks() : [];
    console.log("PROPS", this.props.routineId)
    //TODO: when you click on an item from the list of routines have it pull the identifire from the DB
    // this.props.routineId && this.props.getCheckByRoutine(this.props.routineId);
    //onClick={() => this.addRoutine("hardcoded routine name")}
    //
    return(
      <div style={{ height: '500px'}}>
          <Button color="danger" onClick={this.toggle} size="lg">Add Routine</Button>
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
                    <Input placeholder="1 - 7" />
                  </InputGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={() => this.addRoutine(this.state.routineName)} >Submit</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
          </Modal>

        <BigCalendar
          selectable
          events={checks}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          eventPropGetter={
            (event) => {
              let newStyle = {
                display: 'inline-block',
                width: '50px',
                height: '50px',
                border: '7px solid #fff',
                background: `linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 43%,#ff0000 45%,#ff0000 55%,rgba(0,0,0,0) 57%,rgba(0,0,0,0) 100%), 
                              linear-gradient(135deg, #fff 0%,#fff 43%,#ff0000 45%,#ff0000 55%,#fff 57%,#fff 100%)`,
              };
              return {
                className: "",
                style: newStyle
              };
            }
          }
          onSelectSlot={this.handleSelect}
          onSelectEvent={event => this.deleteCheck(event)}
        />
      </div>
    );
  }
}

//TODO: read more about redux

function mapStateToProps(state){
    return {
        calendar: state.calendar,
        checks: state.checks,
        routineId: state.routine.routineId,
    }
}

export default connect(mapStateToProps, {getCheck, getCheckByRoutine, createCheck, deleteCheck, postRoutine})(Calendar);