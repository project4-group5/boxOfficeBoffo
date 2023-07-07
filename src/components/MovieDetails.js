import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

import '../styles/movieDetails.css';

const MovieDetails = (props) => {

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

    const handleAddClick = () => {
            const copyList = [ ...props.userList ];
            copyList[props.movieSlot] = movie.title;
            props.setUserList(copyList);

            let year = "";
            for (let i = 0; i < 4; i++) {
                year += movie.release_date[i];
                console.log(year);
            }
            navigate(`/Rankings/${year}`)
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
        <section className='movieDetails'>
            <div className='wrapper glass flexContainer'>
                <div>
                    <button className="backButton" onClick={handleBackClick}><i className="fa-solid fa-arrow-left"></i></button>
                </div>
                <div className="imageContainer">
                    <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
                </div>
                <div className="movieTitle">
                    <h2>{movie.title}</h2>
                    <p><span>Release date:</span> {movie.release_date}</p>
                    <p><span>Tagline:</span> {movie.tagline}</p>
                    <p><span>Synopsis:</span> {movie.overview}</p>
                    <button onClick={handleAddClick}><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </section>
    )
}

export default MovieDetails