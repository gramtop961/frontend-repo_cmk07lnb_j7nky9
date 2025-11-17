import { X, Minus, Plus } from "lucide-react";

export default function Cart({ open, items, onClose, onUpdateQty, onCheckout }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'} `}>
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Order</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={18} /></button>
        </div>

        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-220px)]">
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2">
                <div className="h-14 w-14 rounded-lg bg-gray-100 bg-cover bg-center" style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1604908554027-482d2b7995d8?q=80&w=600&auto=format&fit=crop'})` }} />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))} className="p-1 rounded bg-gray-100"><Minus size={14} /></button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="p-1 rounded bg-gray-100"><Plus size={14} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tax</span><span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={() => onCheckout({ subtotal, tax, total })}
            className="w-full mt-2 py-3 rounded-full bg-gray-900 text-white disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
