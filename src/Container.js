import React, { Component } from 'react';
import GridCmp from './GridCmp'

class Container extends Component {
    constructor(props) {
      super(props);
      this.state = {
        devUrl: ''
      };

    }

    handleChange(e) {
      //get url
      this.setState({ devUrl: e});
    }

    componentDidMount() {

    }

    render() {
      return (
        <GridCmp devUrl={this.state.devUrl} change={this.handleChange.bind(this)} />
      );

    }

  }
  
  
  export default Container;
  
