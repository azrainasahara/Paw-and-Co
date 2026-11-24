"use client";

import { rupiah } from "../data/products";

export default function CartPanel({ open, onClose, lines, total, onRemove, onCheckout }) {
  return (
    <aside className={`cart-panel${open ? " open" : ""}`} aria-hidden={!open}>
      <button className="close" onClick={onClose} aria-label="Tutup keranjang">
        ✕
      </button>
      <h2>Keranjang Belanja 🛒</h2>
      <div>
        {lines.length ? (
          lines.map((line) => (
            <div className="cart-item" key={line.id}>
              <b>{line.product.name}</b>
              <p>
                {line.qty} x {rupiah(line.product.price)}
              </p>
              <button onClick={() => onRemove(line.id)}>Hapus</button>
            </div>
          ))
        ) : (
          <p className="cart-empty">Keranjang masih kosong.</p>
        )}
      </div>
      <hr />
      <h3 className="cart-total">
        Total: <span>{rupiah(total)}</span>
      </h3>
      <button className="btn btn-block" onClick={onCheckout}>
        Pesan via WhatsApp
      </button>
    </aside>
  );
}
