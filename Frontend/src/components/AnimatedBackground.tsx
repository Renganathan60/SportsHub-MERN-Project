interface AnimatedBackgroundProps {
  intensity?: 'subtle' | 'normal' | 'bold';
  imageUrl?: string;
}

export default function AnimatedBackground({ intensity = 'normal', imageUrl }: AnimatedBackgroundProps) {
  const opacity = intensity === 'subtle' ? 'opacity-5' : intensity === 'bold' ? 'opacity-15' : 'opacity-10';
  const blur = intensity === 'bold' ? 'blur-3xl' : 'blur-2xl';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="background"
          className={`absolute inset-0 w-full h-full object-cover ${opacity} ${blur}`}
        />
      )}
      
      {/* Light gradient overlay for the new theme */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-100/30 via-sky-50/20 to-slate-100/30 ${opacity}`} />

      {/* Floating geometric shapes for modern look */}
      <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-sport-primary-400/20 to-sport-primary-600/10 rounded-full ${blur} animate-float-advanced`} />
      <div className={`absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-400/15 to-purple-500/10 rounded-full ${blur} animate-bounce-advanced`} />
      <div className={`absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-sky-400/20 to-blue-600/10 rounded-full ${blur} animate-float-advanced`} />
      <div className={`absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-sport-primary-500/15 to-sport-primary-700/10 rounded-full ${blur} animate-bounce-advanced`} />

      {/* Subtle radial accents for depth */}
      <div className={`absolute inset-0 ${opacity}`} style={{
        backgroundImage:
          'radial-gradient(circle at 25% 25%, rgba(14,165,233,0.1) 0 15%, transparent 15%), radial-gradient(circle at 75% 25%, rgba(59,130,246,0.08) 0 20%, transparent 20%), radial-gradient(circle at 50% 75%, rgba(139,92,246,0.06) 0 18%, transparent 18%)'
      }} />
    </div>
  );
}
