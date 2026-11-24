"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminDashboard from "./components/AdminDashboard";
import CartPanel from "./components/CartPanel";
import {
  CATEGORIES,
  CATEGORY_ICONS,
  DEFAULT_PRODUCTS,
  STORE_KEY,
  WHATSAPP_NUMBER,
  rupiah,
} from "./data/products";

const FILTERS = ["Semua", ...CATEGORIES];

export default function HomePage() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [keyword, setKeyword] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  // Baca katalog tersimpan setelah mount agar HTML server dan browser tetap sama.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (Array.isArray(data)) setProducts(data);
      }
    } catch (error) {
      console.warn("Gagal membaca data produk:", error);
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(products));
    } catch (error) {
      console.warn("Gagal menyimpan data produk:", error);
    }
  }, [products, storageReady]);

  const cartLines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          return product ? { id: item.id, qty: item.qty, product } : null;
        })
        .filter(Boolean),
    [cart, products]
  );

  const total = cartLines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const cartCount = cartLines.reduce((sum, line) => sum + line.qty, 0);

  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "Semua" || product.category === activeCategory) &&
      product.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  const addToCart = (id) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id, qty: 1 }];
    });
    alert("Produk berhasil ditambahkan!");
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const chooseCategory = (category) => {
    setActiveCategory(category);
    document.getElementById("produk")?.scrollIntoView({ behavior: "smooth" });
  };

  const chatWA = (message) => {
    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message),
      "_blank"
    );
  };

  const checkout = () => {
    if (!cartLines.length) {
      alert("Keranjang masih kosong!");
      return;
    }

    let message = "Halo Paw & Co., saya ingin memesan:\n\n";
    cartLines.forEach((line) => {
      const subtotal = line.product.price * line.qty;
      message += line.product.name + " x " + line.qty + " = " + rupiah(subtotal) + "\n";
    });
    message += "\nTotal Pesanan: " + rupiah(total);
    chatWA(message);
  };

  const closeAdmin = useCallback(() => setAdminOpen(false), []);

  return (
    <>
      <header>
        <div className="logo">🐾 Paw &amp; Co.</div>
        <nav>
          <a href="#home">Beranda</a>
          <a href="#kategori">Kategori</a>
          <a href="#produk">Produk</a>
          <a href="#layanan">Layanan</a>
          <a href="#kontak">Kontak</a>
        </nav>
        <div className="header-actions">
          <button className="cart-btn admin-btn" onClick={() => setAdminOpen(true)}>
            ⚙ Admin
          </button>
          <button className="cart-btn" onClick={() => setCartOpen((open) => !open)}>
            🛒 <span>{cartCount}</span>
          </button>
        </div>
      </header>

      {/* BERANDA */}
      <div className="hero" id="home">
        <div className="hero-text">
          <h1>
            Semua untuk sahabat <span>berbulu.</span>
          </h1>
          <p>
            Temukan berbagai kebutuhan hewan kesayangan, mulai dari makanan, vitamin,
            aksesoris hingga perlengkapan terbaik dengan harga terjangkau.
          </p>
          <a href="#produk" className="btn">
            Belanja Sekarang →
          </a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900"
          alt="Anjing lucu"
        />
      </div>

      {/* KATEGORI */}
      <section id="kategori">
        <div className="section-title">
          <h2>Kategori Produk</h2>
          <p>Pilih kebutuhan hewan kesayangan.</p>
        </div>
        <div className="categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className="category"
              onClick={() => chooseCategory(category)}
            >
              <div className="icon">{CATEGORY_ICONS[category]}</div>
              <h3>{category}</h3>
            </button>
          ))}
        </div>
      </section>

      {/* KATALOG PRODUK */}
      <section id="produk">
        <div className="section-title">
          <h2>Katalog Produk</h2>
          <p>Temukan produk terbaik untuk sahabat berbulu.</p>
        </div>

        <input
          type="text"
          className="search-box"
          placeholder="Cari nama produk..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />

        <div className="filters">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className={activeCategory === filter ? "active" : undefined}
              onClick={() => chooseCategory(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="products">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <article className="product" key={product.id}>
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <div className="price">{rupiah(product.price)}</div>
                  <button onClick={() => addToCart(product.id)}>+ Tambah Keranjang</button>
                </div>
              </article>
            ))
          ) : (
            <p>Produk tidak ditemukan.</p>
          )}
        </div>
      </section>

      {/* PROMO */}
      <div className="promo">
        <h2>Sayangi Mereka Setiap Hari 💗</h2>
        <p>Berikan kebutuhan terbaik untuk hewan kesayangan bersama Paw &amp; Co.</p>
        <button
          className="btn"
          onClick={() => chatWA("Halo, saya ingin bertanya tentang promo.")}
        >
          Tanya Promo
        </button>
      </div>

      {/* LAYANAN */}
      <section id="layanan">
        <div className="section-title">
          <h2>Layanan Kami</h2>
          <p>Kami siap membantu kebutuhan hewan kesayangan.</p>
        </div>
        <div className="services">
          <div className="service">
            <div className="icon">🛁</div>
            <h3>Pet Grooming</h3>
            <p>
              Layanan memandikan dan merawat kebersihan hewan agar tetap bersih dan
              nyaman.
            </p>
          </div>
          <div className="service">
            <div className="icon">🩺</div>
            <h3>Konsultasi Produk</h3>
            <p>Bantuan memilih makanan dan vitamin sesuai kebutuhan hewan kesayangan.</p>
          </div>
          <div className="service">
            <div className="icon">🚚</div>
            <h3>Pengiriman</h3>
            <p>
              Pesan kebutuhan hewan dari rumah dan hubungi admin untuk pengiriman.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section>
        <div className="section-title">
          <h2>Testimoni Pelanggan</h2>
          <p>Cerita pelanggan Paw &amp; Co.</p>
        </div>
        <div className="testimonials">
          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>
              Produknya lengkap dan adminnya ramah. Sangat membantu mencari kebutuhan
              kucing.
            </p>
            <br />
            <b>— Nanda</b>
          </div>
          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>Pilihan makanannya banyak dan harganya cukup terjangkau.</p>
            <br />
            <b>— Rani</b>
          </div>
          <div className="testimonial">
            <div className="stars">★★★★★</div>
            <p>Pelayanannya bagus dan respons admin sangat cepat.</p>
            <br />
            <b>— Dita</b>
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section className="contact" id="kontak">
        <div className="section-title">
          <h2>Hubungi Kami</h2>
          <p>Butuh bantuan? Hubungi Paw &amp; Co.</p>
        </div>
        <p>📍 Alamat: Isi alamat toko Anda</p>
        <p>📱 WhatsApp: 0812-3456-7890</p>
        <p>📷 Instagram: @pawandco</p>
        <p>🕒 Jam Buka: 09.00 - 20.00 WIB</p>
        <button className="btn" onClick={() => chatWA("Halo Paw & Co., saya ingin bertanya.")}>
          Hubungi WhatsApp
        </button>
      </section>

      <footer>
        <h2>🐾 Paw &amp; Co.</h2>
        <p>Care, Comfort, and Cuddles for Every Pet.</p>
        <p>© 2026 Paw &amp; Co. All Rights Reserved.</p>
      </footer>

      <button className="wa-button" onClick={() => chatWA("Halo Paw & Co., saya ingin bertanya.")}>
        ☎ WhatsApp
      </button>

      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cartLines}
        total={total}
        onRemove={removeItem}
        onCheckout={checkout}
      />

      <AdminDashboard
        open={adminOpen}
        onClose={closeAdmin}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
}
