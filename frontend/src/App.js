
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './components/Authentication';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/login' element={<Authentication />}/>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
