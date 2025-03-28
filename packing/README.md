# TypeScript Packing Algorithms

This module contains implementations of various packing algorithms in TypeScript with a unified testing framework. These
algorithms solve the fundamental problem of efficiently arranging objects within constrained spaces.

## What are Packing Algorithms?

Packing algorithms address optimization problems where items of different dimensions need to be placed efficiently
within containers. They have widespread applications:

- **Logistics**: Optimizing cargo in shipping containers
- **Manufacturing**: Minimizing material waste in cutting stock problems
- **Resource Allocation**: Efficiently allocating computational resources
- **Game Development**: Texture atlas generation and UI layouts

## Packing Algorithm Categories

The suite includes several categories of packing algorithms, each optimizing for different constraints:

### Bin Packing

Bin packing algorithms arrange items into the minimum number of fixed-size containers:

- **First Fit Bin**: Places each item in the first bin that can accommodate it
- **Best Fit Bin**: Places items in the bin that will leave the least empty space
- **Next Fit Bin**: Only considers the most recently used bin
- **Worst Fit Bin**: Places items in the bin with the most remaining space

**Best For**: Situations where you need to minimize the number of containers used.

### Knapsack Packing

Knapsack algorithms maximize the value of items packed into a capacity-constrained container:

- **0/1 Knapsack**: Classic dynamic programming approach for indivisible items
- **Fractional Knapsack**: Allows items to be divided for optimal value
- **Greedy Knapsack**: Approximate solution using value/weight ratio

**Best For**: Value optimization when container space is limited but items have different values.

### Rectangle Packing

Rectangle packing algorithms arrange rectangles in a 2D container to maximize space utilization:

- **Shelf Packing**: Organizes rectangles into horizontal shelves
- **Guillotine Packing**: Uses guillotine cuts to divide free spaces
- **Maximal Rectangles**: Tracks all maximal free rectangles for efficient packing
- **Skyline Packing**: Uses a skyline data structure to track free space profiles

**Best For**: Texture atlas generation, cutting stock problems, and UI layout optimization.

### Strip Packing

Strip packing algorithms pack rectangles into a strip of fixed width but unlimited height:

- **Next Fit Strip**: Places items in the current level or creates a new one
- **First Fit Strip**: Places items in the first level that fits
- **Best Fit Strip**: Places items to minimize wasted horizontal space

**Best For**: Minimizing the height of a fixed-width container, such as newspaper layout.

### Online Packing

Online packing algorithms handle items as they arrive sequentially:

- **Online First Fit**: Adapts First Fit for sequential arrival
- **Online Best Fit**: Adapts Best Fit for sequential arrival
- **Online Shelf**: Shelf-based packing for online scenarios
- **Online Skyline**: Skyline approach for complex online packing

**Best For**: Real-time packing where items arrive one by one with no knowledge of future items.

## Getting Started

### Installation

```bash
npm install
npm run build
```

### Running the Test Suite

```bash
npm run packing-test -- [options]
```

### Command-Line Options

- `-a, --algorithms <string>`: Algorithm name, comma-separated list, or category
- `-c, --count <number>`: Number of items to generate (default: 100)
- `-w, --width <number>`: Container width (default: 1000)
- `-h, --height <number>`: Container height (default: 1000)
- `--item-type <type>`: Type of items (uniform, varied, weighted, correlated, anticorrelated)
- `--max-item-width <number>`: Maximum item width (default: 200)
- `--max-item-height <number>`: Maximum item height (default: 200)
- `--seed <string>`: Random seed for reproducible data
- `-v, --verbose`: Show detailed information about packing

## Common Usage Scenarios

### 1. Comparing All Bin Packing Algorithms

```bash
npm run packing-test --algorithms bin --count 200
```

This tests all bin packing algorithms with 200 random items to see which produces the most efficient packing.

### 2. Testing Rectangle Packing with Uniform Items

```bash
npm run packing-test --algorithms rectangle --item-type uniform --count 150
```

This tests rectangular packing algorithms using uniformly sized items, which can highlight algorithm performance under
more predictable conditions.

### 3. Comparing Online vs. Offline Algorithms

```bash
npm run packing-test --algorithms "firstFitBin,onlineFirstFit" --count 150
```

Directly compare how an online algorithm performs against its offline counterpart.

### 4. Testing Knapsack Algorithms with Value-Weighted Items

```bash
npm run packing-test --algorithms knapsack --item-type weighted --count 50
```

Tests how different knapsack algorithms optimize for value when items have both weight and value attributes.

### 5. Testing with Different Container Dimensions

```bash
npm run packing-test --algorithms strip --width 800 --height 1200 --count 100
```

Tests how strip packing algorithms perform with non-square container dimensions.

## Algorithm Selection Guide

| When You Need To...                      | Try These Algorithms                |
|------------------------------------------|-------------------------------------|
| Minimize number of containers            | Best Fit Bin, First Fit Bin         |
| Maximize value with limited space        | 0/1 Knapsack, Fractional Knapsack   |
| Pack large numbers of similar items      | Shelf Packing, Next Fit Strip       |
| Handle items arriving in real-time       | Online First Fit, Online Shelf      |
| Achieve highest space utilization        | Maximal Rectangles, Skyline Packing |
| Balance speed and efficiency             | First Fit Bin, Guillotine Packing   |
| Handle items with vastly different sizes | Best Fit Bin, Skyline Packing       |

## Time and Space Complexity

| Algorithm           | Time Complexity | Space Complexity | Best Use Case                               |
|---------------------|-----------------|------------------|---------------------------------------------|
| First Fit Bin       | O(n²)           | O(n)             | General purpose bin packing                 |
| Best Fit Bin        | O(n²)           | O(n)             | Minimizing wasted space                     |
| Next Fit Bin        | O(n)            | O(n)             | Speed-critical situations                   |
| 0/1 Knapsack        | O(nW)           | O(nW)            | Optimal value with indivisible items        |
| Fractional Knapsack | O(n log n)      | O(n)             | Value optimization with divisible items     |
| Shelf Packing       | O(n log n)      | O(n)             | Simple implementation for rectangle packing |
| Maximal Rectangles  | O(n³)           | O(n²)            | Highest space utilization                   |
| Skyline Packing     | O(n²)           | O(n)             | Complex irregular packing                   |

Where:

- n is the number of items
- W is the knapsack capacity

## Performance Metrics Explained

The testing framework reports several key metrics:

- **Space Utilization**: Percentage of container space used (higher is better)
- **Containers Used**: Number of containers/bins required (lower is better)
- **Items Packed**: Number of successfully packed items
- **Execution Time**: Time taken to compute the packing solution

## Project Structure

```
packing/
├── algorithms/
│   ├── BinPacking.ts           // Bin packing implementations
│   ├── KnapsackPacking.ts      // Knapsack algorithms
│   ├── RectanglePacking.ts     // Rectangle packing implementations
│   ├── StripPacking.ts         // Strip packing algorithms
│   └── OnlinePacking.ts        // Online packing algorithms
├── utils.ts                    // Utility functions and data types
├── PackingTester.ts            // CLI testing interface
├── PackingHelp.ts              // Help documentation
└── README.md                   // This documentation
```

## Help Information

For detailed help information about the packing-test command and available algorithms:

```bash
npm run packing-help
```

## Contributing

Contributions are welcome! Potential improvements include:

1. Adding more sophisticated packing algorithms
2. Implementing visualizations of the packing results
3. Supporting 3D packing algorithms
4. Enhancing the testing framework
5. Adding real-world use case examples

Please ensure your code follows the existing style and includes appropriate tests.

## License

MIT
