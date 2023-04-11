import React, { useState } from 'react';
import { credentialsState } from '../state/userState';
import { useSetRecoilState } from 'recoil';
import { GoogleLogin} from '@react-oauth/google';
import jwt from 'jsonwebtoken';

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
                <div>
                    <img src={profile.picture} alt="user" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={() => {
                        setCredentials(null);
                        setProfile(null);
                    }}>Log out</button>
                </div>
            ) : (
                <GoogleLogin
                    onSuccess={(credentialResponse: any) => {
                        console.log(setProfile(jwt.decode(credentialResponse) as Profile));
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
