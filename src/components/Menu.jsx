import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

function MenuCard({ item, onAdd }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 flex gap-4">
      <div
        className="h-24 w-24 rounded-xl bg-gray-100 shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1604908554027-482d2b7995d8?q=80&w=600&auto=format&fit=crop'})` }}
      />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          </div>
          <div className="text-right">
            <div className="font-semibold">${item.price.toFixed(2)}</div>
            <button
              onClick={() => onAdd(item)}
              className="mt-2 inline-flex items-center px-3 py-1.5 rounded-full bg-rose-500 text-white text-sm hover:bg-rose-600"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-500">{item.category}</div>
      </div>
    </div>
  );
}

export default function Menu({ onAdd }) {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
        const url = category !== 'all' ? `${base}/api/menu?category=${encodeURIComponent(category)}` : `${base}/api/menu`;
        const res = await fetch(url);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [category]);

  const cats = ["all", "Pizza", "Pasta", "Antipasti", "Drinks", "Dessert"];

  return (
    <section id="menu" className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Menu</h2>
          <div className="flex gap-2 overflow-x-auto">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${category === c ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-16 w-full grid place-items-center text-gray-500">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
