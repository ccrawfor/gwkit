import React, { Component } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';


class ModalAlert extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: true
      };
    }
  
    handleClose() {
      this.setState({ show: false });
      this.props.state(false);
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
    
  
      return (
        <div>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Selection Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Please select a device id (did).
              </p>
  
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default ModalAlert;