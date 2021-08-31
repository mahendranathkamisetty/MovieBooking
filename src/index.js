import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Details from './screens/details/Details';
import Home from './screens/home/Home';
import {BrowserRouter, Route} from "react-router-dom";
import BookShow from './screens/bookshow/BookShow';

const baseUrl = "http://localhost:8085/api/"
ReactDOM.render(
  <BrowserRouter>
     <div>
      
     <Route exact path ="/" component={Home}/>
     <Route exact path="/details/:id"  component={Details}  />
     <Route exact path="/bookshow/:id"  component={BookShow}/>
  
    
     </div>
   </BrowserRouter>, document.getElementById('root'));