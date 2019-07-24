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
    this.returnDate = this.returnDate.bind(this);

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
        start: now,
        end: now,
        //TODO: make dates change
        //Note: what if we used a date picker and separated the Year, Month, and Date to make input into the Date() format easy
      }
      checks.push(chk);
    });
    return checks;
  }

  componentDidMount() {
    this.props.getCheck();
    //this.props.getChecksByRoutine();

    console.log('mountlog', this.props.checks);
  }

  returnDate(){
    console.log("gave you a date")
  }

  handleSelect = ({start}) => {
    console.log()
    //{start, end}
    const title = window.prompt("text is still working")
    this.props.createCheck("-Lhec71T72LkMNl772aU", start);
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
    console.log("props now", this.props.checks)
    const checks = this.props.checks && this.makeChecks();

    //TODO: when you click on an item from the list of routines have it pull the identifire from the DB

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
    console.log("state checks", state)
    return {
        calendar: state.calendar,
        checks: state.checks,
    }
}

export default connect(mapStateToProps, {getCheck, getCheckByRoutine, createCheck})(Calendar);