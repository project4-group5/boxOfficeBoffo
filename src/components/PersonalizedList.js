import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PersonalizedList = () => {

  const { personalKey, userYear } = useParams();
  console.log(personalKey, userYear)

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
      const actualList = [];
      for (let i=0; i<10; i++){
        actualList.push(res.data.results[i])
      }
      console.log(actualList);
    })}, [])

  return (
    <>
      <h1>This is your personalized list</h1>
    </>
  )
}

export default PersonalizedList;