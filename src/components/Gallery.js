import MovieCard from "./MovieCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// imported the styles
import '../styles/gallery.css';

// Gallery component
const Gallery = (props) => {
   // hooks variable declaration
   const { userYear } = useParams();
   const navigate = useNavigate();
   // state variable declaration
   const [movieList, setMovieList] = useState([]);
   const [loading, setLoading] = useState(true);

   // useEffect hook that checks to see if theres any changes made
   useEffect(() => {
      // axios call for API
      axios({
         url: "https://api.themoviedb.org/3/discover/movie",
         method: "GET",
         dataResponse: "json",
         params: {
            api_key: "c7d2bc1af674054e4cbfe886c8424b11",
            include_adult: "false",
            include_video: "false",
            language: "en-US",
            page: "1",
            primary_release_year: `${userYear}`,
            "primary_release_date.gte": `${userYear}-05-01`,
            "primary_release_date.lte": `${userYear}-09-04`,
            sort_by: "revenue.desc",
            with_original_language: "en",
         },
      }).then((res) => {
         // storing API data into variable
         const newMovieList = res.data.results;

         // for each method that checks each item in array
         props.userList.forEach((userMovie) => {
            // for each method
            newMovieList.forEach((apiMovie, index) => {
               // if userMovie matches the ApiMovie, then splice it into newMovie array
               if (userMovie === apiMovie.title) {
                  newMovieList.splice(index, 1);
               }
            })
         })

         // sorts the movie names alphabetically
         newMovieList.sort((a, b) => {
            const movieA = a.title.toUpperCase(); // ignore upper and lowercase
            const movieB = b.title.toUpperCase(); // ignore upper and lowercase
            // if first movie is less than second movie
            if (movieA < movieB) {
               return -1;
            }
            // if first movie is greater than second movie
            if (movieA > movieB) {
               return 1;
            }
            // names must be equal
            return 0;
         });
         // setting the state with new data
         setMovieList(newMovieList);
         setLoading(false);
      });
      // dependancy array to check only when theres changes occurring in userYear state
   }, [userYear]);

   // function that is called when user wants to go back to previous component
   const handleBackClick = () => {
      navigate(`/Rankings/${userYear}`)
   }

   return (
      // section begins
      <section>
         {/* wrapper container begins */}
         <div className="wrapper">
            {/* back button that calls function */}
            <button className="backButton galleryBack" onClick={handleBackClick}><i className="fa-solid fa-arrow-left"></i></button>
            {/* ternary operator to show loading if the api is slower than the app */}
            {loading 
            ? 
            <>Loading...</> 
            :            
            <ul className="gallery glass">
               {
                  // mapping through array to append each movie
                  movieList.map((movie) => {
                     return (
                        <MovieCard id={movie.id} userList={props.userList} movieSlot={props.movieSlot} setUserList={props.setUserList} />
                     )
                  })
               }
            </ul>}
         </div> {/* wrapper container ends */}
      </section>// section ends
   )
}

export default Gallery;