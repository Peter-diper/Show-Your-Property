const PaginationSkeleton = () => {
  return (
    <section className="flex justify-center items-center gap-3 my-8 animate-pulse">
      {/* Previous */}
      <div className="w-20 h-9 rounded-xl bg-white/5 border border-white/10" />

      {/* Page indicator */}
      <div className="w-24 h-9 rounded-xl bg-blue-600/20 border border-blue-500/20" />

      {/* Next */}
      <div className="w-20 h-9 rounded-xl bg-white/5 border border-white/10" />
    </section>
  );
};

export default PaginationSkeleton;
