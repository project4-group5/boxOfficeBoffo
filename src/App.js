import Header from './components/Header';
import Footer from './components/Footer';
import Start from './components/Start';
import Gallery from './components/Gallery';
import PersonalizedList from './components/PersonalizedList';
import { Route, Routes } from 'react-router-dom';
import Ranking from './components/Ranking';
import MovieDetails from './components/MovieDetails';
import CompareLists from './components/CompareLists';
import { useState } from 'react';
import HelpButton from './components/HelpButton';

// styles
import './styles/setUp.css';
import './styles/baseStyles.css';

function App() {
  const [movieSlot, setMovieSlot] = useState("")
  const [userList, setUserList] = useState(
    [
      "Click to add movie",
      "Click to add movie",
      "Click to add movie",
      "Click to add movie",
      "Click to add movie",
      "Click to add movie",
      "Click to add movie",
      "Click to add movie",
      "Click to add movie",
      "Click to add movie"
    ]
    )
    

  return (
    <>
      <Header />
      <HelpButton />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Rankings/:userYear" element={<Ranking userList={userList} movieSlot={movieSlot} setUserList={setUserList} setMovieSlot={setMovieSlot} />} />
        <Route path="/Gallery/:userYear" element={<Gallery userList={userList} movieSlot={movieSlot} setUserList={setUserList} />} />
        <Route path="/MovieDetails/:movieId" element={<MovieDetails userList={userList} movieSlot={movieSlot} setUserList={setUserList} />} />
        <Route path="/PersonalizedList/:personalKey/:userYear" element={<PersonalizedList userList={userList} setUserList={setUserList} />} />
        <Route path="/CompareLists" element={<CompareLists userList={userList} setUserList={setUserList} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
