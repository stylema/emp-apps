import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Layout from '../Layout';
import Preview from '../Preview';
import * as serviceWorker from '../serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import IconPage from "../IconPage";
import Test1Index from "../pages/Test";

const App = () => {

  return (
    <BrowserRouter>
      <Route exact path="/" component={Layout} />
      <Route exact path="/preview" component={Preview} />
      <Route exact path="/iconPage" component={IconPage} />
      <Route exact path="/Test1Index" component={Test1Index} />
    </BrowserRouter >
  )
}

export default App;

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
