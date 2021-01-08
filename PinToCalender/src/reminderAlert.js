import React, { Component } from "react";
import Modal from "react-awesome-modal";

class ReminderAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  closeModal() {
    this.setState({
      visible: false,
    });
    this.props.alertVisibility(false);
  }
  render() {
    return (
      <Modal
        visible={this.state.visible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <div>
          <div
            className="modal-header"
            style={{
              backgroundColor: "#3c90d6",
              color: "white",
              margin: "auto",
            }}
          >
            <h5 className="modal-title" style={{ margin: "auto" }}>
              Reminder
            </h5>
          </div>
          <div
            className="modal-body"
            style={{ padding: "3rem 3rem 1rem 3rem" }}
          >
            <p style={{ textAlign: "center" }}>
              {"Its time for "} {this.props.reminderEvent} {" event!!"}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={() => this.closeModal()}
              style={{ margin: "auto", borderTop: "1px" }}
            >
              Okay
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
export default ReminderAlert;
