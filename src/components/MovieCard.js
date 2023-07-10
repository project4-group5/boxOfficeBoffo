import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// imported the styles
import '../styles/movieCard.css';

// MovieCard component
const MovieCard = (props) => {
    // state variable declaration
    const [movieInfo, setMovieInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    // hook variable declaration
    const navigate = useNavigate();

    // useEffect hook to check for any changes made
    useEffect(() => {
        // axios call for API data
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
            // store data or new changes into state
            setMovieInfo(res.data)
            setLoading(false);
        })
        // dependency array
    }, [])

    // function that is called when user wants additional movie info
    const handleClickInfo = () => {
        // navigate user to correct page
        navigate(`/movieDetails/${props.id}`)
    }

    // function that is called when user wants to add movie
    const handleClickAdd = () => {
        // variable spread declaration
        const copyList = [...props.userList];
        // storing movie title into item in array.
        copyList[props.movieSlot] = movieInfo.title;
        // storing new changes into state
        props.setUserList(copyList);

        // empty variable declaration
        let year = "";
        // loop that checks 5 times
        for (let i = 0; i < 4; i++) {
            year += movieInfo.release_date[i];
            console.log(year);
        }
        // navigate user to correct page
        navigate(`/Rankings/${year}`)
    }

    return (
        // fragment element
        <>
            {/* ternary operator that puts loading icon incase API is slower than the app */}
            {loading ? <div>loading</div> : movieInfo !== []
                ? (<li className="movieCard">
                    <div className="imageContainer" onClick={handleClickInfo}>
                        <img src={`https://image.tmdb.org/t/p/w300/${movieInfo.poster_path}`} alt={`Poster for ${movieInfo.title}`} />
                    </div>
                    <h2>{movieInfo.title}</h2>
                    <div className="buttonContainer">
                        <button alt="Info" onClick={handleClickInfo}><i className="fa-solid fa-circle-info"></i></button>
                        <button alt="Add to ranking" onClick={handleClickAdd}><i className="fa-solid fa-plus"></i></button>
                    </div>
                </li>)
                : <></>}
        </>
    )
}

export default MovieCard;