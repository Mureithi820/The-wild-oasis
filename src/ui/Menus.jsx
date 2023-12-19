import PropTypes from "prop-types";

import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #374151;
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: #fff;
  box-shadow: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  border-radius: 7px;

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: #f9fafb;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: #9ca3af;
    transition: all 0.3s;
  }
`;
// const menusContext = useContext();
const menusContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState();
  const [position, setPosition] = useState(null);

  const open = (id) => {
    setOpenId(id);
  };

  const close = () => {
    setOpenId(null);
  };
  return (
    <menusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </menusContext.Provider>
  );
}
Menus.propTypes = {
  children: PropTypes.node.isRequired,
};

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(menusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === null || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

Toggle.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

function List({ id, children }) {
  const { openId, position } = useContext(menusContext);
  const ref = useOutsideClick(close);
  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}
List.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.node.isRequired,
};
function Button({ children, icon, onClick }) {
  const { close } = useContext(menusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
