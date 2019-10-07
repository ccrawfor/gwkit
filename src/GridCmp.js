import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import DGContainer from './DataGrid';
import FrmCmp from './FrmCmp';
import DyGraph from './DygraphCmp';

class GridCmp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      did: null
    };
    
    this.handleChange = this.handleChange.bind(this);

    
  }

  handleChange(e) {    
    this.props.change(e);
  }

  handleSelection(e) {
    this.setState({did: e});
  }

  render() {
    let devUrl = this.props.devUrl;
    let DG = null;
    if (devUrl) {
      DG = <DGContainer selection={this.handleSelection.bind(this)} devUrl={this.props.devUrl}/>
    };
    
    let did = this.state.did;
    let DGraph = null;
    if (did != null) {
      DGraph = <DyGraph did={this.state.did}/>
    }

    return (
        <Grid>
        <Row>
          <Col xs={12} md={8}>
            <FrmCmp change={this.handleChange}/>
          </Col>
        </Row> 
        <Row bsClass="row top-buffer">
          <Col md={12}>
             
          </Col>        
        </Row>             
        <Row>
          <Col md={12}>
            {DG}
          </Col>        
        </Row>
        <Row bsClass="row top-buffer">
          <Col md={12}>
             
          </Col>        
        </Row>             
        <Row>
          <Col md={12}>
            {DGraph}
          </Col>        
        </Row>
      </Grid>

    );
  }
}

export default GridCmp;
