import React, { Component } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { Icon, DeleteIcon } from "@material-ui/core";
import Popup from "./Popup.js";

class PopoverComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { popoverOpen: false, seenEditPopup: true };
  }
  //on Popover toggle
  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  };

  //handling delete and edit event
  deleteEvent = () => {
    this.props.events.filter((event) => {
      if (event.id === this.props.selectedEvent) {
        this.props.sendDeleteEvent(this.props.events.indexOf(event));
      }
    });
  };
  editEvent = () => {
    this.props.seenEditPopupStatus(this.state.seenEditPopup);
    this.props.isPopoverOpenStatus(this.state.popoverOpen);
  };

  render() {
    return (
      <div>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={this.props.target}
          toggle={this.toggle}
        >
          {this.props.selectedEvent == "" ? (
            <PopoverHeader> Please select the event</PopoverHeader>
          ) : (
            ""
          )}
          <PopoverBody>
            <button
              className="btn"
              style={{ margin: "5px" }}
              onClick={this.deleteEvent}
            >
              <i className="fa fa-trash"></i>
            </button>
            <button
              className="btn"
              style={{ margin: "5px" }}
              onClick={this.editEvent}
            >
              <i className="fa fa-edit"></i>
            </button>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
export default PopoverComponent;
