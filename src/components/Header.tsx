import { useState } from 'react';
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
    const [navbar, setNavbar] = useState(false);
    const location = useRouter();
    const showImageRoute = '/';
    return (
        <>
            {location.pathname === showImageRoute && (
                <div className="top-image">
                    <div className="top-image-overlay">
                        <h1 className="text-3xl text-white p-3">Patrick&#39;s and Chantil&#39;s Wedding</h1>
                        <h4 className="text-2xl text-white">....</h4>
                        <Link href='/RSVP'>
                            <button className="text-2xl text-white border-white border-2 rounded p-3 m-5">RSVP</button>
                        </Link>
                    </div>
                </div>
            )}
            <nav className="w-full bg-[#c28285] bg-opacity-40 shadow">
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
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'
                                }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className="color-secondary">
                                    <Link href="/" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        Home
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <Link href="/RSVP" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        RSVP
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <Link href="/events" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        Events
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <Link href="/photos" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        Photos
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <Link href="/wedding-party" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        Wedding Party
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <Link href="/travel-and-lodging" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        Travel & Lodging
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <Link href="/things-to-do" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        Things To Do
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <Link href="/registry" onClick={() => setNavbar(!navbar)}
                                        className="block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white">
                                        Registry
                                    </Link>
                                </li>
                                <li className="color-secondary">
                                    <UserButton afterSignOutUrl="/" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
}
