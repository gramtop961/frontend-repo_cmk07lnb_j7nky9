export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,128,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,136,0,0.15),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Tutti Amici
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Italian comfort, crafted with love. Explore our seasonal menu of wood‑fired pizzas, handmade pastas, and fresh antipasti.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#menu" className="px-5 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition">Browse Menu</a>
            <a href="#about" className="px-5 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition">About Us</a>
          </div>
        </div>
        <div className="aspect-[4/3] md:aspect-[5/4] rounded-3xl bg-[url('https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjMzMDU0MTN8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center shadow-2xl" />
      </div>
    </section>
  );
}
