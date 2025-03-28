/**
 * RectanglePacking.ts - Implementation of rectangle packing algorithms
 *
 * This file provides different rectangle packing algorithms:
 * - Shelf Packing: Organizes rectangles into horizontal shelves
 * - Guillotine Packing: Uses guillotine cuts to subdivide free spaces
 * - Maximal Rectangles Packing: Tracks all maximal free rectangles
 * - Skyline Packing: Uses a skyline data structure to track free space
 */

import { Item, Container, PackingResult } from '../utils';

/**
 * Represents a free rectangle in the packing space
 */
interface FreeRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Represents a packed item with position information
 */
interface PositionedItem extends Item {
  x: number;
  y: number;
}

/**
 * Shelf Rectangle Packing algorithm
 * Packs rectangles in horizontal shelves
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function shelfRectanglePacking(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Sort items by height in non-increasing order
  const sortedItems = [...items].sort((a, b) => b.height - a.height);

  // Container dimensions
  const containerWidth = containerSpec.width;
  const containerHeight = containerSpec.height;

  // Initialize shelves
  const shelves: { height: number; y: number; remainingWidth: number }[] = [];
  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item
  for (const item of sortedItems) {
    // Skip items larger than the container
    if (item.width > containerWidth || item.height > containerHeight) {
      unpackedItems.push(item);
      continue;
    }

    // Try to place item in an existing shelf
    let placed = false;

    for (let i = 0; i < shelves.length; i++) {
      const shelf = shelves[i];

      // Check if the item fits in this shelf
      if (item.height <= shelf.height && item.width <= shelf.remainingWidth) {
        // Place the item in this shelf
        const positionedItem: PositionedItem = {
          ...item,
          x: containerWidth - shelf.remainingWidth,
          y: shelf.y
        };

        positionedItems.push(positionedItem);
        shelf.remainingWidth -= item.width;
        placed = true;
        break;
      }
    }

    // If the item wasn't placed in an existing shelf, create a new shelf
    if (!placed) {
      const totalShelfHeight = shelves.reduce((sum, shelf) => sum + shelf.height, 0);

      // Check if there's room for a new shelf
      if (totalShelfHeight + item.height <= containerHeight) {
        // Create a new shelf
        const newShelf = {
          height: item.height,
          y: totalShelfHeight,
          remainingWidth: containerWidth - item.width
        };

        shelves.push(newShelf);

        // Place the item in the new shelf
        const positionedItem: PositionedItem = {
          ...item,
          x: 0,
          y: totalShelfHeight
        };

        positionedItems.push(positionedItem);
      } else {
        // No room for a new shelf
        unpackedItems.push(item);
      }
    }
  }

  // Create the container with the positioned items
  // In a real implementation, we would include the x, y positions in the container items
  const container: Container = {
    id: 0,
    width: containerWidth,
    height: containerHeight,
    items: positionedItems
  };

  // Calculate space utilization
  const totalItemArea = positionedItems.reduce((sum, item) => sum + item.width * item.height, 0);
  const containerArea = containerWidth * containerHeight;
  const spaceUtilization = (totalItemArea / containerArea) * 100;

  return {
    containers: [container],
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Guillotine Rectangle Packing algorithm
 * Uses guillotine cuts to subdivide free spaces
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function guillotineRectanglePacking(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Sort items by area in non-increasing order
  const sortedItems = [...items].sort((a, b) =>
    (b.width * b.height) - (a.width * a.height)
  );

  // Container dimensions
  const containerWidth = containerSpec.width;
  const containerHeight = containerSpec.height;

  // Initialize free rectangles with the whole container
  const freeRectangles: FreeRectangle[] = [
    { x: 0, y: 0, width: containerWidth, height: containerHeight }
  ];

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item
  for (const item of sortedItems) {
    // Skip items larger than the container
    if (item.width > containerWidth || item.height > containerHeight) {
      unpackedItems.push(item);
      continue;
    }

    // Find the best free rectangle to place the item
    let bestRectIndex = -1;
    let bestScore = Number.MAX_VALUE;

    for (let i = 0; i < freeRectangles.length; i++) {
      const rect = freeRectangles[i];

      // Check if item fits in this rectangle
      if (rect.width >= item.width && rect.height >= item.height) {
        // Score this placement (smaller is better)
        // We use "best-short-side-fit" heuristic
        const score = Math.min(
          rect.width - item.width,
          rect.height - item.height
        );

        if (score < bestScore) {
          bestScore = score;
          bestRectIndex = i;
        }
      }
    }

    // If no free rectangle fits the item
    if (bestRectIndex === -1) {
      unpackedItems.push(item);
      continue;
    }

    // Place the item in the best free rectangle
    const bestRect = freeRectangles[bestRectIndex];

    // Create positioned item
    const positionedItem: PositionedItem = {
      ...item,
      x: bestRect.x,
      y: bestRect.y
    };

    positionedItems.push(positionedItem);

    // Remove the used rectangle
    freeRectangles.splice(bestRectIndex, 1);

    // Split the remaining space into two new free rectangles
    // Horizontal split (right)
    if (item.width < bestRect.width) {
      freeRectangles.push({
        x: bestRect.x + item.width,
        y: bestRect.y,
        width: bestRect.width - item.width,
        height: item.height
      });
    }

    // Vertical split (bottom)
    if (item.height < bestRect.height) {
      freeRectangles.push({
        x: bestRect.x,
        y: bestRect.y + item.height,
        width: bestRect.width,
        height: bestRect.height - item.height
      });
    }
  }

  // Create the container with the positioned items
  const container: Container = {
    id: 0,
    width: containerWidth,
    height: containerHeight,
    items: positionedItems
  };

  // Calculate space utilization
  const totalItemArea = positionedItems.reduce((sum, item) => sum + item.width * item.height, 0);
  const containerArea = containerWidth * containerHeight;
  const spaceUtilization = (totalItemArea / containerArea) * 100;

  return {
    containers: [container],
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Maximal Rectangles Packing algorithm
 * Tracks all maximal free rectangles for efficient packing
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function maximalRectanglesPacking(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Sort items by area in non-increasing order
  const sortedItems = [...items].sort((a, b) =>
    (b.width * b.height) - (a.width * a.height)
  );

  // Container dimensions
  const containerWidth = containerSpec.width;
  const containerHeight = containerSpec.height;

  // Initialize free rectangles with the whole container
  let freeRectangles: FreeRectangle[] = [
    { x: 0, y: 0, width: containerWidth, height: containerHeight }
  ];

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item
  for (const item of sortedItems) {
    // Skip items larger than the container
    if (item.width > containerWidth || item.height > containerHeight) {
      unpackedItems.push(item);
      continue;
    }

    // Find the best free rectangle to place the item
    let bestRectIndex = -1;
    let bestScore = Number.MAX_VALUE;

    for (let i = 0; i < freeRectangles.length; i++) {
      const rect = freeRectangles[i];

      // Check if item fits in this rectangle
      if (rect.width >= item.width && rect.height >= item.height) {
        // Score this placement (smaller is better)
        // We use "best area fit" heuristic
        const score = rect.width * rect.height - item.width * item.height;

        if (score < bestScore) {
          bestScore = score;
          bestRectIndex = i;
        }
      }
    }

    // If no free rectangle fits the item
    if (bestRectIndex === -1) {
      unpackedItems.push(item);
      continue;
    }

    // Place the item in the best free rectangle
    const bestRect = freeRectangles[bestRectIndex];

    // Create positioned item
    const positionedItem: PositionedItem = {
      ...item,
      x: bestRect.x,
      y: bestRect.y
    };

    positionedItems.push(positionedItem);

    // Remove the used rectangle
    freeRectangles.splice(bestRectIndex, 1);

    // Generate new free rectangles by splitting all existing free rectangles
    // that overlap with the newly placed item
    const newFreeRectangles: FreeRectangle[] = [];

    for (const rect of freeRectangles) {
      // Calculate the intersection area
      const intersect = {
        x: Math.max(rect.x, positionedItem.x),
        y: Math.max(rect.y, positionedItem.y),
        width: Math.min(rect.x + rect.width, positionedItem.x + positionedItem.width) - Math.max(rect.x, positionedItem.x),
        height: Math.min(rect.y + rect.height, positionedItem.y + positionedItem.height) - Math.max(rect.y, positionedItem.y)
      };

      // No intersection
      if (intersect.width <= 0 || intersect.height <= 0) {
        newFreeRectangles.push(rect);
        continue;
      }

      // Split the rectangle in up to 4 new free rectangles
      // Left
      if (rect.x < positionedItem.x) {
        newFreeRectangles.push({
          x: rect.x,
          y: rect.y,
          width: positionedItem.x - rect.x,
          height: rect.height
        });
      }

      // Right
      if (rect.x + rect.width > positionedItem.x + positionedItem.width) {
        newFreeRectangles.push({
          x: positionedItem.x + positionedItem.width,
          y: rect.y,
          width: rect.x + rect.width - (positionedItem.x + positionedItem.width),
          height: rect.height
        });
      }

      // Top
      if (rect.y < positionedItem.y) {
        newFreeRectangles.push({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: positionedItem.y - rect.y
        });
      }

      // Bottom
      if (rect.y + rect.height > positionedItem.y + positionedItem.height) {
        newFreeRectangles.push({
          x: rect.x,
          y: positionedItem.y + positionedItem.height,
          width: rect.width,
          height: rect.y + rect.height - (positionedItem.y + positionedItem.height)
        });
      }
    }

    // Update free rectangles
    freeRectangles = newFreeRectangles;

    // Optional: Remove contained/redundant rectangles
    // This would improve efficiency in a full implementation
  }

  // Create the container with the positioned items
  const container: Container = {
    id: 0,
    width: containerWidth,
    height: containerHeight,
    items: positionedItems
  };

  // Calculate space utilization
  const totalItemArea = positionedItems.reduce((sum, item) => sum + item.width * item.height, 0);
  const containerArea = containerWidth * containerHeight;
  const spaceUtilization = (totalItemArea / containerArea) * 100;

  return {
    containers: [container],
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Skyline Packing algorithm
 * Uses a skyline data structure to track free space
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function skylinePacking(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Sort items by width in non-increasing order
  const sortedItems = [...items].sort((a, b) => b.width - a.width);

  // Container dimensions
  const containerWidth = containerSpec.width;
  const containerHeight = containerSpec.height;

  // Initialize skyline with a single segment spanning the entire width
  const skyline: { x: number; width: number; y: number }[] = [
    { x: 0, width: containerWidth, y: 0 }
  ];

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item
  for (const item of sortedItems) {
    // Skip items larger than the container
    if (item.width > containerWidth || item.height > containerHeight) {
      unpackedItems.push(item);
      continue;
    }

    // Find the best position along the skyline
    let bestX = -1;
    let bestY = -1;
    let bestScore = Number.MAX_VALUE;

    // Try placing the item at each skyline segment
    for (let i = 0; i < skyline.length; i++) {
      const segment = skyline[i];

      // Skip if segment is too narrow
      if (segment.width < item.width) continue;

      // Try placing the item at this segment
      const y = segment.y;
      const x = segment.x;

      // Check if the item fits within the container height
      if (y + item.height > containerHeight) continue;

      // Score this placement (lowest skyline is preferable)
      const score = y;

      if (score < bestScore) {
        bestScore = score;
        bestX = x;
        bestY = y;
      }
    }

    // If no valid position found
    if (bestX === -1) {
      unpackedItems.push(item);
      continue;
    }

    // Place the item at the best position
    const positionedItem: PositionedItem = {
      ...item,
      x: bestX,
      y: bestY
    };

    positionedItems.push(positionedItem);

    // Update the skyline
    // This is a simplified implementation; a real skyline algorithm would merge segments

    // Find affected segments
    const newSegments: { x: number; width: number; y: number }[] = [];
    const itemRight = bestX + item.width;
    const itemTop = bestY + item.height;

    // Process each segment
    for (const segment of skyline) {
      // Segment is completely to the left of the item
      if (segment.x + segment.width <= bestX) {
        newSegments.push(segment);
        continue;
      }

      // Segment is completely to the right of the item
      if (segment.x >= itemRight) {
        newSegments.push(segment);
        continue;
      }

      // Segment overlaps with the item

      // Left part (if any)
      if (segment.x < bestX) {
        newSegments.push({
          x: segment.x,
          width: bestX - segment.x,
          y: segment.y
        });
      }

      // Middle part (becomes the new height)
      newSegments.push({
        x: Math.max(segment.x, bestX),
        width: Math.min(segment.x + segment.width, itemRight) - Math.max(segment.x, bestX),
        y: itemTop
      });

      // Right part (if any)
      if (segment.x + segment.width > itemRight) {
        newSegments.push({
          x: itemRight,
          width: segment.x + segment.width - itemRight,
          y: segment.y
        });
      }
    }

    // Update skyline with new segments
    skyline.length = 0;
    skyline.push(...newSegments);

    // Sort skyline segments by x coordinate
    skyline.sort((a, b) => a.x - b.x);

    // Merge adjacent segments with the same height
    for (let i = 0; i < skyline.length - 1; i++) {
      if (skyline[i].y === skyline[i + 1].y) {
        skyline[i].width += skyline[i + 1].width;
        skyline.splice(i + 1, 1);
        i--;
      }
    }
  }

  // Create the container with the positioned items
  const container: Container = {
    id: 0,
    width: containerWidth,
    height: containerHeight,
    items: positionedItems
  };

  // Calculate space utilization
  const totalItemArea = positionedItems.reduce((sum, item) => sum + item.width * item.height, 0);
  const containerArea = containerWidth * containerHeight;
  const spaceUtilization = (totalItemArea / containerArea) * 100;

  return {
    containers: [container],
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}
