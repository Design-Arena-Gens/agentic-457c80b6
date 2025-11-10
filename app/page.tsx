'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, X, Lightbulb, Play, Calendar, TrendingUp } from 'lucide-react'

type VideoIdea = {
  id: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'idea' | 'scripting' | 'filming' | 'editing' | 'scheduled' | 'published'
  createdAt: string
}

type ChannelStats = {
  subscribers: number
  totalViews: number
  totalVideos: number
  avgViewsPerVideo: number
}

export default function Home() {
  const [ideas, setIdeas] = useState<VideoIdea[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Running Tips',
    priority: 'medium' as 'low' | 'medium' | 'high',
    status: 'idea' as VideoIdea['status']
  })
  const [stats, setStats] = useState<ChannelStats>({
    subscribers: 15420,
    totalViews: 487350,
    totalVideos: 142,
    avgViewsPerVideo: 3432
  })

  useEffect(() => {
    const stored = localStorage.getItem('youtube-ideas')
    if (stored) {
      setIdeas(JSON.parse(stored))
    } else {
      const defaultIdeas: VideoIdea[] = [
        {
          id: '1',
          title: '10 Essential Running Form Tips for Beginners',
          description: 'Cover proper posture, foot strike, arm movement, and breathing techniques',
          category: 'Running Tips',
          priority: 'high',
          status: 'scripting',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Best Trail Running Shoes of 2024 - Comprehensive Review',
          description: 'Test and review top 5 trail running shoes with different terrain tests',
          category: 'Gear Reviews',
          priority: 'high',
          status: 'idea',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Marathon Training Plan: Week by Week Guide',
          description: '16-week marathon training program with weekly breakdowns',
          category: 'Training Plans',
          priority: 'medium',
          status: 'idea',
          createdAt: new Date().toISOString()
        }
      ]
      setIdeas(defaultIdeas)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('youtube-ideas', JSON.stringify(ideas))
  }, [ideas])

  const handleAdd = () => {
    const newIdea: VideoIdea = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    }
    setIdeas([newIdea, ...ideas])
    setFormData({
      title: '',
      description: '',
      category: 'Running Tips',
      priority: 'medium',
      status: 'idea'
    })
    setIsAdding(false)
  }

  const handleEdit = (id: string) => {
    const idea = ideas.find(i => i.id === id)
    if (idea) {
      setFormData({
        title: idea.title,
        description: idea.description,
        category: idea.category,
        priority: idea.priority,
        status: idea.status
      })
      setEditingId(id)
    }
  }

  const handleUpdate = () => {
    setIdeas(ideas.map(idea =>
      idea.id === editingId
        ? { ...idea, ...formData }
        : idea
    ))
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      category: 'Running Tips',
      priority: 'medium',
      status: 'idea'
    })
  }

  const handleDelete = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id))
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      category: 'Running Tips',
      priority: 'medium',
      status: 'idea'
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'scripting': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'filming': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'editing': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'scheduled': return 'bg-teal-100 text-teal-800 border-teal-300'
      case 'published': return 'bg-green-100 text-green-800 border-green-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const categories = ['Running Tips', 'Gear Reviews', 'Training Plans', 'Race Vlogs', 'Nutrition', 'Injury Prevention', 'Motivation']

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Play className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-800">Running Channel Manager</h1>
          </div>
          <p className="text-gray-600">Manage your running YouTube channel and video ideas</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Subscribers</p>
                <p className="text-2xl font-bold text-gray-800">{stats.subscribers.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalViews.toLocaleString()}</p>
              </div>
              <Play className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Videos</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalVideos}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Views/Video</p>
                <p className="text-2xl font-bold text-gray-800">{stats.avgViewsPerVideo.toLocaleString()}</p>
              </div>
              <Lightbulb className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Video Idea
          </button>
        </div>

        {/* Add/Edit Form */}
        {(isAdding || editingId) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-indigo-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {editingId ? 'Edit Video Idea' : 'New Video Idea'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter video title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your video idea..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="idea">Idea</option>
                    <option value="scripting">Scripting</option>
                    <option value="filming">Filming</option>
                    <option value="editing">Editing</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update' : 'Add'} Idea
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ideas List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Video Ideas ({ideas.length})
          </h2>
          {ideas.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No video ideas yet. Start by adding your first idea!</p>
            </div>
          ) : (
            ideas.map(idea => (
              <div key={idea.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{idea.title}</h3>
                    <p className="text-gray-600 mb-3">{idea.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-300">
                        {idea.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(idea.priority)}`}>
                        {idea.priority.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(idea.status)}`}>
                        {idea.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(idea.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(idea.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Created: {new Date(idea.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
