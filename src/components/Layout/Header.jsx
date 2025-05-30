export const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="inline-block">
        <h1 className="text-4xl md:text-5xl font-mono font-semibold text-green-400 mb-3">
          <span className="ml-2  ">Token </span>
       
          <span className="text-purple-400 animate-pulse">Converter</span>
        </h1>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-green-400 to-transparent" />
      </div>
      <p className="text-gray-400 font-mono text-sm md:text-base tracking-wider mt-4">
        JSON ↔ JWT ↔ Base64 ↔ Hex ↔ URL
      </p>
    </header>
  );
};