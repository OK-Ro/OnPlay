import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShieldAlt,
  faGlobe,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const WhyChooseUsSection = () => {
  return (
    <Container>
      <SectionTitle>Why Choose Us</SectionTitle>
      <FeaturesContainer>
        <Feature>
          <Icon icon={faHeart} />
          <FeatureTitle>Passionate Team</FeatureTitle>
          <FeatureDescription>
            We are passionate about helping you achieve your goals.
          </FeatureDescription>
        </Feature>
        <Feature>
          <Icon icon={faShieldAlt} />
          <FeatureTitle>Guaranteed Safety</FeatureTitle>
          <FeatureDescription>
            Your safety and security are our top priorities.
          </FeatureDescription>
        </Feature>
        <Feature>
          <Icon icon={faGlobe} />
          <FeatureTitle>Global Reach</FeatureTitle>
          <FeatureDescription>
            Our services are available worldwide, ensuring you can reach your
            audience anywhere.
          </FeatureDescription>
        </Feature>
        <Feature>
          <Icon icon={faHeadset} />
          <FeatureTitle>Dedicated Support</FeatureTitle>
          <FeatureDescription>
            Our dedicated support team is always available to assist you.
          </FeatureDescription>
        </Feature>
      </FeaturesContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 80px 20px;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`;

const Feature = styled.div`
  flex: 1 1 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

export default WhyChooseUsSection;
