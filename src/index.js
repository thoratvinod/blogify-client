import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#3e8dbb"
      },
      secondary: {
        main: "#c20e0e"
      }
    }
  });

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
  document.getElementById('root'),
);
