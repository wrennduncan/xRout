import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import _ from 'underscore';
import moment from 'moment'
import './calendar.css';
import Modal from 'react-modal';
import {Calendar as BigCalendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {getCheck, getCheckByRoutine, createCheck} from "../actions/calendar_actions";

// moment.locale("en");
// BigCalendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment); 

class Calendar extends React.Component {
  constructor() {
    super();
    const now = new Date();
    this.makeChecks = this.makeChecks.bind(this);

    //TODO: does this need to be a separate method

    this.state = {
      name: 'React',
    };
  }

  makeChecks() {
    let checks = [];
    _.each(this.props.checks, (check, index) => {
      const now = new Date();

      const chk = {
        id: index,
        title: check.routine,
        start: check.date,
        end: check.date,
        //TODO: make dates change
        //Note: what if we used a date picker and separated the Year, Month, and Date to make input into the Date() format easy
      }
      checks.push(chk);
    });
    return checks;
  }

  componentDidMount() {
     this.props.getCheck();
     console.log("this props", this.props)
     this.props.routineId && this.props.getCheckByRoutine(this.props.routineId)
    //this.props.getChecksByRoutine();

  }

  componentDidUpdate(prevProps) {
    console.log("Now", this.props)
    // if(this.props.routineId !== this.prevProps.routineId) {

    //   this.props.routineId && this.props.getCheckByRoutine(this.props.routineId);
    // }

  }

  handleSelect = ({start}) => {
    const title = window.prompt("text is still working")
    console.log("props yo", this.props)
    console.log("so close", this.props.routineId, start)
    this.props.createCheck(this.props.routineId, start);
    //if (title)
      // this.setState({
      //   // events: [
      //   //   ...this.state.events,
      //   //   {
      //   //     start,
      //   //     end,
      //   //     title,
      //   //   },
      //   // ],
      // })
  }


  render() {  
    const checks = this.props.checks && this.makeChecks();
    console.log("props yooo", this.props)
    //TODO: when you click on an item from the list of routines have it pull the identifire from the DB
    // this.props.routineId && this.props.getCheckByRoutine(this.props.routineId);
    return(
      <div style={{ height: '300px'}}>
        <BigCalendar
          selectable
          events={checks}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
          // onSelectEvent={event => alert("our alert")}
           onSelectSlot={this.handleSelect}
        />
      </div>
    );
  }
}

//TODO: read more about redux

function mapStateToProps(state){
  console.log("state here", state)
    return {
        calendar: state.calendar,
        checks: state.checks,
        routineId: state.routine.routineId,
    }
}

export default connect(mapStateToProps, {getCheck, getCheckByRoutine, createCheck})(Calendar);