import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import AddItem from '@/pages/AddItem';
import ItemDetails from '@/pages/ItemDetails';
//import { sampleItems } from '@/data/items'; removed
import type { LostFoundItem } from '@/types';

function App() {
  const [items, setItems] = useState<LostFoundItem[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:3000/items")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setItems(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setItems(data);
      });
  }, []);
  

  const handleAdd = (item: LostFoundItem) => {
    setItems((prev) => [item, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home items={items} />} />
            <Route path="/add-item" element={<AddItem items={items} onAdd={handleAdd} />} />
            <Route path="/item/:id" element={<ItemDetails items={items} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
