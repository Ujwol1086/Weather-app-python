interface WeatherDetailProps {
  label: string
  value: string | number
  unit?: string
}

function WeatherDetail({ label, value, unit = '' }: WeatherDetailProps) {
  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
      <p className="text-blue-100 text-sm mb-1">{label}</p>
      <p className="text-white text-xl font-semibold">
        {value}{unit}
      </p>
    </div>
  )
}

export default WeatherDetail
