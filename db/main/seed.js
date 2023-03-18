import db from "../db.js";

const { main } = db;

async function mainSeed() {
  // seeders here
  const course1 = await main.course.create({
    data: {
      title: "Starter Course: Basic Javascript",
      thumbnail:
        "https://storage.googleapis.com/proglabs-bucket/course-thumbnail/course-thumbnail1.png",
      isPremium: false,
      courseTechnologies: {
        create: {
          tech: "javascript",
          img: "https://storage.googleapis.com/proglabs-bucket/course-technologies/js-logo.svg",
        },
      },
    },
  });

  const course2 = await main.course.create({
    data: {
      title: "Advanced Javascript",
      thumbnail:
        "https://storage.googleapis.com/proglabs-bucket/course-thumbnail/course-thumbnail1.png",
      isPremium: true,
      courseTechnologies: {
        create: {
          tech: "javascript",
          img: "https://storage.googleapis.com/proglabs-bucket/course-technologies/js-logo.svg",
        },
      },
    },
  });

  const course3 = await main.course.create({
    data: {
      title: "Getting Started With NodeJS",
      thumbnail:
        "https://storage.googleapis.com/proglabs-bucket/course-thumbnail/course-thumbnail1.png",
      isPremium: true,
      courseTechnologies: {
        createMany: {
          data: [
            {
              tech: "javascript",
              img: "https://storage.googleapis.com/proglabs-bucket/course-technologies/js-logo.svg",
            },
            {
              tech: "nodejs",
              img: "https://storage.googleapis.com/proglabs-bucket/course-technologies/node-logo.svg",
            },
          ],
        },
      },
    },
  });

  console.log(course1, course2, course3);
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
