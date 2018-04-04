import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500 } from 'material-ui/styles/colors';

import App from './components/App/App';

const muiTheme = getMuiTheme({
  palette: {
    textColor: green500,
  },
  appBar: {
    height: 50,
  },
});
ReactDOM.render(
  <Provider store={store}>
   <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
Register();
