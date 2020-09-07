import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {
  createMuiTheme,
  colors,
  ThemeProvider
} from '@material-ui/core';
import Axios from 'axios';
import store from './redux/store';

const { yellow, deepPurple } = colors;

Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';

const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: yellow[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
