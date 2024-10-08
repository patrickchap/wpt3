import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import {useRouter} from 'next/router';
import Link from 'next/link';
import { Navbar } from "flowbite-react";

export default function Header() {
    const [navbar, setNavbar] = useState(false);
    const location = useRouter();
    const showImageRoute = '/';


    console.log(location.pathname);

    return (
    <>
    {location.pathname === showImageRoute && (
        <div className="top-image">
            <div className="top-image-overlay">
                <h1>Patrick & Chantilly</h1>
                <h4>08.06.24</h4>
                <Link href='/rsvp'>
                    <button>RSVP</button> 
                </Link>
            </div>
        </div>
    )}
        <Navbar
          fluid={true}
          rounded={true}
        >
          <Navbar.Brand href="https://flowbite.com/">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link
              href="/navbars"
              active={true}
            >
              Home
            </Navbar.Link>
            <Navbar.Link href="/navbars">
              About
            </Navbar.Link>
            <Navbar.Link href="/navbars">
              Services
            </Navbar.Link>
            <Navbar.Link href="/navbars">
              Pricing
            </Navbar.Link>
            <Navbar.Link href="/navbars">
              Contact
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
          </>
    );
}
