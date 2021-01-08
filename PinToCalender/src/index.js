import React, { Component } from "react";
import { render } from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events.js";
import Popup from "./Popup.js";
import PopoverComponent from "./Popover.js";
import ReminderAlert from "./reminderAlert.js";
import { Button } from "reactstrap";
const localizer = momentLocalizer(moment);

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      events,
      seen: false,
      selectedEvent: "",
      popUpMode: "editMode",
      selectedEventDetails: "",
      closePopUpStatus: "",
      reminderEvent: "",
      reminderStatus: false,
      alertBoxStatus: false,
      eventAction: "",
      popOverHide: false,
    };
  }
  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
    if (this.state.popUpMode !== "addMode") {
      this.setState({
        popUpMode: "addMode",
        eventAction: "Add Event",
        popOverHide: true,
      });
    }
  };

  // handling addEvent()
  sendAddEvent = (evtObj) => {
    if (this.state.popUpMode !== "addMode") {
      this.state.events.find((evt, index) => {
        if (evt.id === evtObj.id) {
          this.state.events[index].title = evtObj.title;
          this.state.events[index].start = evtObj.start;
          this.state.events[index].end = evtObj.end;
          this.state.events[index].remindMe = evtObj.remindMe;
        }
      });
    } else {
      this.state.events.push(evtObj);
    }

    this.setState({ events: this.state.events });
    if (evtObj.remindMe === true) {
      let reminderTime = new Date(evtObj.start).getTime();
      let timeNow = new Date().getTime();
      let offsetMillis = reminderTime - timeNow;

      setTimeout(() => {
        this.setState({ reminderStatus: evtObj.remindMe });
        this.setState({ reminderEvent: evtObj.title });
        this.setState({ alertBoxStatus: !this.state.alertBoxStatus });
      }, offsetMillis);
    }
  };

  // handling deleteEvent()
  sendDeleteEvent = (event) => {
    this.state.events.splice(event, 1);
    this.setState({ events: this.state.events });
  };

  // change to edit mode
  seenEditPopupStatus = (status) => {
    this.setState({
      seen: status,
      popUpMode: "editMode",
    });
  };

  // on delete button click
  deleteEditClick = () => {
    this.setState({ popUpMode: "editMode", eventAction: "Edit Event" });
  };

  // on closing popUp
  sendClosePopupStatus = (status) => {
    this.setState({ closePopUpStatus: status });
  };

  // on alertBox
  alertVisibility = (status) => {
    this.setState({ alertBoxStatus: status });
  };
  // isPopoverOpenStatus
  isPopoverOpenStatus = (status) => {
    this.setState({ popOverHide: status });
  };
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Calendar Application</h1>
        <div style={{ height: "500pt" }}>
          <button
            type="button"
            className="btn btn-light"
            onClick={this.togglePop}
            style={{ margin: "3px", border: "1px solid #d3cece" }}
          >
            Add Event
          </button>
          <Button
            type="button"
            className="btn btn-light"
            id="Popover1"
            onClick={this.deleteEditClick}
            style={{ margin: "3px", border: "1px solid #d3cece" }}
          >
            Delete Event
          </Button>
          <Calendar
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            onSelectEvent={(event: Object, e: SyntheticEvent) => {
              this.setState({
                selectedEvent: event.id,
                selectedEventDetails: event,
              });
            }}
          />
        </div>
        <Popup
          key="popUp1"
          seen={this.state.seen}
          toggle={this.togglePop}
          events={this.state.events}
          popUpMode={this.state.popUpMode}
          selectedEvent={this.state.selectedEvent}
          closePopUpStatus={this.state.closePopUpStatus}
          selectedEventDetails={this.state.selectedEventDetails}
          eventAction={this.state.eventAction}
          sendAddEvent={this.sendAddEvent}
          sendClosePopupStatus={this.sendClosePopupStatus}
        />
        <PopoverComponent
          target="Popover1"
          events={this.state.events}
          popUpMode={this.state.popUpMode}
          selectedEvent={this.state.selectedEvent}
          sendDeleteEvent={this.sendDeleteEvent}
          seen={this.state.seen}
          popOverHide={this.state.popOverHide}
          seenEditPopupStatus={this.seenEditPopupStatus}
          isPopoverOpenStatus={this.isPopoverOpenStatus}
        ></PopoverComponent>
        {this.state.reminderStatus === true && this.state.alertBoxStatus ? (
          <ReminderAlert
            reminderEvent={this.state.reminderEvent}
            reminderStatus={this.state.reminderStatus}
            alertVisibility={this.alertVisibility}
          ></ReminderAlert>
        ) : null}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
