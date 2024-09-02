import React from 'react';
import Link from 'next/link';
import './navbar.css';

function navbar() {
  return (
    <nav className='nav'>
        <ul className='ul'>
            <li>
                <Link href="home">Home</Link>
            </li>
            <li>
                <Link href="about">About</Link>
            </li>
            <li>
                <Link href="contact">Contact</Link>
            </li>
        </ul>
    </nav>
  )
}

export default navbar