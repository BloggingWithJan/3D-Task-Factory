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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? (readOnly ? 'Task Details' : 'Edit Task') : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            {initialData ? 'View or edit the details of this task.' : 'Add a new task to your 3D factory scene.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task ID - Auto Generated */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Task ID</Label>
              {!readOnly && (
                <button
                  type="button"
                  onClick={handleRefreshId}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  🔄 Regenerate
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={formData.id}
                readOnly
                className="font-mono text-xs"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
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
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Install dependencies"
              rows={3}
              className="flex w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              readOnly={readOnly}
            />
          </div>

          {/* Points and Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                disabled={readOnly}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Position Fields - Auto Generated */}
          <fieldset className="space-y-2 border border-border rounded-sm p-3">
            <div className="flex items-center justify-between">
              <legend className="text-xs font-medium uppercase tracking-wide text-foreground">Position in Scene</legend>
              {!readOnly && (
                <button
                  type="button"
                  onClick={handleRefreshPosition}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  🔄 Randomize
                </button>
              )}
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>X: [{POSITION_LIMITS.x.min}, {POSITION_LIMITS.x.max}]</div>
              <div>Y: [{POSITION_LIMITS.y.min}, {POSITION_LIMITS.y.max}]</div>
              <div>Z: [{POSITION_LIMITS.z.min}, {POSITION_LIMITS.z.max}]</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="positionX" className="text-xs">X</Label>
                <Input
                  id="positionX"
                  type="text"
                  value={formData.position[0].toFixed(2)}
                  readOnly
                  className="h-9 text-sm font-mono"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="positionY" className="text-xs">Y</Label>
                <Input
                  id="positionY"
                  type="text"
                  value={formData.position[1].toFixed(2)}
                  readOnly
                  className="h-9 text-sm font-mono"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="positionZ" className="text-xs">Z</Label>
                <Input
                  id="positionZ"
                  type="text"
                  value={formData.position[2].toFixed(2)}
                  readOnly
                  className="h-9 text-sm font-mono"
                />
              </div>
            </div>
          </fieldset>

          {/* Actions */}
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
