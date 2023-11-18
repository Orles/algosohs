export function getFibonacciNumbers(n: number): number[] {
  const sequence: number[] = [];

  if (n <= 0) {
    return sequence;
  }

  sequence.push(1);

  if (n === 1) {
    return sequence;
  }

  sequence.push(1);

  for (let i = 2; i < n; i++) {
    const nextNumber = sequence[i - 1] + sequence[i - 2];
    sequence.push(nextNumber);
  }

  return sequence;
  }