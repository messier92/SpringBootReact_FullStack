import {useState, useEffect} from 'react';
import axios from 'axios';
import Layout from './Components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './Components/home/Home';
import Header from './Components/header/Header';
import Trailer from './Components/trailer/Trailer';
import Reviews from './Components/reviews/Reviews';
import NotFound from './Components/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {     
      const response = await axios.get(`http://localhost:8080/api/v1/movies`)
      console.log(response.data);
      setMovies(response.data); 
    } catch(err) {
      console.log(err);
    }
  }

  const getMovieData = async (movieId) => {
    try 
    {
        const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        setReviews(singleMovie.reviews);
    } 
    catch (error) 
    {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
