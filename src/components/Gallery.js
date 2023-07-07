import MovieCard from "./MovieCard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import '../styles/gallery.css';


const Gallery = (props) => {
   const { userYear } = useParams();
   const [movieList, setMovieList] = useState([]);
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);


   console.log(userYear);

   useEffect(() => {
      
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
         
          
         console.log(res);
         const newMovieList = res.data.results;

         props.userList.forEach((userMovie) => {
            newMovieList.forEach((apiMovie, index) => {
               if (userMovie === apiMovie.title) {

                  newMovieList.splice(index, 1);
               }
            })
         })

         //sorts the movie names alphabetically
         newMovieList.sort((a, b) => {
            const movieA = a.title.toUpperCase(); // ignore upper and lowercase
            const movieB = b.title.toUpperCase(); // ignore upper and lowercase
            if (movieA < movieB) {
               return -1;
            }
            if (movieA > movieB) {
               return 1;
            }

            // names must be equal
            return 0;
         });
         setMovieList(newMovieList);
         setLoading(false);
      });
   }, [userYear]);

   const handleBackClick = () => {
      navigate(`/Rankings/${userYear}`)
   }

   return (
      <section>
         <div className="wrapper">
            <button onClick={handleBackClick} className="backButton"><i className="fa-solid fa-arrow-left"></i></button>
            {loading 
            ? 
            <>Loading...</> 
            :            
            <ul className="gallery glass">
               {
                  movieList.map((movie) => {
                     return (
                        <MovieCard id={movie.id} userList={props.userList} movieSlot={props.movieSlot} setUserList={props.setUserList} />
                     )
                  })
               }
            </ul>}
         </div>
      </section>
   )
}

export default Gallery;