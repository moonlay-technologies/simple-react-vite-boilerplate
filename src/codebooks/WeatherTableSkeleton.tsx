// WeatherTableSkeleton.jsx
interface WeatherTableSkeletonProps {
  rowsCount?: number;
}
export default function WeatherTableSkeleton({rowsCount = 7}: WeatherTableSkeletonProps) {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm mt-4 bg-white animate-pulse">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-center"><div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div></th>
            <th className="p-3 text-center"><div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div></th>
            <th className="p-3 text-center"><div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowsCount}).map((_, index) => (
            <tr key={index} className="border-b">
              <td className="p-3"><div className="h-4 bg-gray-100 rounded w-24 mx-auto"></div></td>
              <td className="p-3"><div className="h-4 bg-gray-100 rounded w-16 mx-auto"></div></td>
              <td className="p-3"><div className="h-4 bg-gray-100 rounded w-16 mx-auto"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}