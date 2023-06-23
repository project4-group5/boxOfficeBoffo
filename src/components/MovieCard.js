import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {

    const [movieInfo, setMovieInfo] = useState([]);
    const navigate = useNavigate();
    console.log( movieInfo)
    
    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/movie/${props.id}`,
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
            setMovieInfo(res.data)

        })

    },[])

    const handleClickInfo = () => {
        console.log('it works');
        // logic 
        navigate(`/movieDetails/${props.id}`)
    }

    // console.log(movieInfo)

    return (
        movieInfo !== []
            ? ( <li>
                <div className="imageContainer">
                    <img src={`https://image.tmdb.org/t/p/w300/${movieInfo.poster_path}`} alt={`Poster for ${movieInfo.title}`} />
                </div>
                <div className="buttonContainer">
                    <h2>{movieInfo.title}</h2>
                    <button onClick={handleClickInfo}>ⓘ</button>
                    <button>+</button>
                </div>
            </li> ) 
            : <></> 
    )
}

export default MovieCard;