const note = `${import.meta.env.BASE_URL}assets/note.png`
const pin = `${import.meta.env.BASE_URL}assets/pin.png`
import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';

const Note = () => {
  const noteRef = useRef<HTMLImageElement>(null);
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      const [ entry ] = entries;  
      if (entry.isIntersecting && entry.target === noteRef.current) {
        setIsNoteVisible(true);
      }
    };

    const noteObserver = new IntersectionObserver(callback, {
      threshold: [0.2],
    });

    if (noteRef.current) noteObserver.observe(noteRef.current);

    return () => {
      if (noteRef.current) noteObserver.disconnect();
    };
  }, [])

  return (
    <>
      <img src={note} ref={noteRef} className={`w-full h-auto transition-transform duration-900 ease-out transform ${isNoteVisible ? "scale-100 opacity-100" : "scale-120 opacity-0"}`} alt='note pad'/>
    </>
  )
}

const Pin = () => {
  const pinRef = useRef<HTMLImageElement>(null);
  const [isPinVisible, setIsPinVisible] = useState(false);
  
  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      const [ entry ] = entries;
      if (entry.isIntersecting && entry.target === pinRef.current) {
        setIsPinVisible(true);
      }
    };

    const pinObserver = new IntersectionObserver(callback, {
      threshold: [0.7],
    });
    if (pinRef.current) pinObserver.observe(pinRef.current);
    return () => {
      if (pinRef.current) pinObserver.disconnect();
    }
  }, [])

  return (
    <img src={pin} ref = {pinRef} className={`absolute w-[12%] h-auto top-[-4%] left-[46%] rotate-12 transition-transform duration-600 ease-out transform ${isPinVisible ? "scale-100 opacity-100" : "scale-700 opacity-0"}`} alt='pin'/>
  )
}

const About = () => {
  const isWiderOrLonger = window.innerWidth > window.innerHeight;

  return (
    <div className={`h-screen w-full z-2 flex ${isWiderOrLonger ? 'flex-row' : 'flex-col'} align-center justify-center`}>
      {/* Left side */}
      <div className='relative flex-1 h-full'>
        {/* text and note image */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-[80%] h-auto relative'>
            <Note />

            <Pin />
          </div>

          <div className='absolute text-center flex-col italic text-lg xl:text-4xl text-navy-blue'>
            <div className='-mb-1'>
              Hey! I'm
            </div>

            <div className='text-5xl xl:text-6xl 2xl:text-7xl not-italic font-bold'>
              May Yan 
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='flex-1 h-full p-6 md:p-14'>
        <div className='w-full flex flex-col justify-center  h-full'>
          <div className={`text-blue ${isWiderOrLonger ? '' : 'text-center'} text-3xl xl:text-6xl 2xl:text-6xl italic font-bold`}>
            About Me
          </div>

          <div className={`font-inter font-medium ${isWiderOrLonger ? '' : 'text-center'} text-sm md:text-lg xl:text-lg text-navy-blue mt-2 md:mt-6`}>
            Hi! I'm a third year Software Engineering Student at McMaster University. I love picking up new tools and obsessing over new projects. 
            I enjoy working with Python, JavaScript and React, something I'm trying to learn more about is C++. 
            Some other things I have a passion for are scattered across this page like reading an enrapturing book, all sorts of board games, video games, and the colour navy. 
          </div>

          <div className={`${isWiderOrLonger ? 'inline-block ' : 'flex flex-col justify-center items-center'}`}>
            <p className='font-inter italic text-center bg-blue rounded-sm p-1 my-4 lg:my-4 text-xs md:text-sm xl:text-sm w-full'>
              Find me here!
            </p>

            <div className='flex'>
              <a href='https://www.linkedin.com/in/mayyan531/' target='_blank'>
                <FaLinkedin size="40px" className='mx-4 hover:text-blue' />
              </a>

              <a href='https://github.com/mayyan531' target='_blank'>
                <SiGithub size="40px" className='mx-4 hover:text-blue'/>
              </a>

              <a href={`${import.meta.env.BASE_URL}Files/May_Resume2026.pdf`} target='_blank' rel="noopener noreferrer">
                <BsFileEarmarkPerson size="40px" className='mx-4 hover:text-blue'/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About