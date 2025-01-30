import React, { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        // Function to handle scroll events
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
            setLastScrollY(currentScrollY);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <header className={`fixed w-full bg-white shadow-md transition-transform duration-300 z-50 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="https://github.com/kapilgupta20/UserDashboard" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="https://linkedin.com/in/kapilgupta20" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </header>
    );
}
