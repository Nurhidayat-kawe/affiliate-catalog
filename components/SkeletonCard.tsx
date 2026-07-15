export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton rounded w-3/4" />
        <div className="h-3 skeleton rounded w-1/2" />
        <div className="flex justify-between items-center">
          <div className="h-6 skeleton rounded w-1/3" />
          <div className="h-10 skeleton rounded w-20" />
        </div>
      </div>
    </div>
  );
}
