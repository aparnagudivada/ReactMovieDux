import './App.css';
import './styles.css';
import MoviesGrid from './components/MoviesGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import WatchList from './components/WatchList';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import { useState,useEffect } from "react";
function App() {
  const [movies,setMovies] =useState([]);
  const [watchlist,setWatchList]=useState([]);

  useEffect(()=>{
    fetch("movies.json").then 
    (response =>response.json())
    .then(data=>setMovies(data))
   },[]); 
   const toggleWatchList =(movieId)=>{
    setWatchList(prev=> 
      prev.includes(movieId) ? prev.filter(id=>id !== movieId) :
      [...prev,movieId]
    )
   }
  return (
    <div className="App">
      <div className='container'>
        <Header/>
        <Router>
          <nav>
            <ul>
              <li>
              <Link to ="/">Home</Link>
              </li>
              <li>
              <Link to="/WatchList">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
          <Route path="/" element={<MoviesGrid  watchlist={watchlist} movies={movies} toggleWatchList={toggleWatchList}/>}></Route>
          <Route path="WatchList" element={<WatchList watchlist={watchlist} movies={movies} toggleWatchList={toggleWatchList}/>}></Route>
          </Routes>
        </Router>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
