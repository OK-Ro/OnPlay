import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
import useMovies from "../Hooks/useMovies";

const Latest = () => {
  const latestMovies = useMovies;

  return (
    <Wrapper>
      <Container>
        {latestMovies.length > 0 ? (
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            emulateTouch
          >
            {latestMovies.map((movie) => (
              <div key={movie.title}>
                <Card>
                  <Image src={movie.thumbnail} alt={movie.title} />
                  <Content>
                    <Title>{movie.title}</Title>
                    <MovieInfo>
                      <p>Year: {movie.year}</p>
                      <p>Cast: {movie.cast.join(", ")}</p>
                      <p>Genres: {movie.genres.join(", ")}</p>
                    </MovieInfo>
                  </Content>
                </Card>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No latest movies available.</p>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f0f0f0;
`;

const Container = styled.div`
  background-color: #000;
  padding-top: 15rem;
  display: block;
  box-sizing: border-box;
`;

const Card = styled.div`
  position: relative;
  width: 93vw;
  height: 35rem;
  border-radius: 2rem;
  overflow: hidden;
  margin: 0 auto;
  border: 1rem solid transparent;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Image = styled.img`
  width: 100%;
  height: fit-content;
  object-fit: fill;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.08);
  padding: 1rem;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  padding-left: 2rem;

  text-align: left;
`;

const MovieInfo = styled.div`
  text-align: left;
  color: #fff;
  font-size: 1.2rem;
  padding-bottom: 4rem;
  padding-left: 2rem;
  width: 35rem;
  p {
    margin: 0.25rem 0;
  }
`;

export default Latest;
