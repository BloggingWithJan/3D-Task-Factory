import type { TaskData } from '../components/models/Box'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Field, FieldGroup } from '@/components/ui/field'

// Configuration for auto-generated positions
const POSITION_LIMITS = {
  x: { min: -3, max: 3 },
  y: { min: 0, max: 0 },
  z: { min: -10, max: 0 },
}

// Utility function to generate GUID
function generateGUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Utility function to generate random position within limits
function generateRandomPosition(): [number, number, number] {
  return [
    Math.random() * (POSITION_LIMITS.x.max - POSITION_LIMITS.x.min) + POSITION_LIMITS.x.min,
    Math.random() * (POSITION_LIMITS.y.max - POSITION_LIMITS.y.min) + POSITION_LIMITS.y.min,
    Math.random() * (POSITION_LIMITS.z.max - POSITION_LIMITS.z.min) + POSITION_LIMITS.z.min,
  ]
}

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: TaskData) => void
  initialData?: TaskData | null
  readOnly?: boolean
}

export default function TaskForm({ isOpen, onClose, onSubmit, initialData = null, readOnly = false }: TaskFormProps) {
  const [formData, setFormData] = useState(() =>
    initialData
      ? { ...initialData }
      : {
        id: generateGUID(),
        title: '',
        description: '',
        points: 1,
        status: 'todo' as const,
        position: generateRandomPosition(),
      }
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (readOnly) return
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'points' ? parseFloat(value) : value,
    }))
  }

  const handleRefreshPosition = () => {
    if (readOnly) return
    setFormData((prev) => ({
      ...prev,
      position: generateRandomPosition(),
    }))
  }

  const handleRefreshId = () => {
    if (readOnly) return
    setFormData((prev) => ({
      ...prev,
      id: generateGUID(),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (readOnly) return
    if (!formData.title) {
      alert('Please fill in the Title')
      return
    }

    const newTask: TaskData = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      points: formData.points,
      status: formData.status,
      position: formData.position,
    }

    onSubmit(newTask)
    // Reset form with new auto-generated values
    setFormData({
      id: generateGUID(),
      title: '',
      description: '',
      points: 1,
      status: 'todo',
      position: generateRandomPosition(),
    })
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      if (initialData) {
        setFormData({ ...initialData })
      } else {
        setFormData({
          id: generateGUID(),
          title: '',
          description: '',
          points: 1,
          status: 'todo',
          position: generateRandomPosition(),
        })
      }
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>      
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialData ? (readOnly ? 'Task Details' : 'Edit Task') : 'Create New Task'}</DialogTitle>
            <DialogDescription>
              {initialData ? 'View or edit the details of this task.' : 'Add a new task to your 3D factory scene.'}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Setup Project"
                required
                readOnly={readOnly}
              />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Install dependencies"
                rows={3}
                readOnly={readOnly}
              />
            </Field>
            <Field>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                name="points"
                type="number"
                value={formData.points}
                onChange={handleChange}
                min="0"
                readOnly={readOnly}
              />
            </Field>
            <Field>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={readOnly}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
            {!readOnly && (
              <Button type="submit">
                Create Task
              </Button>
            )}
          </DialogFooter>
           </form>
        </DialogContent>
     
    </Dialog>
  )
}
