import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import web3 from './web3';
// import twittor from './twittor';

import { DrizzleProvider, DrizzleContext } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';

import './App.css';

import drizzleOptions from './drizzleOptions';
import MyContainer from './MyContainer';
import store from './middleware';

class App extends React.Component {
  render() {
    console.log(this.props, 'PROPS');
    return (
      <DrizzleProvider store={store} options={drizzleOptions}>
        <LoadingContainer>
          <MyContainer />
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
