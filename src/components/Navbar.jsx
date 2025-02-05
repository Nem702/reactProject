import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
// https://github.com/streamich/react-use npm i react-use
import gsap from 'gsap';

const navItems = ['Item1', 'Item2', 'Item3', 'About', 'Contact'];

const Navbar = () => {
    const [isAudioPlaying, setAudioPlaying] = useState(false);
    const [isIndicatorActive, setIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible]= useState(true);

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    // getting Y property of users current scroll
    const { y: currentScrollY } = useWindowScroll();
        useEffect( () => {
            if(currentScrollY == 0) {
                setIsNavVisible(true);
                navContainerRef.current.classList.remove('floating-nav');
            } else if(currentScrollY > lastScrollY) {
                setIsNavVisible(false);
                navContainerRef.current.classList.add('floating-nav');
            } else if (currentScrollY < lastScrollY) {
                setIsNavVisible(true);
                navContainerRef.current.classList.add('floating-nav');
            } setLastScrollY(currentScrollY);
        }, [currentScrollY] )

        // navbar animation
        useEffect( () =>{
            gsap.to(navContainerRef.current, {
                y: isNavVisible ? 0 : -100,
                opacity: isNavVisible ? 1 : 0,
                duration: 0.2,
            })
        }, [isNavVisible])

    const toggleAudioIndicator = () => {
        setAudioPlaying( (prev) => !prev);
        setIndicatorActive( (prev) => !prev);
    }

    useEffect( () => {
        if(isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    })

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
            <nav className='flex size-full items-center justify-between p-4'>
                {/* left side div */}
                <div className='flex items-center gap-7'>
                    <img src='/img/logo.png' alt='logo' className='w-10' />
                    <Button
                        id='product-button'
                        title='Products'
                        rightIcon={<TiLocationArrow />}
                        containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
                    />
                </div>
                {/* right side div - links */}
                <div className='flex h-full items-center'>
                    <div className='hidden md:block'>
                        {/* not a curly bracket because we are doing automatic return, instead using () */}
                        {navItems.map((item) => (
                            // hover bottom border animation
                            <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                {item}
                            </a>
                        ))}
                    </div>

                    <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                        <audio ref={audioElementRef} className='hidden' src="/audio/loop.mp3" loop />

                        {[1, 2, 3, 4].map((bar) => (
                            <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar * 0.1}s`}} />
                        ))}
                    </button>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default Navbar