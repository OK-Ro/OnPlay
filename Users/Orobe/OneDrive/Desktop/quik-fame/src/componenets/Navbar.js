import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavbarContainer>
      <Logo>
        <Link to="/">Quik Fame</Link>
      </Logo>
      <NavLinks open={menuOpen}>
        <NavLinkItem>
          <Link to="/instagram">Instagram</Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link to="/tiktok">TikTok</Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link to="/youtube">YouTube</Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link to="/contact">Contact</Link>
        </NavLinkItem>
      </NavLinks>
      <IconsContainer>
        <IconLink to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          <CartBadge>4</CartBadge>
        </IconLink>
        <IconLink to="/profile">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </IconLink>
        <ToggleMenuButton onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </ToggleMenuButton>
      </IconsContainer>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensure it's above other content */

  @media (min-width: 769px) {
    justify-content: center;
  }
`;

const Logo = styled.div`
  a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: ${(props) => (props.open ? "1rem" : "0")};
    opacity: ${(props) => (props.open ? "1" : "0")};
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
    transition: opacity 0.3s ease, visibility 0.3s ease, padding 0.3s ease;
  }

  @media (min-width: 769px) {
    margin: 0 auto;
  }
`;

const NavLinkItem = styled.li`
  margin-right: 5rem;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;

    &:hover {
      color: #4caf50;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    margin-right: 1.5rem;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 769px) {
    flex-grow: 1;
    justify-content: flex-end;
  }
`;

const IconLink = styled(Link)`
  margin-right: 1rem;
  color: #333;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    color: #4caf50;
  }
`;

const CartBadge = styled.span`
  background-color: #4caf50;
  color: #fff;
  border-radius: 50%;
  padding: 0.4px 4px;
`;

const ToggleMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: #333;
  font-size: 1.5rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

export default Navbar;
