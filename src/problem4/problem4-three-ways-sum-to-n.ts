/**
 * Approach A - Iterative loop
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
export function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Approach B - Using arithmetic formula: n * (n + 1) / 2
 * Time complexity: O(1)
 * Space complexity: O(1)
 */
export function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}

/**
 * Approach C - Using recursion
 * Time complexity: O(n)
 * Space complexity: O(n) due to call stack
 */
export function sum_to_n_c(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
}

if (require.main === module) {
    const n = 5;
    console.log("sum_to_n_a:", sum_to_n_a(n)); // 15
    console.log("sum_to_n_b:", sum_to_n_b(n)); // 15
    console.log("sum_to_n_c:", sum_to_n_c(n)); // 15
}
