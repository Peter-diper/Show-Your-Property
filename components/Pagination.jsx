import { scrollToTop } from "@/utils/scrollTop";

const Pagination = ({ handleChage, page, total, pageSize }) => {
  const totalPage = Math.ceil(total / pageSize);

  const handlePageChange = (newPage) => {
    scrollToTop();
    if (newPage >= 1 && newPage <= totalPage) {
      handleChage(newPage);
    }
  };

  return (
    <section className="flex justify-center items-center gap-3 my-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
      >
        ← Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        <span
          className={`flex items-center justify-center px-4 py-2  rounded-xl text-sm font-medium transition-all duration-200 border bg-blue-600 border-blue-500/50 text-white shadow-lg shadow-blue-500/20 `}
        >
          {page} of {totalPage}
        </span>
      </div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPage}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm"
      >
        Next →
      </button>
    </section>
  );
};

export default Pagination;
