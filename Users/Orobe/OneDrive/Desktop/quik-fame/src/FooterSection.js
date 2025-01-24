import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterContact>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactInfo>
            <ContactIcon icon={faMapMarkerAlt} />
            123 Main Street, City, Country
          </ContactInfo>
          <ContactInfo>
            <ContactIcon icon={faEnvelope} />
            info@example.com
          </ContactInfo>
          <ContactInfo>
            <ContactIcon icon={faPhone} />
            +123 456 7890
          </ContactInfo>
        </FooterContact>
        <FooterLinks>
          <LinksTitle>Quick Links</LinksTitle>
          <Link href="#">Home</Link>
          <Link href="#">Services</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Contact</Link>
        </FooterLinks>
        <FooterSocial>
          <SocialTitle>Follow Us</SocialTitle>
          <SocialIcons>
            <SocialIcon href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </SocialIcon>
            <SocialIcon href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialIcon>
            <SocialIcon href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialIcon>
          </SocialIcons>
        </FooterSocial>
      </FooterTop>
      <FooterBottom>
        <Copyright>&copy; 2024 Your Company. All Rights Reserved.</Copyright>
        <PrivacyPolicy>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </PrivacyPolicy>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 50px 20px;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterContact = styled.div`
  flex: 1;
  margin-right: 30px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const ContactInfo = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ContactIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const FooterLinks = styled.div`
  flex: 1;
  margin-right: 30px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

const LinksTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Link = styled.a`
  display: block;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #fff;
  text-decoration: none;
`;

const FooterSocial = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const SocialTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
`;

const SocialIcon = styled.a`
  font-size: 1.5rem;
  margin-right: 10px;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Copyright = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const PrivacyPolicy = styled.div`
  font-size: 1.2rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export default FooterSection;
