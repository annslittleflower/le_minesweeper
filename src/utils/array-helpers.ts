export const arrayFromNumber = (n: number) => Array.from(Array(n), (_, i) => i+1)

export const shuffle = (array: string[] | number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
