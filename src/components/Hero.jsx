import { useRef, useState, useEffect } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
// scroll trigger is plugin within gsap and it needs to be enabled at the top
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    // adding 4th video causes loader to load forever
    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    // Modulo Operation
    // 0 % 4 = 0 + 1 => 1
    // 1 % 4 = 1 + 1 => 2
    // 2 % 4 = 2 + 1 => 3
    // 3 % 4 = 3 + 1 => 4
    // 4 % 4 = 0 + 1 => 1
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }

    // checking if videos are loaded

    useEffect(() => {
        if(loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    })

    // animation #1 on click zoom in, transitioning into full screen video
    useGSAP( () => {
        if(hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current.play(),
                // object has to close with comma , not ;
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut'
            })
        }
    }, {dependencies: [currentIndex], revertOnUpdate: true})

    // animation #2 on scroll
    useGSAP( () => {
        gsap.set('#video-frame', {
            // CSS clip-path maker
            clipPath: 'polygon(14% 0, 72% 0, 93% 90%, 7% 100%)',
            borderRadius: '0 0 40% 10%'
        })

        gsap.from( '#video-frame', {
            clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease: 'power1.inOut',
            // scroll trigger - when animation should happen
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>

        {/* Loader 3 dots */}
        {isLoading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
            </div>
        )}

        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                        <video
                            ref={nextVideoRef}
                            src={getVideoSrc(upcomingVideoIndex)}
                            loop
                            muted
                            id="current-video"
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>
                < video 
                    ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    id="next-video"
                    className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                />

                <video 
                    src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                    autoPlay
                    loop
                    muted
                    className="absolute left-0 top-0 size-full object-cover object-center"
                    onLoadedData={handleVideoLoad}
                />
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5  z-40 text-blue-75">TESTI<b>N</b>G
            </h1>
            <div className="absolute left-0 top-0 z-40 size-full">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font hero-heading text-blue-100">
                        <b>M</b>AIN TITLE
                    </h1>
                    <p  className="mb-5 max-w-64 font-robert-regular text-blue-100">
                        Testing paragraph text <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima molestiae soluta facere dolorum necessitatibus alias eligendi exercitationem, recusandae voluptates, velit aliquam optio a eum accusantium harum quaerat, quis cumque consequatur!
                    </p>
                    <Button id="watch-trailer" 
                        title="Watch Trailer"
                        leftIcon={<TiLocationArrow />}
                        // ! making bg-yellow-300 more important because bg-violet-50 from button className is taking over, could also use CLSX
                        containerClass="!bg-yellow-300 flex-center gap-1"
                    />
                </div>
            </div>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">
            TESTI<b>N</b>G
        </h1>
    </div>
  )
}

export default Hero