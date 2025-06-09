export default function Hero() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 hero-gradient">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-50"
          poster="/pitch-placeholder.jpg"
        >
          <source src="/football-background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6 neon-text">
              Experience Football Like Never Before
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Join the most exciting football sessions in your area. Book, play, and connect with other passionate players.
            </p>
            <button className="neon-button px-8 py-3 rounded-full text-lg font-semibold">
              Find Your Next Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
