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
    <div className="h-full p-6 bg-gray-50 border-r border-gray-200 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Writing Area</h2>
      <textarea
        className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start writing here..."
        value={text}
        onChange={handleChange}
      />
    </div>
  )
}

