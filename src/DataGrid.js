import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import _ from 'lodash';
import axios from 'axios';
import ModalAlert from './Alert'

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';



function getDevices(e) {


  const config = {
    method: 'get',
    url: e,
    responseType: 'json'
  }

  return axios.request(config)
  
};

const DataFetcher = {
  fetch(page, size, url) {
    let a = [];
    let b = null;
    //webpack regex for proxy doesn't work so doing extract here
    let c = url.match("[^]devices");
    if (c) {
          return  getDevices(c[0]).then(function (response) {
            _.map(response.data, (v, k) => {_.map(v, (v, k) => {_.mapValues(v, function (v) {
              b = _.values(v)
            if (b.length > 1) {
        
                  a.push({id: b[0], name: b[1]});
                }
              
            })})});
            
            return ({items: _.slice(a, (page-1)*size, ((page-1)*size) + size), total: a.length});

      
          })
          .catch(function (error) { 
            console.log(error);       
            return ({items: a, total: 0});
          });

      
        } else {
         return (Promise.all(a).then(function() { return ({items: a, total: 0})}));}
    }
};

const selectRow = {
  mode: 'radio',
  clickToSelect: true,
  hideSelectColumn: true,
  bgColor: '#00BFFF'
};

const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}];


const DataGrid = ({ options, onTableChange, rowEvents }) => (
  <div>
    <BootstrapTable
      remote={ { pagination: true } }
      keyField="id"
      data={ options.items }
      columns={ columns }
      pagination={ paginationFactory(options) }
      onTableChange={ onTableChange}
      selectRow={ selectRow }
      rowEvents={ rowEvents }
    />
  </div>
);


class DGContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      totalSize: 0,
      page: 1,
      sizePerPage: 10,
      showModal: false 
    };
    this.fetchData = this.fetchData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
    this.handleOnTableChange = this.handleOnTableChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  
  
  }

  componentDidCatch(error, info) {
    console.log(info.componentStack);
    console.log(error);
  }

  componentDidMount() {
    this.fetchData();

  
  }

  fetchData(page = this.state.page, sizePerPage = this.state.sizePerPage) {

    DataFetcher.fetch(page, sizePerPage, this.props.devUrl)
      .then(data => {
        this.setState({items: data.items, totalSize: data.total, page, sizePerPage});
      });
  }

  handlePageChange(page, sizePerPage) {


  }

  handleSizePerPageChange(page, sizePerPage) {

    }

 handleModalState(e) {
    this.setState({showModal: e});

 }

  handleOnClick(e, row, rowIndex) {

      if (row.id !== 'did') {
        this.setState({showModal: true}, () => {this.props.selection(null)});
      } else {
        this.setState({showModal: false}, () => {this.props.selection(row.name)});
      }
        
    }



  handleOnTableChange(type, {page, sizePerPage}){
    if (type === 'pagination') {
      this.fetchData(page, sizePerPage);
    }
  }

  render() {
  
    const options = {
      items: this.state.items,
      page: this.state.page,  
      sizePerPage: this.state.sizePerPage,  
      totalSize: this.state.totalSize,
      hidePageListOnlyOnePage: true,
      paginationSize: 5,
      onPageChange: this.handlePageChange,
      alwaysShowAllBtns: false,
      withFirstAndLast: false, 
      hideSizePerPage: true
    };

    const rowEvents = {
      onClick: this.handleOnClick
    }

    let Alert = null;
    if (this.state.showModal) {
      Alert = <ModalAlert state={this.handleModalState.bind(this)}/>;
    }

     return (
      <div>
      <DataGrid
        options={options}
        onTableChange={ this.handleOnTableChange }
        rowEvents={rowEvents}
      />
        {Alert}
      </div>
      
    );
  }
}


export default DGContainer;

