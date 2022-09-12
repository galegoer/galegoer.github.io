import './App.css';
import RandomVideo from './components/RandomVideo';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <HomePage />
        {/* Random Video for Today */}
        {/* <RandomVideo /> */}
      </header>
    </div>
  );
}

export default App;
