import './App.css';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        My Product Store
      </h1>
      <div className="flex gap-4">
        <ProductCard 
          name="Laptop" 
          price="20000" 
          image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" 
        />
        <ProductCard 
          name="Mobile"
          price="1000"
          image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" 
        />
      </div>
    </div>
  );
}

export default App;