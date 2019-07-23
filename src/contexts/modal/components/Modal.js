import React from "react";

export default class Modal extends React.Component {
    state = {
        show: false
    }

    showModal = e => {
        this.setState({ show: true });
    }

  render() {
    // if(!this.props.show){
    //     return null;
    // }

    return (
    <div>
        Hello Modal
        <button onClick = {e => {
            this.showModal();
        }}>
            Show Modal
        </button>
    </div>
    );
  }
}