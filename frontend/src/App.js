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
import { Download } from './components/Download';
import { MakerEdit } from './components/MakerEdit';
import { Sitemap } from './components/Sitemap';
import { Aboutus } from './components/Aboutus';
import { Contact } from './components/Contact';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';
import { Cookie } from './components/Cookie';

function App() {
  return (
    
    <div className=''>
      <BrowserRouter>
    <div className='container p-lg-0'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/maker" element={<Maker />} />
        <Route path="/cat/:name" element={<CategoryList />} />
        <Route path="/puzzle/:id" element={<Playgame />} />
        <Route path="/puzzle/:id/download" element={<Download />} />
        <Route path="/maker-edit/:id/:key" element={<MakerEdit />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms-condition" element={<Terms />} />
        <Route path="/cookie" element={<Cookie />} />

      </Routes>
    </div>
      <Footer/>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
