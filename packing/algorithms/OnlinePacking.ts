/**
 * OnlinePacking.ts - Implementation of online packing algorithms
 *
 * This file provides different online packing algorithms:
 * - Online First Fit: Places each item in the first bin that can accommodate it as it arrives
 * - Online Best Fit: Places each item in the bin that will leave the least empty space as it arrives
 * - Online Shelf: Packs items in shelves as they arrive
 * - Online Skyline: Uses skyline data structure to pack items as they arrive
 */

import { Item, Container, PackingResult } from '../utils';

/**
 * Represents a packed item with position information
 */
interface PositionedItem extends Item {
  x: number;
  y: number;
}

/**
 * Online First Fit algorithm
 * Places each item in the first bin that can accommodate it as it arrives
 *
 * @param items Items to pack (processed in the order they are provided)
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function onlineFirstFit(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // In online algorithms, we don't sort items as they come in sequence

  // Initialize containers array
  const containers: Container[] = [];
  const unpackedItems: Item[] = [];

  // Process each item in the order they arrive
  for (const item of items) {
    let placed = false;

    // Try to place item in an existing container
    for (const container of containers) {
      // Simple check: just ensure total area fits
      // In a real implementation, this would check for geometric fit
      const currentContainerArea = container.items.reduce(
        (sum, i) => sum + i.width * i.height, 0
      );
      const containerCapacity = container.width * container.height;
      const itemArea = item.width * item.height;

      if (currentContainerArea + itemArea <= containerCapacity) {
        // Item fits in this container
        container.items.push(item);
        placed = true;
        break;
      }
    }

    // If item couldn't be placed in existing containers, create a new one
    if (!placed) {
      if (item.width <= containerSpec.width && item.height <= containerSpec.height) {
        const newContainer: Container = {
          id: containers.length,
          width: containerSpec.width,
          height: containerSpec.height,
          items: [item]
        };
        containers.push(newContainer);
      } else {
        // Item is too large for any bin
        unpackedItems.push(item);
      }
    }
  }

  // Calculate space utilization
  const totalItemArea = items
    .filter(item => !unpackedItems.includes(item))
    .reduce((sum, item) => sum + item.width * item.height, 0);

  const totalContainerArea = containers.length * containerSpec.width * containerSpec.height;
  const spaceUtilization = totalContainerArea > 0
    ? (totalItemArea / totalContainerArea) * 100
    : 0;

  return {
    containers,
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Online Best Fit algorithm
 * Places each item in the bin that will leave the least empty space as it arrives
 *
 * @param items Items to pack (processed in the order they are provided)
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function onlineBestFit(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // In online algorithms, we don't sort items as they come in sequence

  // Initialize containers array
  const containers: Container[] = [];
  const unpackedItems: Item[] = [];

  // Process each item in the order they arrive
  for (const item of items) {
    let bestContainerIndex = -1;
    let bestRemainingSpace = Number.MAX_VALUE;

    // Find the bin with the smallest remaining space that can fit the item
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      const currentContainerArea = container.items.reduce(
        (sum, i) => sum + i.width * i.height, 0
      );
      const containerCapacity = container.width * container.height;
      const itemArea = item.width * item.height;

      const remainingSpace = containerCapacity - currentContainerArea;

      if (currentContainerArea + itemArea <= containerCapacity &&
          remainingSpace < bestRemainingSpace) {
        bestContainerIndex = i;
        bestRemainingSpace = remainingSpace;
      }
    }

    // Place the item in the best bin or create a new one
    if (bestContainerIndex !== -1) {
      containers[bestContainerIndex].items.push(item);
    } else {
      if (item.width <= containerSpec.width && item.height <= containerSpec.height) {
        const newContainer: Container = {
          id: containers.length,
          width: containerSpec.width,
          height: containerSpec.height,
          items: [item]
        };
        containers.push(newContainer);
      } else {
        // Item is too large for any bin
        unpackedItems.push(item);
      }
    }
  }

  // Calculate space utilization
  const totalItemArea = items
    .filter(item => !unpackedItems.includes(item))
    .reduce((sum, item) => sum + item.width * item.height, 0);

  const totalContainerArea = containers.length * containerSpec.width * containerSpec.height;
  const spaceUtilization = totalContainerArea > 0
    ? (totalItemArea / totalContainerArea) * 100
    : 0;

  return {
    containers,
    unpackedItems,
    spaceUtilization,
    executionTime: 0 // This will be set by the measurement function
  };
}

/**
 * Represents a shelf in online shelf packing
 */
interface Shelf {
  y: number;
  height: number;
  remainingWidth: number;
}

/**
 * Online Shelf Packing algorithm
 * Packs items in shelves as they arrive
 *
 * @param items Items to pack (processed in the order they are provided)
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function onlineShelf(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Container dimensions
  const containerWidth = containerSpec.width;
  const containerHeight = containerSpec.height;

  // Initialize shelves
  const shelves: Shelf[] = [];

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item in the order they arrive
  for (const item of items) {
    // Skip items larger than the container
    if (item.width > containerWidth || item.height > containerHeight) {
      unpackedItems.push(item);
      continue;
    }

    // Try to place the item in an existing shelf
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
        const newShelf: Shelf = {
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
 * Represents a skyline segment
 */
interface SkylineSegment {
  x: number;
  width: number;
  y: number;
}

/**
 * Online Skyline algorithm
 * Uses skyline data structure to pack items as they arrive
 *
 * @param items Items to pack (processed in the order they are provided)
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function onlineSkyline(
  items: Item[],
  containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
  // Container dimensions
  const containerWidth = containerSpec.width;
  const containerHeight = containerSpec.height;

  // Initialize skyline with a single segment spanning the entire width
  const skyline: SkylineSegment[] = [
    { x: 0, width: containerWidth, y: 0 }
  ];

  const positionedItems: PositionedItem[] = [];
  const unpackedItems: Item[] = [];

  // Process each item in the order they arrive
  for (const item of items) {
    // Skip items larger than the container
    if (item.width > containerWidth || item.height > containerHeight) {
      unpackedItems.push(item);
      continue;
    }

    // Find the best position along the skyline
    let bestX = -1;
    let bestY = -1;
    let bestWastedHeight = Number.MAX_VALUE;

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

      // Wasted height is how much higher this position is than the minimum height (skyline)
      let wastedHeight = 0;
      for (const otherSegment of skyline) {
        if (otherSegment.x < x + item.width && otherSegment.x + otherSegment.width > x) {
          wastedHeight += Math.max(0, segment.y - otherSegment.y);
        }
      }

      // Choose position with minimum wasted height
      if (wastedHeight < bestWastedHeight) {
        bestWastedHeight = wastedHeight;
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
    // Find affected segments
    const newSegments: SkylineSegment[] = [];
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
      if (skyline[i].y === skyline[i + 1].y && skyline[i].x + skyline[i].width === skyline[i + 1].x) {
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
