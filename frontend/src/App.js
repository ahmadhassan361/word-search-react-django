import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { Maker } from './components/Maker';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CategoryList } from './components/CategoryList';
import { Playgame } from './components/Playgame';
import { MakerPuzzle } from './components/MakerPuzzle';

function App() {
  return (
    
    <div className=''>
      <BrowserRouter>
    <div className='container p-lg-0'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maker" element={<Maker />} />
        <Route path="/cat/:name" element={<CategoryList />} />
        <Route path="/puzzle/:id" element={<Playgame />} />
        {/* <Route path="/maker/:id" element={<MakerPuzzle />} /> */}

      </Routes>
    </div>
      <Footer/>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
