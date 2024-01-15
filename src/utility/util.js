export function getRandomElements(arr, numElements = 15) {
  // Shuffle the array
  const shuffledArray = arr.sort(() => Math.random() - 0.5);

  // Take the first 'numElements' elements
  const selectedElements = shuffledArray.slice(0, numElements);

  return selectedElements;
}
const levelRanges = [
  { min: 0, max: 300, name: "Beginner" },
  { min: 301, max: 500, name: "Intermediate" },
  { min: 501, max: 800, name: "Advanced" },
  { min: 801, max: 1000, name: "Pro" },
  { min: 1001, max: Infinity, name: "Legend" },
];

export const getLevelInfo = (points) => {
  const levelObj =
    levelRanges.find(({ min, max }) => points >= min && points <= max) || {};
  const nextLevelPoints = levelObj.max ? levelObj.max + 1 - points : null;
  return { level: levelObj.name || "Invalid", nextLevelPoints };
};
