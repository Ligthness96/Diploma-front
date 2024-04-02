import {Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/elements/header/Header';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import ProjectMain from './components/pages/ProjectMain/ProjectMain'
import React from 'react';
import { selectIsAuth, fetchAuthMe } from './redux/slices/auth';


function App() {
const dispatch = useDispatch()

React.useEffect(() => {
  dispatch(fetchAuthMe())
}, [])

const isAuth = useSelector(selectIsAuth)

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>  
        <Route path='/project/main' element={<ProjectMain/>}/>
      </Routes>
    </div>
  );
}

export default App;
