import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <p>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </p>
  );
}

export default App;
