export function viewport(node) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.dispatchEvent(new CustomEvent('enterViewport'));
          // Opsional: Jika ingin animasi hanya dimainkan sekali saat muncul pertama kali
          // observer.unobserve(node);
        } else {
          node.dispatchEvent(new CustomEvent('exitViewport'));
        }
      });
    },
    {
      rootMargin: '0px 0px -10% 0px' // Memicu saat elemen masuk 10% dari bawah layar
    }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
