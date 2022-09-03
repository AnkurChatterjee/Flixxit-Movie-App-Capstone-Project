import './App.css';
import Home from './components/Home';
import Watch from './components/watch/Watch';
import Register from './components/Register';
import Login from './components/Login';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to='/register' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/movies' element={user ? <Home type={"movie"} /> : <Navigate to='/register' />} />
          <Route path='/series' element={user ? <Home type={"series"} /> : <Navigate to='/register' />} />
          <Route path='/watch' element={user ? <Watch /> : <Navigate to='/register' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;