import React, { useEffect, useState } from 'react';
import { credentialsState } from '../../state/userState';
import { useRecoilState } from 'recoil';
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

interface UserMenuProps {
    setActiveTab: (tabId: number) => void
}

const UserMenu: React.FC<UserMenuProps> = ({setActiveTab}) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [credentials, setCredentials] = useRecoilState(credentialsState);

    useEffect(() => {
        if (credentials == null && profile != null) {
            setProfile(null);
        }
    }, [credentials, setProfile, profile]);

    return profile ?
        (<UserMenuWrapper>
            <UserAvatar src={profile.picture} alt={profile.picture} />
            <UserName>{profile.name}</UserName>
            <StyledButton onClick={() => {
                setCredentials(null);
                setProfile(null);
                googleLogout();
                setActiveTab(1);
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
