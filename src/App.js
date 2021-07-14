import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import Header from './components/Header/Header';
import Admin from './components/Admin/Admin';
import ManageItem from './components/Admin/ManageItem';
import OrderList from './components/OrderView/OrderList';
import ItemDetail from './components/Item/ItemDetail';
import OrderReview from './components/OrderView/OrderReview';

  export const UserContext = createContext();

function App(props) {
    const data = JSON.parse(localStorage.getItem('userId'));
    const [loggedInUser, setLoggedInUser] = useState(data);
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header/>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/itemDetail/:id">
        <ItemDetail></ItemDetail>
        </Route>
        <Route path="/admin">
          <Admin></Admin>
        </Route>
        <Route path="/login">
         <Login></Login>
        </Route>
        <Route path="/orderList">
         <OrderList></OrderList>
        </Route>
        <Route path="/orderReview">
          <OrderReview/>
        </Route>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="deleteItem/:id">
          <ManageItem></ManageItem>
          </Route>
      </Switch>
    </Router>
  </UserContext.Provider>
  );
}

export default App;
