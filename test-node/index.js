// index.js
import { createInterface } from "readline";
import leven from "leven";

// Sample data - stored perfectly, no typos here
const videoData = [
  {
    id: 1,
    youtubeLink: "https://www.youtube.com/watch?v=video1",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Andhera Ujhala",
    year: 1995,
    actor: "Ali Raza",
    producer: "Saira Bano",
    director: "Kamal Ahmed",
    writer: "Fatima Jinnah",
  },
  {
    id: 2,
    youtubeLink: "https://www.youtube.com/watch?v=video2",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Dil-e-Dastaan",
    year: 1998,
    actor: "Ahmed Ali",
    producer: "Shazia Khalid",
    director: "Waleed Malik",
    writer: "Rizwan Ahmed",
  },
  {
    id: 3,
    youtubeLink: "https://www.youtube.com/watch?v=video3",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Rang Mahal",
    year: 2001,
    actor: "Hina Khan",
    producer: "Saima Noor",
    director: "Shoaib Mansoor",
    writer: "Sadia Sheikh",
  },
  {
    id: 4,
    youtubeLink: "https://www.youtube.com/watch?v=video4",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Zindagi Gulzar Hai",
    year: 2012,
    actor: "Fawad Khan",
    producer: "Momina Duraid",
    director: "Sohail Khan",
    writer: "Umera Ahmed",
  },
  {
    id: 5,
    youtubeLink: "https://www.youtube.com/watch?v=video5",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Udaari",
    year: 2016,
    actor: "Urwa Hocane",
    producer: "Shahid Productions",
    director: "Mehreen Jabbar",
    writer: "Bilal Ashraf",
  },
  {
    id: 6,
    youtubeLink: "https://www.youtube.com/watch?v=video6",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Humsafar",
    year: 2011,
    actor: "Mahira Khan",
    producer: "Momina Duraid",
    director: "Shoaib Mansoor",
    writer: "Farhat Ishtiaq",
  },
  {
    id: 7,
    youtubeLink: "https://www.youtube.com/watch?v=video7",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Shehr-e-Zaat",
    year: 2012,
    actor: "Mahira Khan",
    producer: "Momina Duraid",
    director: "Shoaib Mansoor",
    writer: "Umera Ahmed",
  },
  {
    id: 8,
    youtubeLink: "https://www.youtube.com/watch?v=video8",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Zara Yaad Kar",
    year: 1999,
    actor: "Moammar Rana",
    producer: "Saira Durrani",
    director: "Anwar Maqsood",
    writer: "Imran Nazir",
  },
  {
    id: 9,
    youtubeLink: "https://www.youtube.com/watch?v=video9",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Aangan Terha",
    year: 1984,
    actor: "Bushra Ansari",
    producer: "Satish Anand",
    director: "Faisal Qureshi",
    writer: "Anwar Maqsood",
  },
  {
    id: 10,
    youtubeLink: "https://www.youtube.com/watch?v=video10",
    thumbnail: "https://via.placeholder.com/150",
    dramaName: "Dastaan",
    year: 2010,
    actor: "Sanam Baloch",
    producer: "Hum TV",
    director: "Babar Javed",
    writer: "Noor ul Huda Shah",
  },
];

// Define a threshold for acceptable typo differences
const threshold = 3;

// Search function utilizing Levenshtein distance for the drama name
function searchVideos(query) {
  const lowerQuery = query.toLowerCase().trim();
  return videoData.filter((video) => {
    const storedDrama = video.dramaName.toLowerCase();
    // Calculate edit distance between query and stored drama name
    const distance = leven(lowerQuery, storedDrama);
    // Accept if the distance is within threshold OR the query is a substring (added bonus!)
    return distance <= threshold || storedDrama.includes(lowerQuery);
  });
}

// Set up the readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the Video Search Console!");
console.log(
  "Enter a drama name (or part of it) to search. Type 'exit' to quit."
);

// Prompt the user
rl.prompt();

rl.on("line", (input) => {
  const query = input.trim();
  if (query.toLowerCase() === "exit") {
    console.log("Goodbye!");
    rl.close();
  } else {
    const results = searchVideos(query);
    if (results.length > 0) {
      console.log(`Found ${results.length} result(s):`);
      results.forEach((video) => {
        console.log(`\nID: ${video.id}`);
        console.log(`Drama Name: ${video.dramaName}`);
        console.log(`Year: ${video.year}`);
        console.log(`Actor: ${video.actor}`);
        console.log(`Director: ${video.director}`);
        console.log(`YouTube Link: ${video.youtubeLink}`);
      });
    } else {
      console.log("No results found.");
    }
    rl.prompt();
  }
}).on("close", () => {
  process.exit(0);
});
