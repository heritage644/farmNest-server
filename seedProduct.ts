import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./src/models/productsSchema.js";
import axios from "axios";
import { url } from "inspector/promises";
dotenv.config();




const getImage = (name: string) => {
  return `https://picsum.photos/seed/${encodeURIComponent(name)}/400/400`;
};

const products = [
  {
    name: "Red Apple",
    price: 2.5,
    description: "Fresh and juicy red apples",
    category: "fruits",
    image: getImage("Red Apple"),
    stock: 120,
    rating: 4.6
  },
  {
    name: "Green Apple",
    price: 2.3,
    description: "Crisp and slightly tart green apples",
    category: "fruits",
    image: getImage("Green Apple"),
    stock: 100,
    rating: 4.5
  },
  {
    name: "Banana",
    price: 1.2,
    description: "Sweet ripe bananas",
    category: "fruits",
    image: getImage("Banana"),
    stock: 200,
    rating: 4.7
  },
  {
    name: "Orange",
    price: 1.8,
    description: "Fresh juicy oranges",
    category: "fruits",
    image: getImage("Orange"),
    stock: 180,
    rating: 4.6
  },
  {
    name: "Strawberry Pack",
    price: 4.5,
    description: "Sweet strawberries packed fresh",
    category: "fruits",
    image: getImage("Strawberry"),
    stock: 75,
    rating: 4.8
  },
  {
    name: "Mango",
    price: 2.8,
    description: "Delicious ripe mango",
    category: "fruits",
    image: getImage("Mango"),
    stock: 150,
    rating: 4.9
  },
  {
    name: "Pineapple",
    price: 3.5,
    description: "Sweet tropical pineapple",
    category: "fruits",
    image: getImage("Pineapple"),
    stock: 90,
    rating: 4.6
  },
  {
    name: "Watermelon",
    price: 7.0,
    description: "Large juicy watermelon",
    category: "fruits",
    image: getImage("Watermelon"),
    stock: 40,
    rating: 4.7
  },
  {
    name: "Papaya",
    price: 3.2,
    description: "Soft and sweet papaya",
    category: "Featured",
    image: getImage("Papaya"),
    stock: 80,
    rating: 4.5
  },
  {
    name: "Grapes (Red)",
    price: 3.9,
    description: "Sweet seedless red grapes",
    category: "Featured",
    image: getImage("Red Grapes"),
    stock: 85,
    rating: 4.7
  },

  // 🔥 auto-generated products (still works perfectly)
  ...Array.from({ length: 100 }).map((_, i) => ({
    name: `Fresh Fruit Mix ${i + 1}`,
    price: Number((Math.random() * 5 + 1).toFixed(2)),
    description: "Assorted fresh seasonal fruits",
    category: "fruits",
    image: getImage("mixed fruits"),
    stock: Math.floor(Math.random() * 150) + 20,
    rating: Number((Math.random() * 1 + 4).toFixed(1))
  }))
];


const getStableImage = async (name: string) => {
  const url = getImage(name);

  try {
    const response = await axios.get(url, {
      maxRedirects: 5,
      validateStatus: (status) => status >= 200 && status < 400
    });

    return response.request.res.responseUrl || url;     // ✅ real fixed image
  } catch (err) {
    console.log(`⚠️ Failed for ${name}, using fallback`);
    return "https://via.placeholder.com/400?text=Fruit";
  }
};

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany();

    const productsWithImages = [];

    for (const product of products) {
      const image = await getStableImage(product.name);

      productsWithImages.push({
        ...product,
       Image: image,
       Category: product.category.toLowerCase() || "fruits"
      });

      console.log(`✔ Image cached for: ${product.name}`);
    }

    await Product.insertMany(productsWithImages);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();