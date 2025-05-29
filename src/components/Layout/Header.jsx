export const Header = () => {
  return (
    <header className="text-center mb-8 ">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Advanced Token Converter
      </h1>
      <p className="text-gray-600">
        Convert between JSON and tokens (JWT, Base64, URL-encoded, Hex) in both directions
      </p>
    </header>
  );
};