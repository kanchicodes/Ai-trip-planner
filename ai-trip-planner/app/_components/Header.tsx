import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


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
                    <Link href={menu.path}>
                        <h2 className='text-lg hover:scale-105 transition-all hover:text-primary'>{menu.name}</h2>
                    </Link>
                ))}
            </div>

            {/* Get Started button */}
            <Button>Get Started</Button>
        </div>
    )
}
export default Header;
