import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './Container';
import registerServiceWorker from './registerServiceWorker';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


ReactDOM.render(<Container />, document.getElementById('root'));
  
registerServiceWorker();