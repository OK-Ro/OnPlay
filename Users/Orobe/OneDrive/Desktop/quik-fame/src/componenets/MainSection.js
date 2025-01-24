import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const MainSection = () => {
  return (
    <ContentContainer>
      <ContentBox>
        <MainHeader>
          Boost your online presence effortlessly with Quik Fame
        </MainHeader>
        <SubHeader>Unlock your digital potential</SubHeader>
        <ButtonContainer>
          <StyledCartLink to="/cart">
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ marginRight: "0.5rem" }}
            />
            Go to Cart
          </StyledCartLink>
          <StyledContactLink to="/contact">
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{ marginRight: "0.5rem" }}
            />
            Contact Us
          </StyledContactLink>
        </ButtonContainer>
      </ContentBox>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://conroycreativecounsel.com/wp-content/uploads/2023/08/04-being-social.jpeg");
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentBox = styled.div`
  padding: 2rem;
  border-radius: 8px;
  max-width: 60%;
  width: 100%;
`;

const MainHeader = styled.h1`
  font-size: 9rem;
  margin-bottom: 2rem;
  color: #ffd000;
  text-align: center;
  text-shadow: 2px 2px 9px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubHeader = styled.h2`
  font-size: 3rem;
  color: #333;
  margin-bottom: 4rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCartLink = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #ff0d62;
  color: #fff;
  padding: 2rem 5rem;
  border: none;
  border-radius: 10px;
  margin-bottom: 3rem;
  text-decoration: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const StyledContactLink = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #0dd3ff;
  color: #fff;
  padding: 2rem 3rem;
  border: none;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-decoration: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.8rem;
  }
`;

export default MainSection;
