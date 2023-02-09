import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Navbar from './components/Navbar';
import AllRoutes from './components/Routes';
function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      {/* <Home /> */}
    </div>
  );
}

export default App;
