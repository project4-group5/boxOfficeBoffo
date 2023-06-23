import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

const MovieDetails = () => {

    const { movieId } = useParams();
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate();

    const handleBackClick = () => {
        
        let year = "";
        for (let i=0; i<4; i++) {
            year += movie.release_date[i];
            console.log(year);
        }
        navigate(`/Gallery/${year}`)
    }

    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/movie/${movieId}`,
            method: "GET",
            dataResponse: "json",
            params: {
                api_key: "c7d2bc1af674054e4cbfe886c8424b11",
            }
        }).then((res) => {
            // setTimeout(()=>{
            //     setMovieInfo(res.data);
            // }, 300)
            console.log(res.data);
            setMovie(res.data)
        })

    }, [])

    return(
        <section>
            <div className='wrapper'>
                <div className="backButton">
                    <button onClick={handleBackClick}>Back</button>
                </div>
                <div className="wrapper">
                    <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
                </div>
                <div className="movieTitle">
                    <h2>Title {movie.title}</h2>
                    <p>Release date {movie.release_date}</p>
                    <p>Tagline {movie.tagline}</p>
                    <p>Synopsis {movie.overview}</p>
                    <button>Add to ranking</button>
                </div>
            </div>
        </section>
    )
}

export default MovieDetails