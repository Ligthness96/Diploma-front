import {Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/elements/Header';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import React from 'react';
import { selectIsAuth, fetchAuthMe } from './redux/slices/auth';


function App() {
const dispatch = useDispatch()
const isAuth = useSelector(selectIsAuth)

React.useEffect(() => {
  dispatch(fetchAuthMe())
}, [])


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>  
      </Routes>
    </div>
  );
}

export default App;
