import {Routes, Route} from 'react-router-dom';

import './App.css';
import Header from './components/elements/Header';
import Hello from './components/elements/Hello';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Hello/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
