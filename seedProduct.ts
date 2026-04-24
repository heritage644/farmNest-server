import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import Product from "./src/models/productsSchema.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY!;

// 🔥 Get image from Unsplash
const getImage = async (name: string) => {
  const query = encodeURIComponent(name);

  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${UNSPLASH_KEY}`;

  try {
    const response = await axios.get(url);
    return (
      response.data.results[0]?.urls?.regular ||
      "https://via.placeholder.com/400"
    );
  } catch (error) {
    console.error("Unsplash error:", error);
    return "https://via.placeholder.com/400";
  }
};

// 🔥 RAW PRODUCTS (NO async here)
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

  //  auto products
  ...Array.from({ length: 40 }).map((_, i) => ({
    name: `Fresh Fruit Mix ${i + 1}`,
    price: Number((Math.random() * 5 + 1).toFixed(2)),
    description: "Assorted fresh seasonal fruits",
    category: "fruits",
    stock: Math.floor(Math.random() * 150) + 20,
    rating: Number((Math.random() * 1 + 4).toFixed(1))
  }))
];

//  SEED FUNCTION
const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" Connected to MongoDB");

    await Product.deleteMany();

    const updatedProducts = [];

    for (const product of products) {
      const image = await getImage(product.name);

      updatedProducts.push({
        ...product,
        Image: image,
        Category: product.category

      });

      console.log(` Added image for ${product.name}`);
    }

    await Product.insertMany(updatedProducts);

    console.log(" Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(" Error:", error);
    process.exit(1);
  }
};

seedData();