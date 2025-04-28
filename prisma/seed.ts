// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      id: "cma10d4n30000v2l0lzed0ka6",
      name: "Electronics",
      description: 'Latest electronic gadgets and devices.',
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745837704/electronics_lcst04.jpg'],
    },
    {
      id: "cma10d4st0001v2l0qo04ha6q",
      name: 'Clothing',
      description: 'Trendy apparel for men, women, and kids.',
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745837803/clothing_hyse1h.jpg'],
    },
    {
      id: "cma10d4vm0002v2l0pvac3uzt",
      name: 'Home Appliances',
      description: 'Essential appliances for modern homes.',
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745837882/daniel-norris-ZN_86cZrSN0-unsplash_ryzf8k.jpg'],
    },
    {
      id: "cma10d4yh0003v2l0uc185qgm",
      name: 'Books',
      description: 'Wide selection of books and novels.',
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838073/books_k0khwo.jpg'],
    },
    {
      id: "cma10d51a0004v2l0uay6br2f",
      name: 'Sports Equipment',
      description: 'Gear and equipment for all sports lovers.',
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838259/sports_equipment_ecmcno.jpg'],
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  const products = [
    {
      name: 'iPhone 14 Pro',
      categoryName: 'Electronics',
      description: 'Latest Apple smartphone with A16 Bionic chip.',
      price: 199.99,
      stock: 50,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745837764/mobile_bkd8pr.jpg'],
    },
    {
      name: 'Samsung Galaxy S23',
      categoryName: 'Electronics',
      description: 'Premium Android smartphone with amazing camera.',
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745837764/mobile_bkd8pr.jpg'],
    },
    {
      name: 'Sony WH-1000XM5 Headphones',
      categoryName: 'Electronics',
      description: 'Industry-leading noise cancellation headphones.',
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838343/headphones_ndwact.jpg'],
    },
    {
      name: 'MacBook Air M2',
      categoryName: 'Electronics',
      description: 'Lightweight laptop with ultra-fast M2 chip.',
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838395/laptop_rkrj23.jpg'],
    },
    {
      name: 'Classic Denim Jacket',
      categoryName: 'Clothing',
      description: 'Stylish denim jacket for casual wear.',
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838474/kemal-alkan-_BDBEP0ePQc-unsplash_qao97o.jpg'],
    },
    {
      name: 'Summer Floral Dress',
      categoryName: 'Clothing',
      description: 'Elegant summer dress with floral patterns.',
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838581/floral_dress_brlhlf.jpg'],
    },
    {
      name: "Men's Running Shoes",
      categoryName: 'Clothing',
      description: 'Lightweight running shoes with breathable material.',
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838647/running_shoes_c0jree.jpg'],
    },
    {
      name: 'Leather Handbag',
      categoryName: 'Clothing',
      description: "Premium quality women's leather handbag.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838704/leather_handbag_ocsucs.jpg'],
    },
    {
      name: 'Dyson V11 Vacuum Cleaner',
      categoryName: 'Home Appliances',
      description: "Powerful cordless vacuum cleaner.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838793/vacuum_cleaner_uerjsg.jpg'],
    },
    {
      name: 'Instant Pot Pressure Cooker',
      categoryName: 'Home Appliances',
      description: "All-in-one pressure cooker for easy meals.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838840/mche-lee-UFs77dHcxQc-unsplash_ycndbm.jpg'],
    },
    {
      name: 'LG Smart Refrigerator',
      categoryName: 'Home Appliances',
      description: "Wi-Fi connected double-door refrigerator.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838021/refrigerator_f1s8tu.jpg'],
    },
    {
      name: 'Samsung 55" 4K Smart TV',
      categoryName: 'Home Appliances',
      description: "Stunning 4K UHD TV with smart features.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838919/smart_tv_agwdrf.jpg'],
    },
    {
      name: 'Atomic Habits',
      categoryName: 'Books',
      description: "Bestselling guide to building good habits.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838996/atomic_habits_rptn2w.jpg'],
    },
    {
      name: 'The Alchemist',
      categoryName: 'Books',
      description: "A journey of dreams and discovery.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838996/atomic_habits_rptn2w.jpg'],
    },
    {
      name: 'Sapiens: A Brief History of Humankind',
      categoryName: 'Books',
      description: "Exploration of human evolution.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838996/atomic_habits_rptn2w.jpg'],
    },
    {
      name: 'The Psychology of Money',
      categoryName: 'Books',
      description: "Timeless lessons on wealth and happiness.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745838996/atomic_habits_rptn2w.jpg'],
    },
    {
      name: 'Wilson Tennis Racket',
      categoryName: 'Sports Equipment',
      description: "Lightweight and durable tennis racket.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745839214/tennis_racket_bwubyh.jpg'],
    },
    {
      name: 'Adidas Football',
      categoryName: 'Sports Equipment',
      description: "Premium match-quality football.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745839294/vikram-tkv-JO19K0HDDXI-unsplash_zsydcm.jpg'],
    },
    {
      name: 'Yoga Mat',
      categoryName: 'Sports Equipment',
      description: "Non-slip eco-friendly yoga mat.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745839350/yoga_mat_lf4b9z.jpg'],
    },
    {
      name: 'Dumbbell Set',
      categoryName: 'Sports Equipment',
      description: "Adjustable dumbbells for strength training.",
      price: 59.99,
      stock: 100,
      imageUrls: ['https://res.cloudinary.com/dchafbx9p/image/upload/v1745839435/dumbbell_set_rqhc1q.jpg'],
    },
  ];

  for (const product of products) {
    const matchingCategory = categories.find(cat => cat.name === product.categoryName);
    
    if (!matchingCategory) {
      console.error(`Category ${product.categoryName} not found!`);
      continue;
    }
  
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrls: product.imageUrls,
        category: {
          connect: {
            id: matchingCategory.id
          }
        }
      }
    });
  }

  
}

main()
  .then(() => console.log('Database seeded'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
