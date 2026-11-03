// const file = `${import.meta.env.BASE_URL}assets/file.png`
//import { Envelope } from '../../about/Envelope'
import Images from '../images/Images'
import { Canvas } from '@react-three/fiber'
import FolderModel from './FolderModel'
import { Environment } from '@react-three/drei'
import { Suspense, useCallback, useState } from 'react'

interface foundImages {
    smiskiFound: boolean;
    berryFound: boolean;
    watermelonFound: boolean;
}

type Props = {
    handleImageFound: (imageName: keyof foundImages) => void;
}

const Folder = ({ handleImageFound }: Props) => {      
    const [textureLoaded, setTextureLoaded] = useState(false);
    const [loadImages, setLoadImages] = useState(false);

    const handleTextureLoaded = useCallback(() => {
        setTextureLoaded(true);
    }, []);
    
  return (
    <div className={`flexh h-screen w-full relative transition-opacity duration-1000 ease-in-out ${textureLoaded ? "opacity-100" : "opacity-0"}`}>
        {loadImages && <Images handleImageFound={handleImageFound} />}

        <Canvas className="w-full h-full" dpr={[1, 2]}>
        <directionalLight
            position={[5, 1, 5]}
            intensity={3}
            color={0xFFF0C5}
        />

        <ambientLight intensity={1.5} color={0xFFFFFF}/>

        <Suspense fallback={null}>
            <Environment
            files={`${import.meta.env.BASE_URL}suburban_garden_1k.hdr`}
            environmentIntensity={0.8}
            />

            <FolderModel
            receiveShadow
            castShadow
            onTextureLoaded={handleTextureLoaded}
            onFirstTimeOpened={() => setLoadImages(true)}
            />
        </Suspense>
        </Canvas>

{/*         <div className='h-2/6 w-auto lg:w-3/9 lg:h-auto relative '>
            <img src={file} alt='file folder' className='h-full w-auto' />

            <div className='absolute inset-0 flex flex-col items-center justify-center hover:cursor-default'>
=                <div className='mt-4 text-center text-navy-blue'>
                    <div className='text-lg xl:text-2xl tracking-wider'>
                        Welcome to
                    </div>

                    <div className='font-bold text-5xl xl:text-6xl 2xl:text-7xl tracking-wider -mt-3'>
                        My <span className='italic'>Portfolio</span>
                    </div>
                </div>
                
                <div className='absolute bottom-3 right-3 px-4 rounded-md text-navy-blue font-inter text-sm font-medium italic bg-blue'>
                    May Yan - 
                </div>
            </div>
        </div> */}
    </div>
  )
}

export default Folder
