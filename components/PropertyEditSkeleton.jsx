const PropertyEditSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4 animate-pulse">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-9 w-56 bg-white/10 rounded mx-auto mb-3" />
          <div className="h-4 w-72 bg-white/10 rounded mx-auto" />
        </div>

        <div className="space-y-5">
          {/* Property Type */}
          <SkeletonSection titleWidth="w-32">
            <div className="h-11 rounded-xl bg-white/10" />
          </SkeletonSection>

          {/* Basic Info */}
          <SkeletonSection titleWidth="w-28">
            <div className="space-y-4">
              <div>
                <div className="h-3 w-24 bg-white/10 rounded mb-2" />
                <div className="h-11 rounded-xl bg-white/10" />
              </div>

              <div>
                <div className="h-3 w-24 bg-white/10 rounded mb-2" />
                <div className="h-28 rounded-xl bg-white/10" />
              </div>
            </div>
          </SkeletonSection>

          {/* Location */}
          <SkeletonSection titleWidth="w-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-11 rounded-xl bg-white/10" />
              ))}
            </div>
          </SkeletonSection>

          {/* Property Details */}
          <SkeletonSection titleWidth="w-36">
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-12 bg-white/10 rounded mb-2" />
                  <div className="h-11 rounded-xl bg-white/10" />
                </div>
              ))}
            </div>
          </SkeletonSection>

          {/* Amenities */}
          <SkeletonSection titleWidth="w-28">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-white/10" />
              ))}
            </div>
          </SkeletonSection>

          {/* Rates */}
          <SkeletonSection titleWidth="w-20">
            <div className="grid grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-16 bg-white/10 rounded mb-2" />
                  <div className="h-11 rounded-xl bg-white/10" />
                </div>
              ))}
            </div>
          </SkeletonSection>

          {/* Seller Info */}
          <SkeletonSection titleWidth="w-28">
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-11 rounded-xl bg-white/10" />
              ))}
            </div>
          </SkeletonSection>

          {/* Submit Button */}
          <div className="h-12 rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
};

const SkeletonSection = ({ children, titleWidth = "w-32" }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
    <div className={`h-4 ${titleWidth} bg-white/10 rounded mb-5`} />
    {children}
  </div>
);

export default PropertyEditSkeleton;
