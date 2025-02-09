'use client'

import Link from "next/link";
import { useState } from "react";

export default function TopNavigation() {
  const [state, setState] = useState(0);
  console.log(state , "state");

  const handleState = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event, "event");  
    const nums = [0, 1, 2];
    const randomIndex = Math.floor(Math.random() * nums.length);
    setState(nums[randomIndex]);
  }

  return (
    <div className="fixed top-24 left-8 z-50 overflow-x-hidden">
      <ul className="flex flex-col">
          <li className={`block font-bold text-sm py-2 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:border before:border-black before:rounded-full ${state === 0 ? 'text-black before:bg-gray-300' : ''}`}>
            Home
          </li>

          <li className={`block font-bold text-sm py-2 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:border before:border-black before:rounded-full ${state === 1 ? 'text-gray-300 before:bg-black' : ''}`}>
             Info
          </li>
          <li className={`block font-bold text-sm py-2 pl-6 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:border before:border-black before:rounded-full ${state === 2 ? 'text-gray-300 before:bg-black' : ''}`}>
            Contact
          </li>
          </ul>
    <Link href="/three">
        <li className="block font-bold text-sm py-2">
            Three.js
          </li>
    </Link>

    <button onClick={handleState}>Click me</button>

    </div>
  );
} 