export const Header = () => {
  return (
    <header className="text-center mb-10 group">
      <div className="inline-block relative">
        <h1 className="text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-3 tracking-tighter">
          <span className="blink">$</span> TOKEN_CONVERTER
        </h1>
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400/0 via-green-400 to-cyan-400/0 group-hover:via-purple-400 transition-all duration-300" />
      </div>
      <p className="text-gray-400 font-mono text-sm tracking-wider pt-5">
        [JSON ⇄ TOKEN] • [JWT|BASE64|HEX] • [ENCRYPT/DECRYPT]
      </p>
    </header>
  );
};