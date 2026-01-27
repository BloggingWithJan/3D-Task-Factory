import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Floor, Conveyor, StructureWall, Scanner, BoxSmall, Arrow } from './FactoryModels'

export default function FactoryScene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[8, 6, 8]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Environment */}
      <Environment preset="warehouse" />

      {/* Controls */}
      <OrbitControls target={[0, 0, 0]} />

      {/* Factory Scene */}
      <group>
        {/* Helpers for understanding 3D space */}
        <gridHelper args={[20, 20]} position={[0, 0, 0]} />
        <axesHelper args={[5]} />

        {/* Conveyor Belt Line */}
        {/* <Conveyor position={[-2, 0, 0]} /> */}
        {/* <Conveyor position={[0, 0, 0]} /> */}
        {/* <Conveyor position={[2, 0, 0]} /> */}

        {/* Scanner */}
        {/* <Scanner position={[0, 0, 0]} /> */}

        {/* Structure Walls */}
        <StructureWall position={[-2, 0, 0]} />
        <StructureWall position={[-1, 0, 0]} />
        <StructureWall position={[0, 0, 0]} />
        <StructureWall position={[1, 0, 0]} />
        <StructureWall position={[2, 0, 0]} />

        {/* Floor Grid */}
        <Floor position={[-2, 0, 0]} />
        <Floor position={[-1, 0, 0]} />
        <Floor position={[0, 0, 0]} />
        <Floor position={[1, 0, 0]} />
        <Floor position={[2, 0, 0]} />
        <Floor position={[-2, 0, -1]} />
        <Floor position={[-1, 0, -1]} />
        <Floor position={[0, 0, -1]} />
        <Floor position={[1, 0, -1]} />
        <Floor position={[2, 0, -1]} />
           <Floor position={[-2, 0, -2]} />
        <Floor position={[-1, 0, -2]} />
        <Floor position={[0, 0, -2]} />
        <Floor position={[1, 0, -2]} />
        <Floor position={[2, 0, -2]} />
     

        {/* Create Button  */}
        <Arrow position={[0, 2, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]} />

      </group>

      <BoxSmall position={[0, 0, 0]} />
    </Canvas>
  )
}
