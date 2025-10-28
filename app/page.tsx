export default function Home() {
  return (
    <div 
      className="relative min-h-screen bg-black flex items-center justify-center p-4"
      style={{ 
        backgroundImage: "url('/logo.png')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Glass Hero Card */}
      <div className="bg-[rgba(30,30,30,0.6)] backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center max-w-2xl w-full shadow-2xl">
        <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-400 mb-2">
          Designing
        </h1>
        <h2 className="text-4xl font-black text-blue-400 mb-4">Tomorrow</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Designing digital experiences that inspire, engage, and leave a lasting impression.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#projects"
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition transform hover:scale-105"
          >
            View My Projects
          </a>
          <a
            href="mailto:hello@primexalbin.dev"
            className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 rounded-full font-medium hover:bg-yellow-400 hover:text-black transition transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}