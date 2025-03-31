/**
 * A simple HashMap implementation in TypeScript
 * Uses separate chaining for collision resolution
 */
class HashMap<K, V> {
  // Bucket array to store key-value pairs
  private buckets: Array<Array<[K, V]>>;
  // Current number of elements in the hash map
  private size: number;
  // Default initial capacity
  private readonly DEFAULT_CAPACITY = 16;
  // Load factor threshold to trigger resize
  private readonly LOAD_FACTOR_THRESHOLD = 0.75;

  /**
   * Initialize a new HashMap with default capacity
   */
  constructor() {
    this.buckets = new Array(this.DEFAULT_CAPACITY).fill(null).map(() => []);
    this.size = 0;
  }

  /**
   * Hashes a key to an index in the bucket array
   * @param key The key to hash
   * @returns The bucket index
   */
  private hash(key: K): number {
    // Convert key to string and get its hash code
    const stringKey = String(key);
    let hashCode = 0;

    // Simple hash function
    for (let i = 0; i < stringKey.length; i++) {
      // Use prime number 31 for better distribution
      hashCode = (hashCode * 31 + stringKey.charCodeAt(i)) >>> 0;
    }

    // Map hash code to bucket index
    return hashCode % this.buckets.length;
  }

  private stringHash(key: K): number {
    // Convert key to string and get its hash code
    const stringKey = String(key);
    let hashCode = 0;

    // Simple hash function
    for (let i = 0; i < stringKey.length; i++) {
      // Use prime number 31 for better distribution
      hashCode = (hashCode * 31 + stringKey.charCodeAt(i)) >>> 0;
    }

    // Map hash code to bucket index
    return hashCode % this.buckets.length;
  }

  /**
   * Insert or update a key-value pair
   * @param key The key
   * @param value The value to store
   */
  public put(key: K, value: V): void {
    // Check if resize is needed
    if (this.size >= this.buckets.length * this.LOAD_FACTOR_THRESHOLD) {
      this.resize();
    }

    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (this.keysEqual(bucket[i][0], key)) {
        // Update existing value
        bucket[i][1] = value;
        return;
      }
    }

    // Key doesn't exist, add new entry
    bucket.push([key, value]);
    this.size++;
  }

  /**
   * Retrieve a value by key
   * @param key The key to look up
   * @returns The value or undefined if key doesn't exist
   */
  public get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (this.keysEqual(k, key)) {
        return v;
      }
    }

    return undefined;
  }

  /**
   * Remove a key-value pair
   * @param key The key to remove
   * @returns The removed value or undefined if key doesn't exist
   */
  public remove(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (this.keysEqual(bucket[i][0], key)) {
        const value = bucket[i][1];
        // Remove the entry
        bucket.splice(i, 1);
        this.size--;
        return value;
      }
    }

    return undefined;
  }

  /**
   * Check if the map contains a key
   * @param key The key to check
   * @returns True if the key exists, false otherwise
   */
  public containsKey(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Get the number of key-value pairs in the map
   * @returns The size of the map
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * Check if the map is empty
   * @returns True if empty, false otherwise
   */
  public isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Clear all entries from the map
   */
  public clear(): void {
    this.buckets = new Array(this.DEFAULT_CAPACITY).fill(null).map(() => []);
    this.size = 0;
  }

  /**
   * Get all keys in the map
   * @returns Array of keys
   */
  public keys(): K[] {
    const allKeys: K[] = [];

    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        allKeys.push(key);
      }
    }

    return allKeys;
  }

  /**
   * Get all values in the map
   * @returns Array of values
   */
  public values(): V[] {
    const allValues: V[] = [];

    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        allValues.push(value);
      }
    }

    return allValues;
  }

  /**
   * Get all entries in the map
   * @returns Array of key-value pairs
   */
  public entries(): Array<[K, V]> {
    const allEntries: Array<[K, V]> = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        allEntries.push(entry);
      }
    }

    return allEntries;
  }

  /**
   * Resize the bucket array when load factor exceeds threshold
   */
  private resize(): void {
    const oldBuckets = this.buckets;
    // Double the size
    this.buckets = new Array(oldBuckets.length * 2).fill(null).map(() => []);
    this.size = 0;

    // Rehash all existing entries
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.put(key, value);
      }
    }
  }

  /**
   * Compare keys for equality
   * @param key1 First key
   * @param key2 Second key
   * @returns True if keys are equal, false otherwise
   */
  private keysEqual(key1: K, key2: K): boolean {
    // Handle special case for objects
    if (typeof key1 === 'object' && key1 !== null &&
        typeof key2 === 'object' && key2 !== null) {
      return JSON.stringify(key1) === JSON.stringify(key2);
    }
    return key1 === key2;
  }
}

// Example usage
function hashMapExample() {
  const map = new HashMap<string, number>();

  // Adding entries
  map.put("one", 1);
  map.put("two", 2);
  map.put("three", 3);

  console.log("Size:", map.getSize()); // 3
  console.log("Get 'two':", map.get("two")); // 2
  console.log("Contains 'four':", map.containsKey("four")); // false

  // Update a value
  map.put("two", 22);
  console.log("Updated 'two':", map.get("two")); // 22

  // Remove an entry
  console.log("Removed:", map.remove("one")); // 1
  console.log("Size after remove:", map.getSize()); // 2

  // Get all keys and values
  console.log("Keys:", map.keys()); // ["two", "three"]
  console.log("Values:", map.values()); // [22, 3]

  // Clear the map
  map.clear();
  console.log("Is empty after clear:", map.isEmpty()); // true
}

// Uncomment to run the example
// hashMapExample();
