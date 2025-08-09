'use client';
import React, { useContext, useEffect, useState } from 'react'
import Header from './Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/contex/UserDetailContext';



function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const CreateUser = useMutation(api.user.createNewUser);
    const [userDetail, setUserDetail] = useState<any>();
    const { user } = useUser();

    useEffect(() => {
        user && CreatNewUser();
    }, [user]);

    const CreatNewUser = async () => {
        if (user) {
            // save new user if not exists
            const result = await CreateUser({
                email: user?.primaryEmailAddress?.emailAddress ?? '',
                imageUrl: user?.imageUrl,
                name: user?.fullName ?? '',
            });
            setUserDetail(result);
        }
        // console.log('User created or fetched:', result);
    }
    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <div>
                <Header />
                {children}
            </div>
        </UserDetailContext.Provider>
    )
};
export default Provider;

export const useUserDetail = () => {
    return useContext(UserDetailContext);
}
