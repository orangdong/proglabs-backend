import db from "../db.js";

const { main } = db;

async function mainSeed() {
  // seeders here
  await main.course.createMany({
    data: [
      {
        title: "Starter Course: Basic Javascript",
        thumbnail: "https://localhost:3000/assets/course-thumbnail.png",
        isPremium: false,
      },
      {
        title: "Advanced Javascript",
        thumbnail: "https://localhost:3000/assets/course-thumbnail.png",
        isPremium: true,
      },
      {
        title: "Getting Started With NodeJS",
        thumbnail: "https://localhost:3000/assets/course-thumbnail.png",
        isPremium: true,
      },
    ],
  });
}
mainSeed()
  .then(async () => {
    await main.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await main.$disconnect();
    process.exit(1);
  });
