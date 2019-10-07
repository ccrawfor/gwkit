import React, { Component } from 'react';
import update from 'immutability-helper';
import _ from 'lodash';
import axios from 'axios';
import Dygraph from 'dygraphs';


function getTelemetry(e) {


    const config = {
      method: 'get',
      url: e,
      responseType: 'json'
    }
    console.log(config.url);
    return axios.request(config)
    
  };

function connect() {
    return new Promise(function(resolve, reject) {
        var server = new WebSocket('ws://127.0.0.1:9000');


        server.onopen = function() {
            resolve(server);
        };
        server.onerror = function(err) {
            reject(err);
        };

    });
}

const DataFetcher = {

    
    fetch(url) {
      let a = [];    
      //this dude gets data from node/server.js
        //webpack regex for proxy doesn't work so doing extract here
      let c = "/devices/".concat(url).concat("/telemetry");
         return  getTelemetry(c).then(function (response) {
            _.map(response.data, (v, k) => {
              var c = _.values(v);
              var x = new Date(c[1] - 1 * 1000);
               a.push(x,c[2])
            }
        )
    
        return a; }  
    )
    .catch(function (error) { 
            console.log(error);
            return [];       
          });
        
    
    }
    
};


class DyGraph extends Component {

    constructor(props) {
        super(props);
        //treat state as immutable.  Use setState for a manual mutation
        this.state = {
            data: [],
            interval: null
          };

        this.label = {labels:  [ "time", "telemetry" ]};
        this.g = null;
        this.ws = null;
          

    }

   

    componentDidMount() {
    
          var t = new Date();
          var x = new Date(t.getTime() - 1  * 1000);
          this.state.data.push([x, 0]);
          var convert = (evt) => { var s = evt.split(","); var a = []; a.push(new Date(s[0]), parseFloat(s[1])); return a;};
          
        this.g = new Dygraph(this.refs.chart, this.state.data, this.label); 
    
        this.ws = new WebSocket('ws://127.0.0.1:9000');
	console.log("opened socket");
        // listen to onmessage event
        var a = [];

        this.ws.onmessage = evt => { 
 		a.push(convert(evt.data));
                this.g.updateOptions({'file': a});
         
                
        };
      
 /*    
        //uncomment the following to get data from node/server
        var interval = setInterval(() => {
            
            
            DataFetcher.fetch(this.props.did)
                .then(data => {
                this.setState( (state) => 
                    update(state, {data: {$push: [data]}})); 
            });
            
            
             
             this.g.updateOptions({ 'file': this.state.data });
        }, 1000);
     
        this.setState({interval: interval});
*/

/*
      //uncomment to run against a local data file.  In this example we are using vibration data from a running motor
      //this.g.updateOptions({ 'file': "motion.csv" });

*/
        

    }       

   
    shouldComponentUpdate() {
        return false;
      }

    componentWillReceiveProps(newProps) {
        
       
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
     }

    render() {
        return <div ref="chart"></div>;
       
    }
}
export default DyGraph;
