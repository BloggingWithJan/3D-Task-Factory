
import { useGLTF } from '@react-three/drei'

export function Floor({ position = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/floor.glb')
  return <primitive object={scene.clone()} position={position} />
}

export function Conveyor({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/conveyor-stripe.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}

export function StructureWall({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/structure-wall.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}

export function Scanner({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/scanner-low.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}

export function BoxSmall({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/box-small.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}