function runRecursive(n) {
  if (!n || n <= 1n) {
    return n;
  }

  return runRecursive(n - 2n) + runRecursive(n - 1n);
}

function runRecursiveMemo(n) {
  const memo = {};
  function calculate(n) {
    if (!n || n <= 1n) {
      return n;
    }

    if (memo[n]) {
      return memo[n];
    }

    const result = calculate(n - 2n) + calculate(n - 1n);
    memo[n] = result;
    return result;
  }

  return calculate(n);
}

function runLoop(n) {
  if (n <= 1n) {
    return n;
  }
  let number = 0n;
  let prev1 = 0n;
  let prev2 = 1n;
  for (let i = 1n; i < n; i++) {
    number = prev1 + prev2;
    prev1 = prev2;
    prev2 = number;
  }
  return number;
}

function test(fn, testCases, n) {
  if (fn === runRecursive && n > 45n) {
    return null;
  }
  if (fn === runRecursiveMemo && n > 10000n) {
    return null;
  }
  n = BigInt(n);
  return fn(n) === testCases[n];
}

function getTestCases(n) {
  const result = {};
  for (let i = 0n; i < n; i++) {
    result[i] = runLoop(i);
  }
  return result;
}

const maxTestCases = 50000n;

module.exports = {
  name: "Fibonacci",
  algos: { runRecursive, runRecursiveMemo, runLoop },
  test,
  maxTestCases,
  getTestCases,
};
