import { Canvas } from "@react-three/fiber"
import { Envelope } from "./Envelope"
import { Environment } from "@react-three/drei"
import { Suspense } from "react"

const AboutV2 = () => {
  return (
    <div className="w-full h-screen">
        <Canvas className="w-full h-full" dpr={[1, 2]}>
            <directionalLight position={[5, -1, 5]} intensity={1.5} color={0xFFF0C5}/>
            <ambientLight intensity={1} color={0xFFFFFF}/>
            <Environment files={`${import.meta.env.BASE_URL}suburban_garden_1k.hdr`} environmentIntensity={0.8}/>

            <Suspense fallback={null}>
                <Envelope receiveShadow castShadow/>
            </Suspense>
        </Canvas>
    </div>
  )
}

export default AboutV2