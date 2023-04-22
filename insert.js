import db from "./db/db.js";

const { main } = db;

async function insert() {
  // seeders here
  const data = [
    {
      moduleId: 1,
      lessons: [
        "What is JavaScript?",
        "Brief history of JavaScript",
        "Applications of JavaScript",
        "Setting up a development environment",
        "Basic syntax and structure of JavaScript programs",
      ],
    },
    {
      moduleId: 2,
      lessons: [
        "Declaring variables in JavaScript",
        "Variable scope",
        "Data types in JavaScript",
        "Converting between data types",
        "Working with variables and data types in practice",
      ],
    },

    {
      moduleId: 3,
      lessons: [
        "Arithmetic operators (+, -, *, /, %)",
        "Comparison operators (==, ===, !=, !==, <, >, <=, >=)",
        "Logical operators (&&, ||, !)",
        "Expressions and statements",
        "Precedence and associativity of operators",
      ],
    },

    {
      moduleId: 4,
      lessons: [
        "The if/else statement",
        "The switch statement",
        "Combining multiple conditions",
        "Ternary operator (conditional operator)",
      ],
    },

    {
      moduleId: 5,
      lessons: [
        "The for loop",
        "The while loop",
        "The do/while loop",
        "Loop control statements (break and continue)",
        "Nested loops",
      ],
    },
    {
      moduleId: 6,
      lessons: [
        "Declaring and invoking functions",
        "Parameters and arguments",
        "Return values",
        "Function scope",
        "Anonymous functions and function expressions",
      ],
    },

    {
      moduleId: 7,
      lessons: [
        "Creating and initializing arrays",
        "Accessing array elements",
        "Adding and removing elements from arrays",
        "Looping through arrays",
        "Array methods (push, pop, shift, unshift, slice, splice)",
      ],
    },

    {
      moduleId: 8,
      lessons: [
        "Creating objects in JavaScript",
        "Object properties and methods",
        "Accessing and modifying object properties",
        "Object constructors",
        "Prototypes and inheritance",
      ],
    },

    {
      moduleId: 9,
      lessons: [
        "What is the Document Object Model (DOM)?",
        "Accessing DOM elements using JavaScript",
        "Modifying DOM elements using JavaScript",
        "Responding to user events (click, hover, submit, etc.)",
        "Creating and removing DOM elements using JavaScript",
      ],
    },

    {
      moduleId: 10,
      lessons: [
        "What is NodeJS?",
        "Brief history of NodeJS",
        "Advantages of using NodeJS",
        "Setting up a development environment",
        "Basic syntax and structure of NodeJS programs",
      ],
    },

    {
      moduleId: 11,
      lessons: [
        "What are NodeJS modules?",
        "Core modules in NodeJS",
        "Creating custom modules",
        "Exporting and importing modules",
        "Using third-party modules",
      ],
    },

    {
      moduleId: 12,
      lessons: [
        "Understanding synchronous vs asynchronous code",
        "Callback functions",
        "Promises and async/await",
        "Error handling in asynchronous code",
        "Event emitters and listeners",
      ],
    },

    {
      moduleId: 13,
      lessons: [
        "Reading and writing files in NodeJS",
        "Working with directories",
        "File streams and buffers",
        "Error handling with the file system",
      ],
    },

    {
      moduleId: 14,
      lessons: [
        "Creating a simple HTTP server",
        "Handling HTTP requests and responses",
        "Parsing request data",
        "Serving static files",
        "Using NodeJS with popular web frameworks (Express, Koa, etc.)",
      ],
    },

    {
      moduleId: 15,
      lessons: [
        "Overview of databases supported by NodeJS (MySQL, MongoDB, etc.)",
        "Connecting to a database with NodeJS",
        "Executing queries and retrieving data",
        "Creating and modifying data",
        "Error handling and security concerns with databases",
      ],
    },

    {
      moduleId: 16,
      lessons: [
        "Debugging NodeJS applications with the built-in debugger and external tools",
        "Writing unit tests for NodeJS code",
        "Using test frameworks (Mocha, Jasmine, etc.)",
        "Integration testing with NodeJS",
        "Measuring code coverage and identifying performance issues",
      ],
    },

    {
      moduleId: 17,
      lessons: [
        "Options for deploying NodeJS applications",
        "Deploying to cloud providers (AWS, Heroku, etc.)",
        "Containerization with Docker",
        "Monitoring and scaling NodeJS applications",
        "Best practices for deploying NodeJS applications",
      ],
    },
  ];

  const insertData = [];

  data.forEach((da) => {
    da.lessons.forEach((dl) => {
      insertData.push({
        courseModuleId: da.moduleId,
        title: dl,
      });
    });
  });

  const create = await main.courseLesson.createMany({
    data: insertData,
  });

  console.log(create);
}
insert()
  .then(async () => {
    await main.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await main.$disconnect();
    process.exit(1);
  });
