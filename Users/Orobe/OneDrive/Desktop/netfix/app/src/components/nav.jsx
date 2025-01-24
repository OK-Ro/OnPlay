import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { FaFilm, FaTv } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import { useState, useEffect } from "react";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;
  padding: 2.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
  color: #fff;
  transition: background-color 0.3s ease-in-out;

  ${(props) =>
    props.isScrolled &&
    `
    background-color: #333;
    padding: 1.5rem 2.5rem; /* Adjust padding for scrolled state */
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); /* Add a shadow when scrolled */
  `}
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: 700;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const IconLink = styled(Link)`
  font-size: 2.5rem;
  margin-right: 8rem;
  cursor: pointer;
  font-weight: 700;
  color: white;
  position: relative;
  transition: color 0.3s ease;

  &::before {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background-color: #ff7000;
    position: absolute;
    bottom: -2px; /* Adjust this value to control the line's position */
    left: 0;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #ff7000;
    &::before {
      width: 100%;
    }
  }

  /* Tooltip text on hover */
  &::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
    white-space: nowrap;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s, visibility 0.3s;
  }

  &:hover::after {
    visibility: visible;
    opacity: 1;
  }
`;

const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Nav isScrolled={isScrolled}>
      <Logo to="/">
        <FontAwesomeIcon icon={faCoffee} beat style={{ color: "#ff0000" }} />
        Movies
      </Logo>
      <Icons>
        <IconLink to="/" data-tooltip="Home">
          <AiOutlineHome />
        </IconLink>
        <IconLink to="/searched" data-tooltip="Searched">
          <AiOutlineSearch />
        </IconLink>
        <IconLink to="/favorite" data-tooltip="Favorite">
          <AiOutlinePlus />
        </IconLink>
        <IconLink to="/Movies" data-tooltip="Movies">
          <FaFilm />
        </IconLink>
        <IconLink to="/Series" data-tooltip="Series">
          <FaTv />
        </IconLink>
        <Avatar
          src="https://th.bing.com/th/id/R.fd4276ec28cd4d86a55e0a287c01b369?rik=wY%2b0Tq0SLGxMIQ&riu=http%3a%2f%2fwww.funbuzztime.com%2fwp-content%2fuploads%2f2015%2f08%2fMickey-Mouse-Sucide-0.jpg&ehk=%2bsu4wsR%2fL2reTIIdGgbbxjI7dpSyKAZu0el2hE7%2b2wM%3d&risl=&pid=ImgRaw&r=0"
          alt="Mickey Mouse Avatar"
          size="50"
          round
        />
      </Icons>
    </Nav>
  );
};

export default NavigationBar;
