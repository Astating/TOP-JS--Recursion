function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2);
  const first = mergeSort(arr.slice(0, mid));
  const second = mergeSort(arr.slice(mid));

  const sorted = []

  while (first.length !== 0 && second.length !== 0) {
    if (first[0] < second[0]) {
      sorted.push(first.shift())
    } else {
      sorted.push(second.shift())
    }
  }

  sorted.push(...first, ...second);

  return sorted;
}

console.log(
  [
    [3, 2, 1, 13, 8, 5, 0, 1],
    [105, 79, 100, 110]
  ].map(arr => ({ input: arr, output: mergeSort(arr) }))
);
