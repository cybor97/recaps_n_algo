const TEST_CASES = require("./testcases/fibonacci");

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

    const result = calculate(n - 2) + calculate(n - 1);
    memo[n] = result;
    return result;
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
  if (fn === runRecursive && n > 45) {
    return null;
  }
  n = parseInt(n, 10);
  return fn(n) === TEST_CASES[n];
}

module.exports = {
  name: "Fibonacci",
  algos: { runRecursive, runRecursiveMemo, runLoop },
  test,
  testCases: TEST_CASES,
};
