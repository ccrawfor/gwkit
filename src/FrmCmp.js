
import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';


class FrmCmp extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        value: ''
      };
      
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        var re =  '^(http|ws):\/\/[^ "]+$';
        
        return null;
      }
    
      handleChange(e) {
        this.setState({ value: e.target.value }, () => {this.props.change('')});
      }

      handleSubmit(event) {
        this.props.change(this.state.value);
        event.preventDefault();
      }

      render() {
        return (

                <form onSubmit={this.handleSubmit.bind(this)}>
                  <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                  >
                    <ControlLabel>Enter URL</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="Enter text"
                      onChange={this.handleChange.bind(this)}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                  </FormGroup>
                  <Button type="submit">Submit</Button>
            </form>    
        );
      }

}

export default FrmCmp;