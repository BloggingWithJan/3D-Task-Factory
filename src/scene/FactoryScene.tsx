import { useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Vector3 } from 'three'
import { Floor, Conveyor, StructureWall, Scanner, StructureCornerInnerWall, StructureWindowWall, StructureWindowWallWide, StructureDoorway, StructureDoorwayWide, Hopper, StructureYellowShort, ConveyorBarsStripeSide } from './FactoryModels'
import Box, { type TaskData } from '../components/models/Box'
import TaskForm from './TaskForm'
import { Arrow } from '../components/models/Arrow'
import { Robotarm } from '../components/models/Robotarm'

type CameraRigProps = {
  target: [number, number, number]
  position: [number, number, number]
  controlsRef: RefObject<OrbitControlsImpl>
  active: boolean
}

function CameraRig({ target, position, controlsRef, active }: CameraRigProps) {
  const { camera } = useThree()
  const targetVector = useMemo(() => new Vector3(), [])
  const positionVector = useMemo(() => new Vector3(), [])

  useFrame(() => {
    if (!active) return
    positionVector.set(...position)
    camera.position.lerp(positionVector, 0.08)

    if (controlsRef.current) {
      targetVector.set(...target)
      controlsRef.current.target.lerp(targetVector, 0.08)
      controlsRef.current.update()
    }
  })

  return null
}

export default function FactoryScene() {
  const defaultCameraPosition: [number, number, number] = [8, 6, 8]
  const defaultCameraTarget: [number, number, number] = [0, 0, 0]
  const hopperTarget: [number, number, number] = [-2.5, 0.5, 8]
  const hopperCameraPosition: [number, number, number] = [0, 3, 2]

  const [tasks, setTasks] = useState<TaskData[]>([
    {
      id: '001',
      title: 'Setup Project',
      description: 'Install dependencies',
      points: 3,
      status: 'todo',
      position: [0, 0.5, 0],
    },
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null)
  const [newTaskId, setNewTaskId] = useState<string | null>(null)
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(defaultCameraTarget)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>(defaultCameraPosition)
  const [isCameraLocked, setIsCameraLocked] = useState(false)
  const controlsRef = useRef<OrbitControlsImpl>(null)

  const handleCreateTask = (newTask: TaskData) => {
    setTasks([...tasks, newTask])
    setNewTaskId(newTask.id)
    setTimeout(() => setNewTaskId(null), 1000)
    handleCloseForm()
  }

  const handleBoxClick = (task: TaskData) => {
    setSelectedTask(task)
    setIsFormOpen(true)
  }

  const handleArrowClick = () => {
    setIsCameraLocked(true)
    setCameraTarget(hopperTarget)
    setCameraPosition(hopperCameraPosition)
    setTimeout(() => setIsFormOpen(true), 700)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedTask(null)
    setCameraTarget(defaultCameraTarget)
    setCameraPosition(defaultCameraPosition)
    setTimeout(() => setIsCameraLocked(false), 700)
  }

  return (
    <>
      <Canvas>
        <PerspectiveCamera makeDefault position={defaultCameraPosition} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Environment */}
        <Environment preset="warehouse" />

        {/* Controls */}
        <OrbitControls ref={controlsRef} target={defaultCameraTarget} enabled={!isCameraLocked} />
        <CameraRig target={cameraTarget} position={cameraPosition} controlsRef={controlsRef} active={isCameraLocked} />

        {/* Factory Scene */}
        <group>
          {/* Helpers for understanding 3D space */}
          <gridHelper args={[20, 20]} position={[0, 0, 0]} />
          <axesHelper args={[5]} />

             {/* Create Button  */}
          <Arrow onClick={handleArrowClick} position={[-2.5, 3, 8]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]} />

          {/* Conveyor Line */} 
          <Hopper position={[-2.5, .5, 8]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 8]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 8]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 7]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 7]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 6]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 6]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 5]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 4]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 4]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 3]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 3]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 2]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 2]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 1]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -1]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -2]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -2]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -3]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -3]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -4]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -4]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -5]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -5]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -6]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -6]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -7]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -7]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -8]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -8]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -9]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -9]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -10]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -10]} rotation={[0, Math.PI / 2, 0]} />
          <StructureYellowShort position={[-2.5, 0, -11]} rotation={[0, Math.PI / 2, 0]} />
          <ConveyorBarsStripeSide position={[-2.5, 0.5, -11]} rotation={[0, Math.PI / 2, 0]} />

          {/* Robotarms */}
           <Robotarm position={[-0.5, 0, 2]} rotation={[0, -Math.PI / 4, 0]} />
           <Robotarm position={[-0.5, 0, -4]} rotation={[0, -Math.PI / 4, 0]} />
         

          {/* Structure Walls */}
          <group position={[-5, 0, 0]}>
            <StructureWall position={[0, 0, -9]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, -8]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, -7]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, -6]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, -5]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, -4]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, -3]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWindowWallWide position={[0, 0, -1.5]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 1]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 2]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 3]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWindowWallWide position={[0, 0, 4.5]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 6]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 7]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 8]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWall position={[0, 0, 9]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureCornerInnerWall position={[0, 0, 10]} rotation={[0, -Math.PI / 2, 0]} />
            <StructureWindowWall position={[1, 0, 10]} />
            <StructureWall position={[2, 0, 10]} />
            <StructureWall position={[3, 0, 10]} />
            <StructureWall position={[4, 0, 10]} />
            <StructureWindowWall position={[5, 0, 10]} />
            <StructureWall position={[6, 0, 10]} />
            <StructureWall position={[7, 0, 10]} />
            <StructureWall position={[8, 0, 10]} />
            <StructureWindowWall position={[9, 0, 10]} />
            <StructureCornerInnerWall position={[10, 0, 10]} rotation={[0, Math.PI * 2, 0]} />
            <StructureWall position={[10, 0, 9]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, 8]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWindowWallWide position={[10, 0, 6.5]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
            <StructureDoorway position={[10, 0, 4]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, 3]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, 2]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, 1]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, -2]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWindowWallWide position={[10, 0, -3.5]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, -5]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, -6]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, -7]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, -8]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[10, 0, -9]} rotation={[0, Math.PI / 2, 0]} />
            <StructureCornerInnerWall position={[10, 0, -10]} rotation={[0, Math.PI / 2, 0]} />
            <StructureWall position={[9, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureWall position={[8, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureWall position={[7, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureWall position={[6, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureWall position={[5, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureWall position={[4, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureDoorwayWide position={[2.5, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureWall position={[1, 0, -10]} rotation={[0, Math.PI, 0]} />
            <StructureCornerInnerWall position={[0, 0, -10]} rotation={[0, -Math.PI, 0]} />
          </group>


          {/* Floor Grid */}
          <group scale={[10, 1, 20]} position={[0, 0, 0]}>
            <Floor position={[0, 0, 0]} />
          </group>
                   

          {/* Task Boxes */}
          {tasks.map((task) => (
            <Box
              key={task.id}
              {...task}
              onClick={handleBoxClick}
              isNew={newTaskId === task.id}
            />
          ))}
        </group>
      </Canvas>

      {/* 3D UI Form - Outside Canvas */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleCreateTask}
        initialData={selectedTask}
        readOnly={!!selectedTask}
      />
    </>
  )
}
