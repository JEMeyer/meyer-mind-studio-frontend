import React, { useState } from 'react';
import { credentialsState } from '../state/userState';
import { useSetRecoilState } from 'recoil';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import StyledButton from '../components/atoms/button';

interface Profile {
    picture?: string;
    email?: string;
    sub?: string;
    name?: string;
    given_name?: string;
    email_verified?: boolean;
}

const GoogleAuth: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const setCredentials = useSetRecoilState(credentialsState);

    return (
        <div>
            {profile ? (
                    <StyledButton onClick={() => {
                        setCredentials(null);
                        setProfile(null);
                    }}>Log out</StyledButton>
            ) : (
                <GoogleLogin
                    onSuccess={(credentialResponse: any) => {
                        setCredentials(credentialResponse.credential);
                        setProfile(jwt_decode(credentialResponse.credential) as Profile);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            )}
        </div>
    );
};

export default GoogleAuth;