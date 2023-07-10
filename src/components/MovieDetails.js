import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

// imported the styles
import '../styles/movieDetails.css';

// MovieDetails component
const MovieDetails = (props) => {
    // hook variable declaration
    const { movieId } = useParams();
    const navigate = useNavigate();
    // state variable declaration
    const [movie, setMovie] = useState([]);

    // function that is called when user wants to go back to previous page
    const handleBackClick = () => {
        // change year to empty string
        let year = "";
        // for loop that checks 5 times
        for (let i=0; i<4; i++) {
            year += movie.release_date[i];
        }
        // navigate user to correct component
        navigate(`/Gallery/${year}`)
    }

    // function that is called when user wants to add movie to the list
    const handleAddClick = () => {
        // spreading variable declaration
        const copyList = [ ...props.userList ];
        // storing the movie title into the copyList array
        copyList[props.movieSlot] = movie.title;
        // storing copyList data into state
        props.setUserList(copyList);
        // empty variable declaration
        let year = "";
        // loop that checks 5 times
        for (let i = 0; i < 4; i++) {
            year += movie.release_date[i];
        }
        // navigate user to correct component
        navigate(`/Rankings/${year}`)
    }
    
    // useEffect hook that checks for any changes
    useEffect(() => {
        // axios call
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
            // storing data into state
            setMovie(res.data)
        })
    }, [])


    return(
        // section begins
        <section className="movieDetails wrapper">
            {/* wrapper and flex container */}
            <div className="glass flexContainer">
                {/* back button container */}
                <div className="backButton detailsBack">
                    <button alt="Back to gallery" onClick={handleBackClick}><i className="fa-solid fa-arrow-left"></i></button>
                </div>
                {/* image container */}
                <div className="imageContainer">
                    <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
                </div>
                {/* movie container */}
                <div className="movieTitle">
                    <h2>{movie.title}</h2>
                    <p><span>Release date:</span> {movie.release_date}</p>
                    <p><span>Tagline:</span> {movie.tagline}</p>
                    <p><span>Synopsis:</span> {movie.overview}</p>
                    {/* add button */}
                    <button alt="Add to ranking" onClick={handleAddClick}><i class="fa-solid fa-plus"></i></button>
                </div>
                
            </div>{/* wrapper and flex container ends */}
        </section>// section ends
    )
}

export default MovieDetails