interface SearchBarProps {
  city: string
  onCityChange: (city: string) => void
  onSearch: () => void
  loading?: boolean
}

function SearchBar({ city, onCityChange, onSearch, loading = false }: SearchBarProps) {
  return (
    <div className="max-w-md mx-auto mb-10">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              onSearch()
            }
          }}
          placeholder="Enter city name..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  )
}

export default SearchBar
