export const scrollToTop = () => {
  const element = document.documentElement;
  const start = element.scrollTop;
  const duration = 500;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    element.scrollTop = start * (1 - ease);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};
