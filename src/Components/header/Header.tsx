
import { useEffect, useState } from 'react'
import { TiHeart } from 'react-icons/ti'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
] as const

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  // Navigate to the actual section
  const handleHeaderClick = (id: string, index: number) => {
    const target = document.getElementById(id)
    const offset = id === 'projects' || id === 'contact' ? 80 : 0

    const top = target
      ? window.scrollY + target.getBoundingClientRect().top - offset
      : window.innerHeight * index

    setMenuOpen(false)
    setActiveSection(id)

    requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(0, top),
        behavior: 'smooth'
      })
    })
  }

  // Track active navigation section
  useEffect(() => {
    const handleScroll = () => {
      let current = 'home'

      sections.forEach(section => {
        const element = document.getElementById(section.id)

        if (element && element.getBoundingClientRect().top <= 110) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Close menu with Escape or when switching to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <header className="pointer-events-none relative z-[1000] h-[76px] w-full bg-transparent font-inter">

      {/* Frosted-glass background - same as Scroll */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 border-b border-navy-blue/15 bg-cream/60 shadow-[0_8px_25px_rgba(0,0,0,0.08)] backdrop-blur-md" />

      {/* Desktop and mobile header */}
      <div className="relative mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-5 sm:px-10 lg:px-12">

        {/* Heart logo */}
        <button
          type="button"
          onClick={() => handleHeaderClick('home', 0)}
          aria-label="Go to Home"
          className="pointer-events-auto group flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-navy-blue bg-cream text-navy-blue shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:-rotate-12 hover:scale-110 hover:bg-navy-blue hover:text-cream hover:shadow-lg active:scale-95 motion-reduce:transition-none"
        >
          <TiHeart size={24} className="transition-transform duration-300 group-hover:scale-110" />
        </button>

        {/* Centered desktop navigation */}
        <nav aria-label="Main navigation" className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex">

          {sections.slice(0, 3).map((section, index) => {
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleHeaderClick(section.id, index)}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative min-w-31 cursor-pointer overflow-hidden rounded-full border-2 border-navy-blue bg-cream px-5 py-2.5 font-inter text-[14px] font-semibold uppercase tracking-[0.12em] text-navy-blue shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-navy-blue hover:text-cream hover:shadow-lg active:scale-95 motion-reduce:transition-none ${isActive ? 'shadow-md' : ''}`}
              >
                <span className="relative z-10">{section.label}</span>
                <span className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-blue transition-all duration-300 ${isActive ? 'w-8 opacity-100' : 'w-0 opacity-0 group-hover:w-8 group-hover:opacity-100'}`} />
              </button>
            )
          })}

        </nav>

        {/* Desktop contact button */}
        <button
          type="button"
          onClick={() => handleHeaderClick('contact', 3)}
          className="pointer-events-auto group hidden min-w-36 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-navy-blue bg-navy-blue px-6 py-2.5 font-inter text-[14px] font-semibold uppercase tracking-[0.12em] text-cream shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue hover:bg-blue hover:text-navy-blue hover:shadow-lg active:scale-95 motion-reduce:transition-none lg:flex"
        >
          Contact
          <FiArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Mobile menu icon */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="pointer-events-auto group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-navy-blue bg-cream text-navy-blue shadow-md transition-all duration-300 hover:rotate-90 hover:bg-navy-blue hover:text-cream active:scale-95 lg:hidden"
        >
          <FiMenu size={23} />
        </button>

      </div>

      {/* Full-screen mobile navigation */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[2000] flex h-[100dvh] w-full flex-col overflow-y-auto bg-cream text-navy-blue transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden ${menuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-100'}`}
      >

        {/* Mobile menu top bar */}
        <div className="flex shrink-0 items-center justify-between px-6 py-5 sm:px-10">

          <div className="flex items-center gap-3">
            <TiHeart size={25} className="text-navy-blue" />
            <span className="font-inter text-[12px] font-semibold uppercase tracking-[0.22em]">Navigation</span>
          </div>

          <button
            type="button"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-navy-blue bg-navy-blue text-cream transition-all duration-300 hover:rotate-90 hover:bg-blue hover:text-navy-blue active:scale-95"
          >
            <FiX size={24} />
          </button>

        </div>

        {/* Mobile menu content */}
        <nav aria-label="Mobile navigation" className="flex flex-1 flex-col justify-center px-8 py-8 sm:px-14">

          <div className="mb-8 flex items-center gap-4">
            <span className="h-[2px] w-10 bg-blue" />
            <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-blue/60">Explore</span>
          </div>

          <div className="flex flex-col">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => handleHeaderClick(section.id, index)}
                className={`group flex w-full cursor-pointer items-center justify-between gap-4 border-b border-navy-blue/20 py-6 text-left transition-all duration-300 hover:pl-3 active:scale-[0.98] ${activeSection === section.id ? 'text-navy-blue' : 'text-navy-blue/70 hover:text-navy-blue'}`}
              >
                <div className="flex items-center gap-5">
                  <span className="font-inter text-[12px] font-semibold tracking-[0.12em] text-blue">0{index + 1}</span>
                  <span className="font-inter text-[14px] font-semibold uppercase tracking-[0.12em]">{section.label}</span>
                </div>

                <FiArrowUpRight size={18} className="shrink-0 text-navy-blue transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            ))}
          </div>

        </nav>

        {/* Mobile menu footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-navy-blue/15 px-8 py-6 sm:px-14">
          <span className="font-inter text-[11px] font-medium uppercase tracking-[0.22em] text-navy-blue/60">May Yan</span>
          <span className="font-inter text-[11px] font-medium uppercase tracking-[0.22em] text-navy-blue/60">Portfolio</span>
        </div>

      </div>

    </header>
  )
}

export default Header
