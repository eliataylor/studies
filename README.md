# TypeScript Algorithms & Data Structures

A comprehensive collection of algorithm implementations in TypeScript, with a focus on algorithm visualization, benchmarking, and education.

## Project Structure

This repository is organized into modular components:

### [Sorting Algorithms](./sorting/)

- Implementations of classic sorting algorithms (bubble, merge, quick, heap, etc.)
- Unified CLI testing framework for benchmarking and visualization
- Time & space complexity analysis
- Performance comparison tools

```bash
# Test a specific sorting algorithm
npm run sort-test -- --algorithm quick --size 1000

# Compare multiple sorting algorithms
npm run sort-test -- --algorithms "quick,merge,heap" --size 5000

# Display sorting help information
npm run sort-help
```

### [Searching Algorithms](./searching/)

- Implementations for various data structures:
  - Array search algorithms (linear, binary, interpolation, etc.)
  - Matrix search algorithms (row-column, staircase, etc.)
  - Tree search algorithms (DFS, BFS, BST search)
- Unified testing framework with performance metrics
- Configurable data generation and test settings

```bash
# Test a specific search algorithm
npm run search-test -- --algorithms binary --sizes 1000

# Compare multiple search algorithms
npm run search-test -- --algorithms "binary,linear,jump"

# Display search help information
npm run search-help
```

## Installation

```bash
# Install dependencies
npm install

# Build TypeScript files
npm run build
```

## License

MIT
