
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

export function StructureWindowWall({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/structure-window.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}

export function StructureWindowWallWide({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/structure-window-wide.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}

export function StructureCornerInnerWall({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/structure-corner-inner.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}

export function StructureDoorway({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/structure-doorway.glb')
  return <primitive object={scene.clone()} position={position} rotation={rotation} />
}


export function StructureDoorwayWide({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/kenney_conveyor_kit/structure-doorway-wide.glb')
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