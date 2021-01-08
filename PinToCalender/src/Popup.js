import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTitle: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
      closePopUp: false,
      checkboxChecked: false,
    };
  }
  // on close button click
  handleClose = () => {
    this.props.toggle();
    this.setState({ closePopUp: !this.state.closePopUp });
    this.props.sendClosePopupStatus(this.state.closePopUp);
  };

  //on pop_up form submit
  handleSubmit = (event) => {
    event.preventDefault();
    var eveObj = {};
    eveObj.title = this.state.eventTitle;
    eveObj.start = this.state.startDateTime;
    eveObj.end = this.state.endDateTime;
    eveObj.remindMe = this.state.checkboxChecked;
    if (this.props.popUpMode === "editMode") {
      eveObj.id = this.props.selectedEvent;
    } else {
      eveObj.id = this.props.events.length;
    }
    this.props.sendAddEvent(eveObj);
    this.props.toggle();
  };

  closeModal() {
    this.props.toggle();
  }

  //update user_input
  updateEventTitle = (evt) => {
    this.setState({ eventTitle: evt.target.value });
  };
  updateStartDateTime = (date) => {
    this.setState({
      startDateTime: date,
    });
  };
  updateEndDateTime = (date) => {
    this.setState({
      endDateTime: date,
    });
  };

  // on checkbox checked
  handleCheck = () => {
    this.setState({ checkboxChecked: !this.state.checkboxChecked });
  };
  componentDidUpdate = (prevProps) => {
    if (
      this.props.popUpMode !== prevProps.popUpMode ||
      this.props.selectedEventDetails !== prevProps.selectedEventDetails ||
      this.props.closePopUpStatus !== prevProps.closePopUpStatus
    ) {
      if (this.props.popUpMode == "addMode") {
        this.setState({
          eventTitle: "",
          startDateTime: new Date(),
          endDateTime: new Date(),
        });
      } else if (this.props.popUpMode == "editMode") {
        this.setState({
          eventTitle: this.props.selectedEventDetails.title,
          startDateTime: this.props.selectedEventDetails.start,
          endDateTime: this.props.selectedEventDetails.end,
        });
      }
    }
  };
  render() {
    return (
      <Modal
        visible={this.props.seen}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <div style={{ padding: "10px" }}>
          <span className="close" onClick={this.handleClose}>
            &times;
          </span>
          <h5>{this.props.eventAction}</h5>
          <form action="/action_page.php" style={{ lineHeight: "0.2" }}>
            <div className="form-group">
              <label for="Title">Event Name:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.eventTitle}
                onChange={(evt) => this.updateEventTitle(evt)}
              />
            </div>
            <div className="form-group">
              <label for="startDateTime">Start:</label>
              <br />
              <DatePicker
                style={{ width: "100%" }}
                selected={this.state.startDateTime}
                onChange={(date) => this.updateStartDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="endDateTime">End:</label>
              <br />
              <DatePicker
                style={{ width: "100%" }}
                selected={this.state.endDateTime}
                onChange={(date) => this.updateEndDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
              />
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" onChange={this.handleCheck} /> Remind me
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    );
  }
}

export default PopUp;
