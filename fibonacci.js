const { performance } = require('perf_hooks');


function fibs(n) {
  const arr = [0, 1]

  if (n <= 2) {
    return arr.slice(0, n);
  }

  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }

  return arr;
}

function fibsRec(n) {
  const arr = [0, 1];

  if (n <= 2) {
    return arr.slice(0, n);
  }

  const prev = fibsRec(n - 1);
  prev.push(prev.at(-1) + prev.at(-2));
  return prev;
}

function fibsTailRec(n, res = [0, 1], i = 3) {
  if (n <= 2) {
    return res.slice(0, n);
  }

  res.push(res.at(-1) + res.at(-2));

  if (n === i) {
    return res
  }

  return fibsTailRec(n, res, i + 1);
};


/** Benchmark (basic) */

console.dir(
  Array.from({ length: 10 }, (_, i) => {
    const cube = i ** 3;

    return (
      {
        input: cube,
        outputs: {
          iterative: profile(() => fibs(cube)),
          recursive: profile(() => fibsRec(cube)),
          tailRec: profile(() => fibsTailRec(cube)),
        }
      }
    );
  }),
  { depth: null }
);

function profile(func) {
  const before = performance.now();
  const result = func();
  const after = performance.now();

  return { result, execTime: after - before }
}
