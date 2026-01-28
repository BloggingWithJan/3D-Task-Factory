import { BoxSmall } from './FactoryModels'

export interface TaskData {
  id: string
  title: string
  description: string
  points: number
  status: 'todo' | 'in-progress' | 'done'
  position: [number, number, number]
}

interface TaskBoxProps extends TaskData {
  rotation?: [number, number, number]
}

export default function TaskBox({
  id,
  title,
  description,
  points,
  status,
  position,
  rotation = [0, 0, 0],
}: TaskBoxProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* 3D Model */}
      <BoxSmall position={[0, 0, 0]} />
      
      {/* Task metadata (can be used for interactions, labels, etc.) */}
      <group userData={{ taskId: id, title, description, points, status }} />
    </group>
  )
}
