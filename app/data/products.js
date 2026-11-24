// GANTI DENGAN NOMOR WHATSAPP TOKO
export const WHATSAPP_NUMBER = "6281234567890";

export const STORE_KEY = "pawco_products_v1";
export const AUTH_KEY = "pawco_admin_session";
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "admin";

export const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600";

export const CATEGORIES = ["Makanan", "Vitamin", "Aksesoris", "Perlengkapan"];

export const CATEGORY_ICONS = {
  Makanan: "🥣",
  Vitamin: "🧴",
  Aksesoris: "🎀",
  Perlengkapan: "🧸",
};

export const DEFAULT_PRODUCTS = [
  { id: 1, name: "Premium Cat Food", category: "Makanan", price: 85000, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600" },
  { id: 2, name: "Dog Food Adult", category: "Makanan", price: 110000, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600" },
  { id: 3, name: "Pet Multivitamin", category: "Vitamin", price: 55000, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" },
  { id: 4, name: "Pet Shampoo", category: "Perlengkapan", price: 42000, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600" },
  { id: 5, name: "Cute Pet Collar", category: "Aksesoris", price: 35000, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600" },
  { id: 6, name: "Interactive Pet Toy", category: "Perlengkapan", price: 29000, image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=600" },
  { id: 7, name: "Pet Carrier Bag", category: "Aksesoris", price: 145000, image: "https://images.unsplash.com/photo-1601758123927-196b4f6b1b5b?w=600" },
  { id: 8, name: "Cat Treats", category: "Makanan", price: 25000, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600" },
  { id: 9, name: "Whiskas Tuna 1.2kg", category: "Makanan", price: 95000, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600" },
  { id: 10, name: "Royal Canin Kitten", category: "Makanan", price: 135000, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600" },
  { id: 11, name: "Me-O Creamy Treats", category: "Makanan", price: 18000, image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600" },
  { id: 12, name: "Pedigree Dog Food", category: "Makanan", price: 89000, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600" },
  { id: 13, name: "Salmon Cat Treats", category: "Makanan", price: 32000, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600" },
  { id: 14, name: "Pet Calcium Supplement", category: "Vitamin", price: 65000, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" },
  { id: 15, name: "Vitamin B Complex", category: "Vitamin", price: 45000, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" },
  { id: 16, name: "Omega 3 Pet Oil", category: "Vitamin", price: 78000, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" },
  { id: 17, name: "Pet Immune Booster", category: "Vitamin", price: 58000, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" },
  { id: 18, name: "Cute Ribbon Collar", category: "Aksesoris", price: 28000, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600" },
  { id: 19, name: "Pet Fashion Shirt", category: "Aksesoris", price: 55000, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600" },
  { id: 20, name: "Pet Walking Leash", category: "Aksesoris", price: 42000, image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=600" },
  { id: 21, name: "Pet Bow Tie", category: "Aksesoris", price: 22000, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600" },
  { id: 22, name: "Pet Travel Backpack", category: "Aksesoris", price: 175000, image: "https://images.unsplash.com/photo-1601758123927-196b4f6b1b5b?w=600" },
  { id: 23, name: "Cat Litter Sand", category: "Perlengkapan", price: 38000, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600" },
  { id: 24, name: "Pet Food Bowl", category: "Perlengkapan", price: 25000, image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600" },
  { id: 25, name: "Cat Scratching Board", category: "Perlengkapan", price: 65000, image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600" },
  { id: 26, name: "Pet Sleeping Bed", category: "Perlengkapan", price: 120000, image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600" },
  { id: 27, name: "Pet Hair Brush", category: "Perlengkapan", price: 30000, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600" },
  { id: 28, name: "Cat Tunnel Toy", category: "Perlengkapan", price: 75000, image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600" },
  { id: 29, name: "Pet Nail Clipper", category: "Perlengkapan", price: 27000, image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600" },
  { id: 30, name: "Pet Water Bottle", category: "Perlengkapan", price: 35000, image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600" },
  { id: 31, name: "Pet Carrier Box", category: "Aksesoris", price: 155000, image: "https://images.unsplash.com/photo-1601758123927-196b4f6b1b5b?w=600" },
  { id: 32, name: "Pet Dental Care", category: "Perlengkapan", price: 40000, image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600" },
];

// Format rupiah yang sama persis di server dan browser (hindari hydration mismatch).
export function rupiah(value) {
  const number = Math.round(Number(value) || 0);
  return "Rp" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
