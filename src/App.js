import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import Admin from './components/Admin/Admin';
import ManageItem from './components/Admin/ManageItem';
import CheckOut from './components/OrderView/CheckOut';
import OrderReview from './components/OrderView/OrderReview';
import OrderList from './components/OrderView/OrderList';
import DeleteProduct from './components/Admin/DeleteProduct';

  export const UserContext = createContext();

function App(props) {
    const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <h3>{loggedInUser.name}</h3>
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <PrivateRoute path="/manageItem">
        <ManageItem></ManageItem>
        </PrivateRoute>
        <PrivateRoute path="/admin">
          <Admin></Admin>
        </PrivateRoute>
        <Route path="/login">
         <Login></Login>
        </Route>
        <PrivateRoute path="/checkOut">
         <CheckOut></CheckOut>
        </PrivateRoute>
        <PrivateRoute path="/orderList">
         <OrderList></OrderList>
        </PrivateRoute>
        <PrivateRoute path="/orderReview">
          <OrderReview></OrderReview>
        </PrivateRoute>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="deleteItem/:id">
          <ManageItem></ManageItem>
          </Route>
        <PrivateRoute path="/deleteProduct">
          <DeleteProduct></DeleteProduct>
        </PrivateRoute>
      </Switch>
    </Router>
  </UserContext.Provider>
  );
}

export default App;
