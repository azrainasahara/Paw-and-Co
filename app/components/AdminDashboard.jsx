"use client";

import { useEffect, useRef, useState } from "react";
import {
  ADMIN_PASS,
  ADMIN_USER,
  AUTH_KEY,
  CATEGORIES,
  DEFAULT_PRODUCTS,
  FALLBACK_IMG,
  STORE_KEY,
  rupiah,
} from "../data/products";

const EMPTY_FORM = { name: "", category: CATEGORIES[0], price: "", image: "" };

export default function AdminDashboard({ open, onClose, products, setProducts }) {
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const nameRef = useRef(null);

  // Sesi login hanya berlaku selama tab terbuka.
  useEffect(() => {
    if (!open) return;
    setError("");
    setPassword("");
    try {
      setAuthed(sessionStorage.getItem(AUTH_KEY) === "ok");
    } catch {
      setAuthed(false);
    }
  }, [open]);

  // Kunci scroll halaman + tombol Esc menutup dashboard.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
      setError("");
      setPassword("");
      try {
        sessionStorage.setItem(AUTH_KEY, "ok");
      } catch {
        /* sessionStorage tidak tersedia, dashboard tetap terbuka di sesi ini */
      }
      setAuthed(true);
    } else {
      setError("Username atau password salah.");
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* abaikan */
    }
    resetForm();
    setUsername("");
    setAuthed(false);
  };

  const saveProduct = (event) => {
    event.preventDefault();
    const name = form.name.trim();
    const category = form.category;
    const price = parseInt(form.price, 10);
    const image = form.image.trim() || FALLBACK_IMG;

    if (!name) {
      alert("Nama produk wajib diisi.");
      nameRef.current?.focus();
      return;
    }
    if (isNaN(price) || price <= 0) {
      alert("Harga produk harus berupa angka lebih dari 0.");
      return;
    }

    if (editingId !== null) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, name, category, price, image } : p))
      );
    } else {
      setProducts((prev) => {
        const newId = prev.reduce((max, p) => Math.max(max, p.id), 0) + 1;
        return [...prev, { id: newId, name, category, price, image }];
      });
    }

    resetForm();
  };

  const startEdit = (id) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    setEditingId(id);
    setForm({
      name: item.name,
      category: item.category,
      price: String(item.price),
      image: item.image,
    });
    nameRef.current?.focus();
  };

  const deleteProduct = (id) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    if (!confirm('Hapus produk "' + item.name + '" dari katalog?')) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) resetForm();
  };

  const resetProducts = () => {
    if (!confirm("Kembalikan katalog ke 32 produk awal? Semua perubahan akan hilang.")) return;

    try {
      localStorage.removeItem(STORE_KEY);
    } catch {
      /* abaikan */
    }
    setProducts(DEFAULT_PRODUCTS.map((p) => ({ ...p })));
    resetForm();
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = products.length ? Math.round(totalValue / products.length) : 0;

  return (
    <div className={`admin-overlay${open ? " open" : ""}`} aria-hidden={!open}>
      {!authed ? (
        <form className="login-card" onSubmit={handleLogin}>
          <h2>🐾 Admin Login</h2>
          <p className="sub">Masuk untuk mengelola katalog Paw &amp; Co.</p>
          <label htmlFor="adminUser">Username</label>
          <input
            id="adminUser"
            type="text"
            placeholder="admin"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="adminPass">Password</label>
          <input
            id="adminPass"
            type="password"
            placeholder="••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" type="submit">
            Masuk Dashboard
          </button>
          <div className="login-err">{error}</div>
          <button className="btn-sm login-back" type="button" onClick={onClose}>
            ← Kembali ke Toko
          </button>
        </form>
      ) : (
        <div className="dash">
          <div className="dash-head">
            <div>
              <h2>Dashboard Admin</h2>
              <small>
                {editingId !== null
                  ? "Sedang mengedit: " + (products.find((p) => p.id === editingId)?.name || "")
                  : "Kelola produk Paw & Co."}
              </small>
            </div>
            <div className="actions">
              <button className="btn-sm" type="button" onClick={resetForm}>
                ↻ Refresh
              </button>
              <button className="btn-sm danger" type="button" onClick={resetProducts}>
                Reset Data
              </button>
              <button className="btn-sm" type="button" onClick={handleLogout}>
                Logout
              </button>
              <button className="btn-sm" type="button" onClick={onClose}>
                ✕ Tutup
              </button>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <span>Total Produk</span>
              <b>{products.length}</b>
            </div>
            <div className="stat">
              <span>Jumlah Kategori</span>
              <b>{categories.length}</b>
            </div>
            <div className="stat">
              <span>Total Nilai Katalog</span>
              <b>{rupiah(totalValue)}</b>
            </div>
            <div className="stat">
              <span>Harga Rata-rata</span>
              <b>{rupiah(averagePrice)}</b>
            </div>
          </div>

          <form className="dash-form" onSubmit={saveProduct}>
            <div>
              <label htmlFor="fName">Nama Produk</label>
              <input
                id="fName"
                ref={nameRef}
                type="text"
                placeholder="Contoh: Premium Cat Food"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="fCat">Kategori</label>
              <select
                id="fCat"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fPrice">Harga (Rp)</label>
              <input
                id="fPrice"
                type="number"
                min="0"
                placeholder="0"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="fImage">URL Gambar</label>
              <input
                id="fImage"
                type="url"
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              />
            </div>
            <div className="form-actions">
              <button className="btn-sm" type="submit">
                {editingId !== null ? "Simpan Perubahan" : "+ Tambah"}
              </button>
              {editingId !== null && (
                <button className="btn-sm danger" type="button" onClick={resetForm}>
                  Batal
                </button>
              )}
            </div>
          </form>

          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.length ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image || FALLBACK_IMG}
                          alt={product.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = FALLBACK_IMG;
                          }}
                        />
                      </td>
                      <td>
                        <b>{product.name}</b>
                      </td>
                      <td>
                        <span className="tag">{product.category}</span>
                      </td>
                      <td>{rupiah(product.price)}</td>
                      <td>
                        <div className="row-actions">
                          <button className="btn-sm" type="button" onClick={() => startEdit(product.id)}>
                            Edit
                          </button>
                          <button
                            className="btn-sm danger"
                            type="button"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="empty-row" colSpan={5}>
                      Belum ada produk. Tambahkan produk pertama Anda di form atas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="dash-note">
            Data tersimpan di browser ini (localStorage) dan langsung tampil di katalog toko.
            <br />
            Login demo: <b>admin</b> / <b>admin</b>.
          </div>
        </div>
      )}
    </div>
  );
}
