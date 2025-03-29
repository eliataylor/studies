# TypeScript Unit Testing Algorithms & Data Structures

- Most common algorithms implemented
- Utility functions to generate test data for many scenarios
- Time & space complexity analysis
- Performance comparison tools

### Test [Sorting Algorithms](./sorting/)

```bash
# Test a specific sorting algorithm
npm run sort-test -- --algorithm quick --size 1000

# Compare multiple sorting algorithms
npm run sort-test -- --algorithms "quick,merge,heap" --size 5000

# Display sorting help information
npm run sort-help
```

### Test [Searching Algorithms](./searching/)

```bash
# Test a specific search algorithm
npm run search-test -- --algorithms binary --sizes 1000

# Compare multiple search algorithms
npm run search-test -- --algorithms "binary,linear,jump"

# Display search help information
npm run search-help
```

### Test [Packing Algorithms](./packing/)

```bash
# Test a specific search algorithm
npm run packing-test --algorithms "firstFitBin,onlineFirstFit" --count 150

# Compare multiple search algorithms
npm run packing-test --algorithms bin --count 200

# Display search help information
npm run search-help
```

### Review [Quizzes](./quizzes/)
- Quizzes I've completed from LeetCode, Codility, Codesignal, HackerRank, etc.


## Installation
```bash
# Install dependencies
npm install
npm run live
```

## License

MIT
