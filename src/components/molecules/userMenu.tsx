import React, { useState } from 'react';
import { credentialsState } from '../../state/userState';
import { useSetRecoilState } from 'recoil';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import StyledButton from '../atoms/button';
import styled from 'styled-components';
import { toast } from 'react-toastify';

interface Profile {
    picture?: string;
    email?: string;
    sub?: string;
    name?: string;
    given_name?: string;
    email_verified?: boolean;
}

const UserMenu: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const setCredentials = useSetRecoilState(credentialsState);

    return profile ?
        (<UserMenuWrapper>
            <UserAvatar src={profile.picture} alt={profile.picture} />
            <UserName>{profile.name}</UserName>
            <StyledButton onClick={() => {
                setCredentials(null);
                setProfile(null);
                googleLogout();
            }}>Log out</StyledButton>
        </UserMenuWrapper>
        )
        : (
            <GoogleContainer><GoogleLogin
                onSuccess={(credentialResponse: any) => {
                    setCredentials(credentialResponse.credential);
                    setProfile(jwt_decode(credentialResponse.credential) as Profile);
                }}
                onError={() => {
                    toast.error('Login Failed');
                }}
                useOneTap
                auto_select
            /></GoogleContainer>
        )
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
