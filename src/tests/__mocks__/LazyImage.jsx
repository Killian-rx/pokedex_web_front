// Mock simple pour LazyImage dans les tests
const LazyImage = ({ src, alt, className }) => {
  // eslint-disable-next-line @next/next/no-img-element -- Test mock, not actual image
  return <img src={src} alt={alt} className={className} />;
};

export default LazyImage;