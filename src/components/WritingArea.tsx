export function WritingArea() {
  return (
    <div className="h-full p-6 bg-gray-50 border-r border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Writing Area</h2>
      <textarea
        className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start writing here..."
      />
    </div>
  )
}

