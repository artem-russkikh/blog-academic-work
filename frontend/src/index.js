import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'moment/locale/ru';
import moment from 'moment';

moment.locale('ru')
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
