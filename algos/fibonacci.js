function runRecursive(n) {
  if (!n || n <= 1) {
    return n;
  }

  return runRecursive(n - 2) + runRecursive(n - 1);
}

function runRecursiveMemo(n) {
  const memo = {};
  function calculate(n) {
    if (!n || n <= 1) {
      return n;
    }

    if (memo[n]) {
      return memo[n];
    }

    return calculate(n - 2) + calculate(n - 1);
  }

  return calculate(n);
}

function runLoop(n) {
  if (n <= 1) {
    return n;
  }
  let number = 0;
  let prev1 = 0;
  let prev2 = 1;
  for (let i = 1; i < n; i++) {
    number = prev1 + prev2;
    prev1 = prev2;
    prev2 = number;
  }
  return number;
}

function test(fn, n) {
  const seq = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
    2584, 4181,
  ];
  return fn(n) === seq[n];
}

export default {
  algo: [runRecursive, runRecursiveMemo, runLoop],
  test,
};
