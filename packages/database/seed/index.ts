import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker/locale/id_ID";
import { nanoid } from "nanoid";
import rawProducts from "../data/products";

const prisma = new PrismaClient();

const rawCategories = [
  "Iphone",
  "Ipad",
  "Android",
  "Samsung",
  "Apple",
  "Huawei",
  "Xiaomi",
];

async function main() {
  // Seed Categories
  const categories = await Promise.all(
    rawCategories.map(async (name) => {
      const slug = faker.helpers.slugify(name.toLowerCase()) + "-" + nanoid(5);
      return prisma.category.create({
        data: {
          name,
          slug: slug.toLowerCase(),
        },
      });
    })
  );

  // Seed Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          password: faker.internet.password(),
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
          storeName: faker.company.name(),
        },
      })
    )
  );

  for (const p of rawProducts) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const productSlug = faker.helpers.slugify(
      faker.commerce.productName().toLowerCase()
    );

    const product = await prisma.product.create({
      data: {
        sku: faker.string.alphanumeric(12),
        slug: productSlug + "-" + nanoid(5),
        name: p.title,
        description: faker.commerce.productDescription(),
        price: p.price,
        imageUrl: p.primaryImage,
        stockQuantity: faker.number.int({ min: 0, max: 100 }),
        minumumOrderQuantity: faker.number.int({ min: 1, max: 10 }),
        userId: randomUser.id,
      },
    });

    await prisma.productImages.createMany({
      data: p.images.map((image) => ({
        productId: product.id,
        imageUrl: image,
      })),
    });

    const selectedCategories = faker.helpers.arrayElements(
      categories,
      faker.number.int({ min: 1, max: 2 })
    );

    for (const category of selectedCategories) {
      await prisma.productCategory.create({
        data: {
          productId: product.id,
          categoryId: category.id,
        },
      });
    }
  }

  console.log("🌱 Seeding selesai.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
