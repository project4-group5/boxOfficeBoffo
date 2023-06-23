import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Start from './components/Start';
import Gallery from './components/Gallery';
import { Route, Routes } from 'react-router-dom';
import Ranking from './components/Ranking';
import MovieDetails from './components/MovieDetails';
import { useState } from 'react';

function App() {

  const [ userList, setUserList ] = useState(
      {
        one: "Click to add movie",
        two: "Click to add movie",
        three: "Click to add movie",
        four: "Click to add movie",
        five: "Click to add movie",
        six: "Click to add movie",
        seven: "Click to add movie",
        eight: "Click to add movie",
        nine: "Click to add movie",
        ten: "Click to add movie"
      }
  )

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Start />}/>
        <Route path="/Rankings/:userYear" element={<Ranking userList={userList} />}/>
        <Route path="/Gallery/:userYear" element={<Gallery />}/>
        <Route path="/MovieDetails/:movieId" element={<MovieDetails />} />
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
