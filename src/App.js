import Header from './components/Header';
import Footer from './components/Footer';
import Start from './components/Start';
import Gallery from './components/Gallery';
import { Route, Routes } from 'react-router-dom';
import Ranking from './components/Ranking';
import MovieDetails from './components/MovieDetails';

// styles
import './styles/setUp.css'
import './styles/baseStyles.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Start />}/>
        <Route path="/Rankings/:userYear" element={<Ranking />}/>
        <Route path="/Gallery/:userYear" element={<Gallery />}/>
        <Route path="/MovieDetails/:movieId" element={<MovieDetails />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
