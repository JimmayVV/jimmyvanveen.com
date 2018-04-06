import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Button, Modal, /*ModalHeader,*/ ModalBody, ModalFooter } from 'reactstrap';

export default class AlertModal extends Component {
  constructor(props) {
    super(props);

    let thanks = this.getParameterByName('thanks');
    let initialState = (thanks === 'true') ? true : false;

    this.state = {
      modal: initialState,
      message: props.message
    };

    this.getParameterByName.bind(this);
    this.toggle.bind(this);
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      message: this.state.message
    });
  }

  render() {
    return (
      <div className="row" id="alertModal">
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalBody>{this.state.message}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

//ReactDOM.render(<AlertModal message="Thank you for sending me a comment!" />, document.getElementById('alertModal'));