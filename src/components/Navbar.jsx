import { ShoppingCart, Utensils } from "lucide-react";

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 grid place-items-center text-white">
            <Utensils size={18} />
          </div>
          <span className="text-xl font-semibold tracking-tight">tutti amici</span>
        </div>
        <button
          onClick={onCartClick}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          <ShoppingCart size={18} />
          <span className="text-sm">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white h-6 min-w-[1.5rem] px-2 rounded-full grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
