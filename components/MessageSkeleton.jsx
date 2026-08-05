const MessageSkeleton = () => {
  return (
    <div className="border border-slate-200 rounded-xl p-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-6 w-56 bg-slate-200 rounded"></div>
          <div className="h-4 w-28 bg-slate-200 rounded"></div>
        </div>

        <div className="h-7 w-16 bg-slate-200 rounded-full"></div>
      </div>

      {/* Message Body */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-slate-200 rounded"></div>
        <div className="h-4 w-11/12 bg-slate-200 rounded"></div>
        <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-3 mt-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
            <div className="h-4 flex-1 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-8">
        <div className="h-10 w-32 bg-slate-200 rounded-lg"></div>
        <div className="h-10 w-24 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
