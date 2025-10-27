export default function HeroBanner() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
          <img
            src="/hero-banner.jpeg"
            alt="AlterFUN Hero Banner"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: "1200/420" }}
          />
        </div>
      </div>
    </div>
  );
}
