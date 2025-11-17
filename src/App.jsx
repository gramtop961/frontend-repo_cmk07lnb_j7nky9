import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Cart from './components/Cart'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [placing, setPlacing] = useState(false)
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i))
  }

  const handleCheckout = async (summary) => {
    if (cart.length === 0) return
    setPlacing(true)
    try {
      // Minimal prompt for customer details
      const name = prompt('Your name for the order?') || 'Guest'
      const phone = prompt('Phone number?') || 'N/A'
      const address = prompt('Delivery address (or leave blank for pickup)') || ''

      const orderPayload = {
        items: cart.map((i) => ({
          menu_item_id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          notes: ''
        })),
        subtotal: +summary.subtotal.toFixed(2),
        tax: +summary.tax.toFixed(2),
        total: +summary.total.toFixed(2),
        status: 'pending',
        customer: { name, phone, address },
        notes: ''
      }

      const res = await fetch(`${base}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })
      const data = await res.json()
      if (res.ok) {
        alert('Order placed! Reference: ' + data.id)
        setCart([])
        setCartOpen(false)
      } else {
        alert('Failed to place order: ' + (data.detail || 'Unknown error'))
      }
    } catch (e) {
      alert('Error: ' + e.message)
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onCartClick={() => setCartOpen(true)} />
      <Hero />
      <Menu onAdd={addToCart} />
      <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} Tutti Amici. All rights reserved.</footer>
      <Cart open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onCheckout={handleCheckout} />
    </div>
  )
}

export default App
