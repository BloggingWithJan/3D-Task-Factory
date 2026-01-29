import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import { Floor, Conveyor, StructureWall, Scanner } from './FactoryModels'
import Box, { type TaskData } from '../components/models/Box'
import TaskForm from './TaskForm'
import { Arrow } from '../components/models/Arrow'
import { Robotarm } from '../components/models/Robotarm'

export default function FactoryScene() {

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

  const handleCreateTask = (newTask: TaskData) => {
    setTasks([...tasks, newTask])
    setSelectedTask(newTask)
    setIsFormOpen(false)
    setNewTaskId(newTask.id)
    setTimeout(() => setNewTaskId(null), 1000)
  }

  const handleBoxClick = (task: TaskData) => {
    setSelectedTask(task)
    setIsFormOpen(true)
  }

  return (
    <>
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
          <Arrow onClick={() => setIsFormOpen(true)} position={[0, 2, 0]}
            rotation={[Math.PI / 2, Math.PI / 2, 0]} />

          <Robotarm position={[5, 0, 5]} rotation={[0, -Math.PI / 4, 0]} />  

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
        onClose={() => {
          setIsFormOpen(false)
          setSelectedTask(null)
        }}
        onSubmit={handleCreateTask}
        initialData={selectedTask}
        readOnly={!!selectedTask}
      />
    </>
  )
}
