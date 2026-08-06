const ProfileSkeleton = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-black/30">
          {/* Heading */}
          <div className="h-8 w-48 rounded bg-white/10 mb-8" />

          <div className="flex flex-col md:flex-row gap-8">
            {/* ================= Profile ================= */}
            <div className="md:w-1/4 flex flex-col items-center md:items-start gap-5">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full bg-white/10" />

              {/* Name */}
              <div className="w-full space-y-2">
                <div className="h-3 w-14 rounded bg-white/10" />
                <div className="h-5 w-32 rounded bg-white/10" />
              </div>

              {/* Email */}
              <div className="w-full space-y-2">
                <div className="h-3 w-16 rounded bg-white/10" />
                <div className="h-4 w-44 rounded bg-white/10" />
              </div>
            </div>

            {/* ================= Listings ================= */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="h-4 w-32 rounded bg-white/10" />
                <div className="h-7 w-28 rounded-full bg-white/10" />
              </div>

              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4"
                  >
                    {/* Property Image */}
                    <div className="h-28 w-full sm:w-44 rounded-lg bg-white/10 shrink-0" />

                    {/* Property Content */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="h-5 w-52 rounded bg-white/10 mb-3" />
                        <div className="h-3 w-72 max-w-full rounded bg-white/10" />
                      </div>

                      <div className="flex gap-3 mt-5">
                        <div className="h-9 w-24 rounded-lg bg-white/10" />
                        <div className="h-9 w-24 rounded-lg bg-white/10" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ================= End Listings ================= */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSkeleton;
