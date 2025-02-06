import React from 'react'
import { TiLocationArrow } from 'react-icons/ti'

const BentoCard = ({src, title, description}) => {
    return (
        <div className='relative size-full'>
            <video 
                src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center'
            />
            <div className="absolute left-0 top-0 size-full object-cover object-center justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">
                        {title}
                    </h1>
                    {description && (
                        <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

const Features = () => {
  return (
    <section className='bg-black pb-52'>
        <div className='container mx-auto px-3 md:px-10'>
            <div className="px-5 py-32">
                <p className='font-circular-web text-lg text-blue-50'>Test paragraph text</p>
                <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat nam adipisci quibusdam, repellendus eos quas unde ea doloremque inventore tempore consectetur officiis mollitia blanditiis odit quam autem. Illo, fuga perspiciatis?</p>
            </div>
            <div className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                <BentoCard 
                    src="videos/feature-1.mp4"
                    title={<>gr<b>a</b>die<b>n</b>t</>}
                    description="Maybe gradient title Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat nam adipisci quibusdam, repellendus eos quas unde."
                    // by default set to true if no value is provided isComingSoon
                />
            </div>
            <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
                <div className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                    <BentoCard 
                        src='videos/feature-2.mp4'
                        title={<>Bent<b>o</b> C<b>a</b>rd Title</>}
                        description="Bento card description! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat nam adipisci quibusdam, repellendus eos quas unde."
                    />
                </div>
                <div className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard 
                        src='videos/feature-3.mp4'
                        title={<>Bent<b>o</b> C<b>a</b>rd Title</>}
                        // description text is hard to read due to animated bento card, needs to be corrected, maybe text background
                        description="Bento card description! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat nam adipisci quibusdam, repellendus eos quas unde."
                    />
                </div>
                <div className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                    <BentoCard 
                        src='videos/feature-4.mp4'
                        title={<>Bent<b>o</b> C<b>a</b>rd Title</>}
                        // description text is hard to read due to animated bento card, needs to be corrected, maybe text background
                        description="Bento card description! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat nam adipisci quibusdam, repellendus eos quas unde."
                    />
                </div>
                <div className="bento-tilt_2">
                    <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
                        <h1 className='bento-title special-font max-w-64 text-black'>
                            <b>m</b><b>o</b>re coming s<b>o</b><b>o</b>n!
                        </h1>
                        <TiLocationArrow className='m-5 scale-[5] self-end' />
                    </div>
                </div>
                <div className='bento-tilt_2'>
                        <video 
                            src="videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className='size-full object-center'
                        />
                    </div>
            </div>
        </div>

    </section>
  )
}

export default Features