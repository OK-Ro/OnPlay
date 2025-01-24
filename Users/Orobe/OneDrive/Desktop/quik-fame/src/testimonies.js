import React from "react";
import styled from "styled-components";

const TestimonialsSection = () => {
  return (
    <Container>
      <SectionTitle>What Our Customers Say</SectionTitle>
      <TestimonialsGrid>
        <TestimonialItem>
          <TestimonialText>
            "I'm amazed by the results! My social media presence has skyrocketed
            thanks to FollowersNet."
          </TestimonialText>
          <TestimonialAuthor>- John Doe</TestimonialAuthor>
        </TestimonialItem>
        <TestimonialItem>
          <TestimonialText>
            "FollowersNet has been a game-changer for my business. Highly
            recommended!"
          </TestimonialText>
          <TestimonialAuthor>- Jane Smith</TestimonialAuthor>
        </TestimonialItem>
        <TestimonialItem>
          <TestimonialText>
            "The support team at FollowersNet is top-notch. They're always there
            to help whenever I need assistance."
          </TestimonialText>
          <TestimonialAuthor>- David Johnson</TestimonialAuthor>
        </TestimonialItem>
      </TestimonialsGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #333;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const TestimonialItem = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const TestimonialAuthor = styled.div`
  font-size: 1.2rem;
  font-style: italic;
  color: #666;
  text-align: right;
`;

export default TestimonialsSection;
