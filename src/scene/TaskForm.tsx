import type { TaskData } from './TaskBox'
import { useState } from 'react'
import '../styles/TaskForm.css'

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: TaskData) => void
}

export default function TaskForm({ isOpen, onClose, onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    points: 1,
    status: 'todo' as const,
    positionX: 0,
    positionY: 0.5,
    positionZ: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: ['points', 'positionX', 'positionY', 'positionZ'].includes(name) ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.id || !formData.title) {
      alert('Please fill in ID and Title')
      return
    }

    const newTask: TaskData = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      points: formData.points,
      status: formData.status,
      position: [formData.positionX, formData.positionY, formData.positionZ],
    }

    onSubmit(newTask)
    setFormData({
      id: '',
      title: '',
      description: '',
      points: 1,
      status: 'todo',
      positionX: 0,
      positionY: 0.5,
      positionZ: 0,
    })
  }

  if (!isOpen) return null

  return (
    <div className="task-form-overlay" onClick={onClose}>
      <div className="task-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="task-form-header">
          <h2>Create New Task</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">Task ID *</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="e.g., 002"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Setup Project"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Install dependencies"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="points">Points</label>
              <input
                type="number"
                id="points"
                name="points"
                value={formData.points}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <fieldset className="position-fieldset">
            <legend>Position in Scene</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="positionX">X</label>
                <input
                  type="number"
                  id="positionX"
                  name="positionX"
                  value={formData.positionX}
                  onChange={handleChange}
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="positionY">Y</label>
                <input
                  type="number"
                  id="positionY"
                  name="positionY"
                  value={formData.positionY}
                  onChange={handleChange}
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label htmlFor="positionZ">Z</label>
                <input
                  type="number"
                  id="positionZ"
                  name="positionZ"
                  value={formData.positionZ}
                  onChange={handleChange}
                  step="0.5"
                />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
