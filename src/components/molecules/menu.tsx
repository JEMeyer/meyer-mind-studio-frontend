import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { TabList } from '../header';
import { toast } from 'react-toastify';

interface MenuProps extends React.HTMLAttributes<HTMLButtonElement> {
    open: boolean,
    setOpen: (isOpen: boolean) => void,
    activeTab: number,
    isAuthed: boolean,
    onLinkClick: MouseEventHandler<HTMLAnchorElement>,
}

const Menu: React.FC<MenuProps> = ({ open, activeTab, isAuthed, onLinkClick, ...props }) => {
  const isHidden = open ? true : false;

  return (
      <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
          {TabList.map((({ id, name }) => {
              const isDisabled = !isAuthed && id !== 1 && id !== 4;
              return <StyledLink key={`tab-${id}`} isActive={id === activeTab} isDisabled={isDisabled} data-tab-id={id} onClick={!isDisabled ? onLinkClick : () => toast.warn('Please login to use this tab.')}>
                  {name}
              </StyledLink>
          }))}
      </StyledMenu>
  )
}

export default Menu;

interface StyledLinkProps {
  isActive: boolean,
  isDisabled?: boolean,
}

const StyledLink = styled.a<StyledLinkProps>`
  background-color: ${({ isActive, isDisabled }) => (isDisabled ? '#f0f0f0' : isActive ? 'rgb(210, 240, 230)' : 'rgb(239, 255, 250)')};
  color: ${({ isDisabled }) => (isDisabled ? '#999' : 'black')};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  &:hover {
      background-color: ${({ isActive, isDisabled }) => (isDisabled ? '#f0f0f0' : isActive ? 'rgb(230, 245, 240)' : 'rgb(255, 245, 247)')};
  }
`

interface StyledMenuProps {
    open: boolean
};

const StyledMenu = styled.nav<StyledMenuProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #EFFFFA;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 500px;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
  @media (max-width: 640px) {
    width: 100%;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: '#0D0C1D';
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: mobile: '768px') {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      color: '#343078';
    }
  }
`;