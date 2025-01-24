import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faCreditCard,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const OrderingProcessSection = () => {
  return (
    <Container>
      <SectionTitle>How the Ordering Process Works</SectionTitle>
      <ProcessGrid>
        <ProcessStep>
          <StepIcon icon={faSearch} />
          <StepTitle>Search</StepTitle>
          <StepDescription>
            Browse our services and select the one that meets your needs.
          </StepDescription>
        </ProcessStep>
        <ProcessStep>
          <StepIcon icon={faShoppingCart} />
          <StepTitle>Order</StepTitle>
          <StepDescription>
            Add the selected service to your cart and proceed to checkout.
          </StepDescription>
        </ProcessStep>
        <ProcessStep>
          <StepIcon icon={faCreditCard} />
          <StepTitle>Payment</StepTitle>
          <StepDescription>
            Complete the payment securely using your preferred payment method.
          </StepDescription>
        </ProcessStep>
        <ProcessStep>
          <StepIcon icon={faCheck} />
          <StepTitle>Confirmation</StepTitle>
          <StepDescription>
            Receive confirmation of your order and track its progress.
          </StepDescription>
        </ProcessStep>
      </ProcessGrid>
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

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const ProcessStep = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StepIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: #4caf50;
  margin-bottom: 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const StepDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

export default OrderingProcessSection;
