'use client';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';


const menuOpqtions = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Pricing",
        path: "/pricing",
    },
    {
        name: "Contact Us",
        path: "/contact-us",
    }
]

function Header() {
    const { user } = useUser();

    return (
        <div className='flex justify-between items-center'>
            {/* Logo */}
            <div className='flex gap-2 items-center'>
                <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
                <h2 className='text-2xl font-bold'>AI Trip Planner</h2>
            </div>

            {/* Menu options */}
            <div className='flex gap-8 items-center p-4'>
                {menuOpqtions.map((menu, index) => (
                    <Link href={menu.path} key={menu.name + '-' + index}>
                        <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
                    </Link>
                ))}
            </div>

            {/* Get Started button */}
            {!user ? <SignInButton mode="modal">
                <Button>Get Started</Button>
            </SignInButton> :
                <Link href="/create-new-trip">
                    <Button>Create New Trip</Button>
                </Link>
            }
        </div>
    )
}

export default Header;
