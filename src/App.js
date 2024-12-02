import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import AddHealthData from './components/CreateHealth';
import ReadHealthData from './components/ReadHealth';
function App() {
  return (
    <Router>
    <NavigationBar />
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/addHealth" element={<AddHealthData/>} />
      <Route path="/readHealth" element={<ReadHealthData/>} />
    </Routes>
  </Router>
  );
}

export default App;
