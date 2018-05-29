import React from 'react';
import ReactDOM from 'react-dom';
import PlomoEditor from './components/PlomoEditor';
import './app.css';

if(IS_PLOMO_EDITOR_DEVELOPMENT) {
  ReactDOM.render(<PlomoEditor />, document.getElementById('app'));
}

export default PlomoEditor;
