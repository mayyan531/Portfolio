import { useState, type CSSProperties } from 'react'

interface FoundImages {
  smiskiFound: boolean;
  berryFound: boolean;
  watermelonFound: boolean;
}

interface FoundImageProps {
  src: string;
  alt: string;
  className: string;
  foundKey: keyof FoundImages;
  onFound: (imageName: keyof FoundImages) => void;
}

const FoundImage = ({ src, alt, className, foundKey, onFound }: FoundImageProps) => {
  const [animating, setAnimating] = useState(false)

  const handleClick = () => {
    onFound(foundKey)
    setAnimating(true)
  }

  return (
    <button type="button" aria-label={`Find ${alt}`} onClick={handleClick} className={`${className} pointer-events-auto cursor-pointer border-0 bg-transparent p-0`}>
      <span className={`relative block w-full ${animating ? 'found-pop' : ''}`} onAnimationEnd={(e) => { if (e.animationName === 'found-pop') setAnimating(false) }}>
        <img src={src} alt={alt} draggable={false} className="pointer-events-none block h-auto w-full select-none" />

        {animating && (
          <span aria-hidden="true" className="pointer-events-none absolute inset-0">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="found-ray" style={{ '--angle': `${i * 45}deg` } as CSSProperties} />
            ))}
          </span>
        )}
      </span>
    </button>
  )
}

export default FoundImage
