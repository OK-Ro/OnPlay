import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import "@splidejs/splide/dist/css/splide.min.css";

function Popular() {
  const [randomMovies, setRandomMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = localStorage.getItem("randomMovies");
        if (localData) {
          setRandomMovies(JSON.parse(localData));
          setIsLoading(false);
        } else {
          const apiUrl = "http://localhost:3005/api/movies/latest?count=20";

          const response = await axios.get(apiUrl);
          console.log("API Response:", response.data);
          setRandomMovies(response.data.movies);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching random movies:", error);
        setError("An error occurred while fetching data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("Random Movies:", randomMovies);

  return (
    <PopularContainer>
      <PopularHeader>
        <h1>Popular Now</h1>
      </PopularHeader>

      {isLoading ? (
        <LoadingIndicator>Loading...</LoadingIndicator>
      ) : error ? (
        <ErrorIndicator>{error}</ErrorIndicator>
      ) : (
        <SliderContainer>
          <CustomSplide
            options={{
              perPage: 8,
              gap: "0.2rem",
              pagination: false,
            }}
          >
            {randomMovies.map((movie) => (
              <SplideSlide key={movie._id}>
                <MoviePoster>
                  <Link to={`details/${movie._id}`}>
                    <img src={movie.thumbnail} alt={movie.title} />
                    <PlayCircleOutlineIcon className="play-button" />
                  </Link>
                </MoviePoster>
              </SplideSlide>
            ))}
          </CustomSplide>
        </SliderContainer>
      )}
    </PopularContainer>
  );
}

const PopularContainer = styled.div`
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  padding: 3rem;
`;

const PopularHeader = styled.div`
  background-color: transparent;
  padding: 20px;
  padding-left: 40px;
  text-align: left;
`;

const SliderContainer = styled.div`
  margin: 20px;
`;

const CustomSplide = styled(Splide)`
  .splide__slide {
    width: 100%;
    margin: 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s;
    border-radius: 10px; /* Rounded corners for the movie posters */
  }

  .splide__slide img {
    width: 100%;
    height: auto;
    display: block;
  }

  .splide__slide:hover {
    transform: scale(1.05); /* Slight scale on hover */
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
`;

const ErrorIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  color: red;
`;

const MoviePoster = styled.div`
  width: 10vw;
  margin: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 10px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .play-button {
    color: yellow;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 8rem;
    opacity: 0;
  }

  &:hover .play-button {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export default Popular;
