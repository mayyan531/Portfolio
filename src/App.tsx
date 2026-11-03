import Folder from "./Components/home/folder/Folder"
import Header from "./Components/header/Header";
import AboutV2 from "./Components/about/AboutV2";
import Projects from "./Components/projects/Projects";
import Scroll from "./Components/scroll/Scroll";
import Contact from "./Components/contact/Contact";

import { useProgress } from "@react-three/drei";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface foundImages {
    smiskiFound: boolean;
    berryFound: boolean;
    watermelonFound: boolean;
}

interface LoaderProps {
  onLoaded: () => void;
}

function Loader({ onLoaded }: LoaderProps) {
  const { progress } = useProgress();

  if (progress === 100) {
    setTimeout(() => {
      onLoaded();
    }, 500);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cream">
      <AiOutlineLoading className="animate-spin text-4xl" />
    </div>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [foundImages, setFoundImages] = useState<foundImages>({
    smiskiFound: false,
    berryFound: false,
    watermelonFound: false,
  });

  const handleImageFound = (imageName: keyof foundImages) => {
    setFoundImages(prevState => ({
      ...prevState,
      [imageName]: true,
    }));
  };

  if (!loaded) {
    return <Loader onLoaded={() => setLoaded(true)} />
  }
  
  return (
    <div className="relative w-full select-none drag-none bg-linear-to-b from-cream to-blue from-30%">

      <Scroll />

      <div id="home">
        <Folder handleImageFound={handleImageFound} />
      </div>

      <div className="relative w-full">

        <div className="sticky top-0 z-[1000] h-0 w-full pointer-events-none">
          <Header />
        </div>

        <div id="about">
          <AboutV2 />
        </div>

        <div id="projects">
          <Projects />
        </div>

        <div id="contact">
          <Contact foundImages={foundImages} />
        </div>

      </div>
    </div>
  )
}


export default App
