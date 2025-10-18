import { useEffect, useState, useRef } from 'react'
import { Button } from './button.component';
import * as motion from "motion/react-client";
import MeetTheTeam from './team.component';
import GallerySection from './gallery.component';

function AppContent() {
  const [textArrayNumber, setTextArrayNumber] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const aboutSectionRef = useRef(null);
  const intervalRef = useRef<number | null>(null);

  const aboutUsTextArray = [
    "The Inner Caucus of Football Veterans is an exclusive circle of seasoned footballers united not just by their shared love for the beautiful game, but by a deeper bond of camaraderie, community, and celebration.", "This distinguished group, spearheaded by The Chairman, Excos, Patron, BOTs, comprises football veterans who have transcended the pitch into a space where memories, laughter, and legacy thrive.",
    "This caucus isn't just about reminiscing old glories. It's about creating new ones—off the field. The group harmoniously blends football, entertainment, and social bonding, often marked by laid-back moments with a touch of beverages, rhythmic banter, and mutual respect.", 
    "Whether it's hosting Colleagues from other football associations  or end-of-year parties, building lasting friendships, or nurturing the next generation of talent through visionary plans like a football academy-resort in Kwara State, the caucus stands as a pillar of continuity, inspiration, and class.",
    "Their motto, carefully chosen to echo their philosophy—'Chill. Play. Relive.'—reflects the soul of this assembly: mature, relaxed, yet spirited. From casual kickabouts to heartfelt conversations and legendary laughter, this is where football becomes a lifestyle, not just a game."
  ];



  // Intersection Observer for detecting when About section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting && !isAutoPlaying) {
          startAutoPlay();
        } else if (!entry.isIntersecting && isAutoPlaying) {
          stopAutoPlay();
        }
      },
      { 
        threshold: 0.5, 
        rootMargin: '-50px 0px' 
      }
    );

    if (aboutSectionRef.current) {
      observer.observe(aboutSectionRef.current);
    }

    return () => {
      if (aboutSectionRef.current) {
        observer.unobserve(aboutSectionRef.current);
      }
    };
  }, [isAutoPlaying]);

  const startAutoPlay = () => {
    if (intervalRef.current) return;
    
    setIsAutoPlaying(true);
    intervalRef.current = setInterval(() => {
      setTextArrayNumber(prevNumber => {
        if (prevNumber === aboutUsTextArray.length - 1) {
          return 0; 
        }
        return prevNumber + 1;
      });
    }, 4000); // Change every 7 seconds
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setTextArrayNumber(index);
    // Temporarily stop auto-play when user manually navigates
    if (isAutoPlaying) {
      stopAutoPlay();
      // Restart auto-play after 6 seconds of inactivity
      setTimeout(() => {
        if (isInView) {
          startAutoPlay();
        }
      }, 6000);
    }
  };

  const nextSlide = () => {
    const nextIndex = textArrayNumber >= aboutUsTextArray.length - 1 ? 0 : textArrayNumber + 1;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = textArrayNumber <= 0 ? aboutUsTextArray.length - 1 : textArrayNumber - 1;
    goToSlide(prevIndex);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <>

        {/* Header */}
        {/* <header className='hidden sm:flex h-16 z-20 justify-end items-center sm:px-6'>
          <div className='flex'> */}
            {/* <Button text="About Us" variant="none" /> */}
            {/* <Button text="Our Events" variant="none" /> */}
            {/* <Button text="Gallery" variant="none" /> */}
            {/* <Button text="Contact Us" variant="solid" className='!bg-amber-700 text-[#F7F2DF] ml-2 hover:!bg-amber-700/80 hover:!text-[#F7F2DF]/80' /> */}
          {/* </div> */}
        {/* </header> */}

        {/* Hero */}
        <section className="text-[#f7f2df] h-[100vh] flex justify-center items-center mt-[2rem]">
          <div className="container mx-auto px-4 flex flex-col py-36 justify-center items-center w-full relative ">
            <div className="space-y-8 text-center max-w-4xl">
                
                <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-primary-orange font-rock leading-tight">
                Inner Caucus
                    <span className="text-[#f7f2df] font-inter text-2xl sm:text-3xl block mt-2">Football Family</span>
                </h2>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full pt-4">
                    <a href='#about-us'>
                        <Button 
                            variant="solid" 
                            size="xlarge" 
                            className="font-semibold px-6 py-3 !bg-amber-700 text-[#F7F2DF] hover:!bg-amber-700/80 hover:!text-[#F7F2DF]/80" 
                            text="About Us" />
                        
                    </a>
                    
                    <Button
                        variant="outline"
                        size="xlarge"
                        text="Gallery"
                    />
                </div>

              </div>

          </div>
        </section>

        {/* About Us */}
        <motion.div
          ref={aboutSectionRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
              duration: 0.8,
              ease: "easeOut"
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-orange-700 flex justify-center sm:mt-[-4rem] min-h-[70vh] sm:mb-0 font-mont"
          id='about-us'
        >
          <div className='max-w-[90%] sm:max-w-5xl p-3 sm:p-6 flex flex-col sm:flex-row gap-12 sm:gap-2'>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className=' flex-1 flex justify-center items-center order-2 sm:order-1'
            >
              <div className='sm:h-[80%] xl:h-[90%] sm:w-[90%] flex flex-col items-center justify-center xl:gap-2'>
                <div
                  style={{
                        width: 300,
                        height: 300,
                        backgroundImage: `url('/innercaucus.png')`, 
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 5,
                    }}
                    className='flex sm:hidden'
                  ></div>
                <div
                  style={{
                        width: 500,
                        height: 500,
                        backgroundImage: `url('/innercaucus.png')`, 
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 5,
                    }}
                    className='hidden sm:flex xl:hidden'
                  ></div>
                  <div
                  style={{
                        width: 450,
                        height: 450,
                        backgroundImage: `url('/innercaucus.png')`, 
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 5,
                    }}
                    className='hidden xl:flex'
                  ></div>
                <h3 className='font-mont text-center text-[#f7f2df] text-lg xl:text-base uppercase'>
                  "Where legacy meets leisure, and brotherhood finds its rhythm."
                </h3>
              </div>
              
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
              className='flex-1 flex justify-center items-center sm:px-4 relative order-1 sm:order-2'
            >
              <div className='flex flex-col items-center justify-center sm:h-[70%]'>
                <div className='flex flex-col gap-4 mb-4 sm:h-[80%]'>
                  <h2 className='font-rock font-semibold text-xl sm:text-3xl tracking-wider text-center'>
                    The Inner Caucus of Football Veterans
                  </h2>
                  
                  <div className="flex-1 flex items-center justify-center">
                    <motion.p 
                      key={textArrayNumber}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className='text-center mx-auto leading-relaxed text-[#f7f2df]'
                    >
                      {aboutUsTextArray[textArrayNumber]}
                    </motion.p>
                  </div>
                </div>
                

                <div className="flex items-center justify-between w-[80%] sm:w-[60%]">
                  <button 
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Previous slide"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <div className="flex space-x-2">
                    {aboutUsTextArray.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === textArrayNumber 
                            ? 'bg-amber-700 scale-110' 
                            : 'bg-white/30 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
            </motion.div>
          </div>
        </motion.div>

        {/* Meet The Team */}
        <MeetTheTeam />

        <GallerySection />
    </>
  )
}

export default AppContent