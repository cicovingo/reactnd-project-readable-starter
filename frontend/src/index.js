import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './Store'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500 } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    textColor: green500,
  },
  appBar: {
    height: 50,
  },
});
ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={muiTheme}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();