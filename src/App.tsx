import * as React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import configureStore from './store/index'
import DateView from './components/dateview'
const store = configureStore()
class App extends React.Component<null, null> {
  render() {
    return (
      <Provider store={store}>
        <DateView />
      </Provider>
    );
  }
}

export default App;
