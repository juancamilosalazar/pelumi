import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { Product, ProductInput } from "./types";
import { slugify } from "./slug";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");
// Fuera de /public a propósito: en producción, Next.js sirve /public desde un
// manifiesto generado en build time y no ve archivos agregados después en runtime.
// Estas imágenes se sirven en runtime vía src/app/uploads/[...path]/route.ts
const UPLOADS_DIR = path.join(process.cwd(), "uploads", "products");
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Cola simple en memoria para serializar escrituras y evitar corromper el JSON
// si dos peticiones de administración llegan casi al mismo tiempo.
let writeQueue: Promise<unknown> = Promise.resolve();
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(task, task);
  writeQueue = run.catch(() => undefined);
  return run;
}

async function ensureDataFile() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]\n", "utf-8");
  }
}

async function readAll(): Promise<Product[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Product[];
    // Normaliza productos guardados antes de que existieran estos campos
    return parsed.map((p) => ({
      ...p,
      reference: p.reference ?? "",
      stock: p.stock ?? "available",
    }));
  } catch {
    return [];
  }
}

async function writeAll(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf-8");
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await readAll();
  return products.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.favorite).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await readAll();
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await readAll();
  return products.find((p) => p.id === id);
}

function uniqueSlug(base: string, existing: Product[], ignoreId?: string): string {
  const safeBase = base || "peluche";
  let candidate = safeBase;
  let n = 2;
  while (existing.some((p) => p.slug === candidate && p.id !== ignoreId)) {
    candidate = `${safeBase}-${n}`;
    n += 1;
  }
  return candidate;
}

async function saveImages(productId: string, files: File[]): Promise<string[]> {
  const validFiles = files.filter((f) => f && f.size > 0);
  if (validFiles.length === 0) return [];

  // Se valida todo antes de tocar el disco, para no dejar carpetas huérfanas
  // si alguna imagen no cumple el tipo o tamaño permitido.
  for (const file of validFiles) {
    if (!ALLOWED_TYPES[file.type]) {
      throw new Error(`Tipo de imagen no permitido: ${file.type || "desconocido"}`);
    }
    if (file.size > MAX_IMAGE_BYTES) {
      throw new Error(`La imagen "${file.name}" supera el tamaño máximo de 5MB`);
    }
  }

  const dir = path.join(UPLOADS_DIR, productId);
  await fs.mkdir(dir, { recursive: true });

  const saved: string[] = [];
  for (const file of validFiles) {
    const ext = ALLOWED_TYPES[file.type];
    const filename = `${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(dir, filename), buffer);
    saved.push(`/uploads/products/${productId}/${filename}`);
  }
  return saved;
}

async function deleteImageFile(imagePath: string): Promise<void> {
  if (!imagePath.startsWith("/uploads/products/")) return;
  const relative = imagePath.replace(/^\/uploads\/products\//, "");
  const filePath = path.join(UPLOADS_DIR, relative);
  try {
    await fs.unlink(filePath);
  } catch {
    // La imagen ya no existe en disco; no es un error fatal.
  }
}

export async function createProduct(
  input: ProductInput,
  imageFiles: File[]
): Promise<Product> {
  return enqueue(async () => {
    const products = await readAll();
    const id = randomUUID();
    const slug = uniqueSlug(slugify(input.name), products);
    const images = await saveImages(id, imageFiles);

    const now = new Date().toISOString();
    const product: Product = {
      id,
      slug,
      name: input.name.trim(),
      price: input.price,
      description: input.description.trim(),
      reference: input.reference?.trim() ?? "",
      stock: "available",
      images,
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };

    products.push(product);
    await writeAll(products);
    return product;
  });
}

export async function updateProduct(
  id: string,
  patch: Partial<ProductInput> & { favorite?: boolean; stock?: Product["stock"] },
  newImageFiles: File[] = []
): Promise<Product | undefined> {
  return enqueue(async () => {
    const products = await readAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const current = products[index];
    const addedImages = await saveImages(id, newImageFiles);

    const nextSlug =
      patch.name && patch.name.trim() !== current.name
        ? uniqueSlug(slugify(patch.name), products, id)
        : current.slug;

    const updated: Product = {
      ...current,
      name: patch.name?.trim() ?? current.name,
      price: patch.price ?? current.price,
      description: patch.description?.trim() ?? current.description,
      reference: patch.reference?.trim() ?? current.reference,
      stock: patch.stock ?? current.stock,
      favorite: patch.favorite ?? current.favorite,
      slug: nextSlug,
      images: [...current.images, ...addedImages],
      updatedAt: new Date().toISOString(),
    };

    products[index] = updated;
    await writeAll(products);
    return updated;
  });
}

export async function removeProductImage(
  id: string,
  imagePath: string
): Promise<Product | undefined> {
  return enqueue(async () => {
    const products = await readAll();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const current = products[index];
    const updated: Product = {
      ...current,
      images: current.images.filter((img) => img !== imagePath),
      updatedAt: new Date().toISOString(),
    };
    products[index] = updated;
    await writeAll(products);
    await deleteImageFile(imagePath);
    return updated;
  });
}

export async function deleteProduct(id: string): Promise<void> {
  return enqueue(async () => {
    const products = await readAll();
    const product = products.find((p) => p.id === id);
    if (!product) return;

    await writeAll(products.filter((p) => p.id !== id));

    for (const img of product.images) {
      await deleteImageFile(img);
    }
    const dir = path.join(UPLOADS_DIR, id);
    await fs.rm(dir, { recursive: true, force: true });
  });
}
