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
      description:
        "This course is designed for beginners who are new to programming or new to JavaScript. It covers the basics of JavaScript programming, including variables, data types, operators, conditional statements, and loops. Students will learn how to write and execute simple JavaScript programs, and gain an understanding of the foundational concepts that underpin the language.",
      courseTechnologies: {
        create: {
          tech: "javascript",
          img: "https://storage.googleapis.com/proglabs-bucket/course-technologies/js-logo.svg",
        },
      },
      courseModules: {
        createMany: {
          data: [
            {
              title: "Introduction to JavaScript",
            },
            {
              title: "Variables and Data Types",
            },
            {
              title: "Operators and Expressions",
            },
            {
              title: "Conditional Statements",
            },
            {
              title: "Loops",
            },
          ],
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
      description:
        "This course is intended for developers who already have a solid grasp of the basics of JavaScript and want to deepen their understanding of the language. It covers more advanced topics such as functions, arrays, objects, and the Document Object Model (DOM). Students will gain a deeper understanding of how JavaScript works, and learn how to write more efficient, maintainable, and scalable code.",
      courseTechnologies: {
        create: {
          tech: "javascript",
          img: "https://storage.googleapis.com/proglabs-bucket/course-technologies/js-logo.svg",
        },
      },
      courseModules: {
        createMany: {
          data: [
            {
              title: "Functions",
            },
            {
              title: "Arrays",
            },
            {
              title: "Objects",
            },
            {
              title: "DOM Manipulation",
            },
          ],
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
      description:
        "This course is designed for developers who want to use JavaScript on the server-side with NodeJS. It covers the basics of NodeJS programming, including modules, asynchronous programming, working with the file system, HTTP, databases, debugging and testing, and deploying NodeJS applications. Students will gain an understanding of how to build scalable and robust server-side applications using JavaScript with NodeJS.",
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
      courseModules: {
        createMany: {
          data: [
            {
              title: "Introduction to NodeJS",
            },
            {
              title: "NodeJS Modules",
            },
            {
              title: "Asynchronous Programming",
            },
            {
              title: "Working with the File System",
            },
            {
              title: "NodeJS and HTTP",
            },
            {
              title: "NodeJS and Databases",
            },
            {
              title: "Debugging and Testing",
            },
            {
              title: "Deploying NodeJS Applications",
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
