import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import _ from 'underscore';
import moment from 'moment'
import './calendar.css';
import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {getCheck, getCheckByRoutine, createCheck, deleteCheck} from "../actions/calendar_actions";

const localizer = momentLocalizer(moment);

//TODO: add more styling to the calendar component
//TODO: add coloring if the goal for number of days in a week has been reached
//TODO: add user registration
//TODO: delete routines (fully delete the component from the db)
//TODO: check on the bug for switching to week on calendar

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      routineName: "",
      daysGoal: null,
    };

    this.makeChecks = this.makeChecks.bind(this);
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

  componentDidMount() {
    this.props.getCheck();
  }

  componentDidUpdate(prevProps) {
    if(this.props.routineId && this.props.routineId !== prevProps.routineId) {
      this.props.getCheckByRoutine(this.props.routineId);
    }
  }

  handleSelect = ({start}) => {
    this.props.createCheck(this.props.routineId, start);
  }

  deleteCheck = (check) => {
    this.props.deleteCheck(check.id);
  }


  render() {
    const checks = this.props.checks ? this.makeChecks() : [];
    // this.props.routineId && this.props.getCheckByRoutine(this.props.routineId);
    return(
      <div style={{ height: '500px'}}>
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

export default connect(mapStateToProps, {getCheck, getCheckByRoutine, createCheck, deleteCheck})(Calendar);