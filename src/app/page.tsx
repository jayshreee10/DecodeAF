import { Header } from '../components/Layout/Header';
import { TokenDecoder } from '../components/TokenDecoder';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl text-black bg-black min-h-screen min-w-screen">
      <Header />
      <TokenDecoder />
    </div>
  );
}