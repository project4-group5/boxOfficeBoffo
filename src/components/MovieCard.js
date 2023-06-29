import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/movieCard.css';

const MovieCard = (props) => {

    const [movieInfo, setMovieInfo] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
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
            setMovieInfo(res.data)
            setLoading(false);
        })

    }, [])

    const handleClickInfo = () => {
        console.log('it works');
        // logic 
        navigate(`/movieDetails/${props.id}`)
    }

    const handleClickAdd = () => {
        const copyList = [...props.userList];
        copyList[props.movieSlot] = movieInfo.title;
        props.setUserList(copyList);

        let year = "";
        for (let i=0; i<4; i++) {
            year += movieInfo.release_date[i];
            console.log(year);
        }
        navigate(`/Rankings/${year}`)
    }

    // console.log(movieInfo)

    return (   
        <>
            {loading ? <div>loading</div> : movieInfo !== []
                ? (<li className="movieCard">
                    <div className="imageContainer">
                        <img src={`https://image.tmdb.org/t/p/w300/${movieInfo.poster_path}`} alt={`Poster for ${movieInfo.title}`} />
                    </div>
                    <h2>{movieInfo.title}</h2>
                    <div className="buttonContainer">
                        <button onClick={handleClickInfo}><i class="fa-solid fa-circle-info"></i></button>
                        <button onClick={handleClickAdd}><i className="fa-solid fa-plus"></i></button>
                    </div>
                </li>)
                : <></>}

        
        </>
    )
}

export default MovieCard;