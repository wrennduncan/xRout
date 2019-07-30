import React from 'react';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactDOM from 'react-dom';


export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }


      render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            </div>
        );
      }
  }