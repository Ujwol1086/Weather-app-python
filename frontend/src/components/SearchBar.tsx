interface SearchBarProps {
  city: string
  onCityChange: (city: string) => void
  onSearch: () => void
}

function SearchBar({ city, onCityChange, onSearch }: SearchBarProps) {
  return (
    <div className="max-w-md mx-auto mb-10">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch()
            }
          }}
          placeholder="Enter city name..."
          className="flex-1 px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
        />
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
