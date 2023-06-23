import axios from "axios";
import { useEffect, useState } from "react";

const MovieCard = (props) => {

    const [movieInfo, setMovieInfo] = useState([]);

    useEffect(() => {
        axios({
            url: `https://api.themoviedb.org/3/movie/${props.id}`,
            method: "GET",
            dataResponse: "json",
            params: {
                api_key: "c7d2bc1af674054e4cbfe886c8424b11",
            }
        }).then((res) => {
            // console.log(res);

            setMovieInfo(res);
        })

    }, [])

    console.log(movieInfo)

    return (
        <li>
            <div className="imageContainer">
                <img src={`https://image.tmdb.org/t/p/w300/${movieInfo.data.poster_path}`} alt="" />
            </div>
            <div className="buttonContainer">
                <h2>{movieInfo.data.title}</h2>
                <button>ⓘ</button>
                <button>+</button>
            </div>
        </li>
    )
}

export default MovieCard;