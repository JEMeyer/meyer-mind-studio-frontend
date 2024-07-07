import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import StyledButton from "../atoms/button";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

interface Profile {
  picture?: string;
  email?: string;
  sub?: string;
  name?: string;
  given_name?: string;
  email_verified?: boolean;
}

const UserMenu: React.FC = () => {
  const [credentials, setCredentials] = useAuth();
  const profile = credentials ? (jwtDecode(credentials) as Profile) : null;

  return profile ? (
    <UserMenuWrapper>
      <UserAvatar src={profile.picture} referrerPolicy="no-referrer" />
      <UserName>{profile.name}</UserName>
      <StyledButton
        onClick={() => {
          setCredentials(null);
          googleLogout();
          window.location.reload();
        }}
      >
        Log out
      </StyledButton>
    </UserMenuWrapper>
  ) : (
    <GoogleContainer>
      <GoogleLogin
        onSuccess={(credentialResponse: any) => {
          setCredentials(credentialResponse.credential);
          window.location.reload();
        }}
        onError={() => {
          toast.error("Login Failed");
        }}
        useOneTap
        auto_select
      />
    </GoogleContainer>
  );
};

export default UserMenu;

const UserMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

const GoogleContainer = styled.div`
  display: flex;
`;
