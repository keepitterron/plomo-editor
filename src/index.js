import React from 'react';
import ReactDOM from 'react-dom';
import PlomoEditor from './components/PlomoEditor';
import './app.css';

if(process && process.env.NODE_ENV) {
  ReactDOM.render(<PlomoEditor />, document.getElementById('app'));
}

export default PlomoEditor;
