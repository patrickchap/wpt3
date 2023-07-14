import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import {useRouter} from 'next/router';
import Link from 'next/link';

export default function Navbar() {
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
      <nav className="w-full bg-[#c28285] shadow">
        <div className="justify-between pb-4 pt-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 color-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 color-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <li className="color-secondary">
                  <Link href="/">
                    Home
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/RSVP">
                   RSVP 
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/our-story">
                   Our Story
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/events">
                   Events
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/photos">
                   Photos
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/wedding-party">
                   Wedding Party 
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/travel-and-lodging">
                    Travel & Lodging
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/things-to-do">
                    Things To Do
                  </Link>
                </li>
                <li className="color-secondary">
                  <Link href="/registry">
                    Registry
                  </Link>
                </li>
                <li className="color-secondary">
                    <UserButton afterSignOutUrl="/"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
    );
}
