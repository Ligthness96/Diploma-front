import {Routes, Route} from 'react-router-dom';

import './App.css';
import Auth from './components/pages/Auth/Auth';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Пока ничего нет
        </p>
      </header>
      <Routes>
          <Route path='/' element={<Auth/>}/>
      </Routes>
    </div>
  );
}

export default App;
