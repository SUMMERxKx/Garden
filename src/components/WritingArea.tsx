import { useState, useCallback } from 'react'
import { useWritingStats } from '../hooks/useWritingStats'

interface WritingAreaProps {
  onTextChange?: (text: string) => void
}

export function WritingArea({ onTextChange }: WritingAreaProps) {
  const [text, setText] = useState('')
  const { updateText } = useWritingStats()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value
      setText(newText)
      updateText(newText)
      onTextChange?.(newText)
    },
    [updateText, onTextChange]
  )

  return (
    <div className="h-full p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-r border-gray-200 flex flex-col shadow-inner">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">✍️ Writing Area</h2>
        <p className="text-sm text-gray-500">Your words become sunlight for your plant</p>
      </div>
      <textarea
        className="flex-1 w-full p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all bg-white shadow-sm"
        placeholder="Start writing here... Your words will bring light to your soul plant 🌱"
        value={text}
        onChange={handleChange}
      />
    </div>
  )
}

