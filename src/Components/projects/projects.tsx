const folder = `${import.meta.env.BASE_URL}assets/blueFolder.png`
const website = `${import.meta.env.BASE_URL}assets/website.png`
const mazeRunner = `${import.meta.env.BASE_URL}assets/mazeRunner.png`
const assertiveEmailer = `${import.meta.env.BASE_URL}assets/assertiveEmailer.png`
const paper = `${import.meta.env.BASE_URL}assets/paper.png`
import { useState } from "react"
const lily = `${import.meta.env.BASE_URL}assets/lily.png`
const orchid = `${import.meta.env.BASE_URL}assets/orchid.png`

interface foundImages {
    smiskiFound: boolean;
    flowerFound: boolean;
    watermelonFound: boolean;
}

interface Props {
    handleImageFound: (imageName: keyof foundImages) => void;
}

const Projects = ({ handleImageFound }: Props) => {
  const [cardsClicked, setCardsClicked] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-end overflow-hidden relative">
      {/* Folder and papers */}
      <div className="relative h-2/6 md:h-2/5 w-auto lg:w-3/10 lg:h-auto mb-2">
        {/* Folder image*/}
        <img
          src={folder}
          className="h-full w-auto z-10 relative"
          alt="blue folder"
        />

        {/* Maze runner */}
        <div 
          className={`absolute h-[70%] -top-7 -rotate-2 left-[5%] z-0 transform transition-transform duration-300 ${cardsClicked ? '-translate-y-[250%] md:-translate-y-[140%] xl:-translate-y-[100%]' : 'hover:-translate-y-2'}`}
          onClick={() => setCardsClicked(!cardsClicked)}>
          <img
            src={mazeRunner}
            className="h-full w-auto object-contain"
            alt="postcard"
          />
        </div>

        {/* Assertive Emailer */}
        <div className={`absolute h-[80%] -top-10 right-[7%] z-0 rotate-5 transform transition-transform duration-300 md:duration-400 ${cardsClicked ? '-translate-y-[120%] md:-translate-y-[70%] translate-x-6 md:translate-x-[120%]' : 'hover:-translate-y-2'}`}
          onClick={() => setCardsClicked(!cardsClicked)}>
          <img
            src={assertiveEmailer}
            className="h-full w-auto object-contain"
            alt="receipt"
          />
        </div>

        {/* this website*/}
        <div className={`absolute h-[90%] -top-[10%] left-[30%] z-0 transform transition-transform duration-300 md:duration-400 -rotate-4 ${cardsClicked ? '-translate-y-[80%] -translate-x-26 md:-translate-x-[180%]' : 'hover:-translate-y-2'}`}
          onClick={() => setCardsClicked(!cardsClicked)}>
          <img
            src={website}
            className="h-full w-auto object-contain"
            alt="note with clipped edges"
          />
        </div>

        {/* Paper overlay with text */}
        <div className="absolute h-[45%] top-[4%] right-[3%] z-20">
          <img src={paper} className="h-full w-full object-contain" alt="note with paperclip"/>

          <div className="absolute inset-0 flex items-center justify-center rotate-7">
            <p className="text-center font-medium italic text-sm md:text-lg xl:text-lg text-navy-blue">
              Projects
            </p>
          </div>
        </div>
      </div>

      <img src={lily} className={`hidden md:block absolute h-1/3 left-20 bottom-10 lily`} onClick={() => {console.log("flower found"); handleImageFound('flowerFound')}}/>

      <img src={orchid} className={`hidden md:block absolute h-1/3 right-20 top-10 orchid`}/>
    </div>
  )
}

export default Projects