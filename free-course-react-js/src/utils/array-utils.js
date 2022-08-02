export const getRandomItem = (arr, size) => {
  const max = arr.length;
  const randomIndex = Math.floor(Math.random() * max);
  return arr[randomIndex];
};

export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
