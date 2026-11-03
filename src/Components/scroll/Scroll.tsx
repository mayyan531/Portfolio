
import { PiDiamondsFourFill } from 'react-icons/pi'
import { BsDot } from 'react-icons/bs'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' }
] as const

const Scroll = () => {
  const [activeSection, setActiveSection] = useState(0)

  // Track the active section as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      let active = 0

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id)

        const top = element
          ? element.getBoundingClientRect().top
          : index * window.innerHeight - window.scrollY

        if (top <= 140) {
          active = index
        }
      })

      setActiveSection(active)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Navigate to the selected section
  const handleClick = (index: number) => {
    const element = document.getElementById(sections[index].id)

    const top = element
      ? window.scrollY + element.getBoundingClientRect().top - (index === 0 ? 0 : 80)
      : window.innerHeight * index

    setActiveSection(index)

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth'
    })
  }

  return (
    <nav aria-label="Page sections" className="pointer-events-auto fixed left-4 top-1/2 z-[1200] hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-navy-blue/15 bg-cream/60 px-1.5 py-3 text-navy-blue shadow-[0_8px_25px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 hover:border-navy-blue/30 hover:bg-cream/85 hover:shadow-lg md:flex lg:left-7">

      {/* Vertical connecting line */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 top-7 w-px -translate-x-1/2 bg-navy-blue/20" />

      {sections.map((section, index) => {
        const isActive = activeSection === index

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => handleClick(index)}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? 'location' : undefined}
            className={`group relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-110 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-blue motion-reduce:transition-none ${isActive ? 'bg-cream text-navy-blue shadow-md ring-1 ring-navy-blue/20' : 'bg-cream/80 text-navy-blue/50 hover:bg-blue/30 hover:text-navy-blue'}`}
          >

            {/* Active diamond */}
            <PiDiamondsFourFill
              size={21}
              className={`absolute transition-all duration-300 ease-out ${isActive ? 'rotate-0 scale-100 opacity-100' : '-rotate-45 scale-50 opacity-0'}`}
            />

            {/* Inactive dot */}
            <BsDot
              size={28}
              className={`absolute transition-all duration-300 ease-out ${isActive ? 'scale-50 opacity-0' : 'scale-100 opacity-100 group-hover:scale-125'}`}
            />

            {/* Hover tooltip */}
            <span className="pointer-events-none absolute left-full ml-4 translate-x-[-6px] whitespace-nowrap rounded-md border border-navy-blue/10 bg-cream px-3 py-2 font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-blue opacity-0 shadow-md transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
              {section.label}
            </span>

          </button>
        )
      })}

    </nav>
  )
}

export default Scroll
