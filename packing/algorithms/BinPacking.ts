/**
 * BinPacking.ts - Implementation of bin packing algorithms
 *
 * This file provides different bin packing algorithms:
 * - First Fit: Places item in the first bin that can accommodate it
 * - Best Fit: Places item in the bin that will leave the least empty space
 * - Next Fit: Only considers the most recently used bin
 * - Worst Fit: Places item in the bin with the most remaining space
 */

import {Container, Item, PackingResult} from '../utils';

/**
 * First Fit Bin Packing algorithm
 * Places each item in the first bin that can accommodate it
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function firstFitBinPacking(
    items: Item[],
    containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
    // Sort items by height (can improve packing quality)
    const sortedItems = [...items].sort((a, b) => b.height * b.width - a.height * a.width);

    // Initialize containers array
    const containers: Container[] = [];
    const unpackedItems: Item[] = [];

    // Process each item
    for (const item of sortedItems) {
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
 * Best Fit Bin Packing algorithm
 * Places each item in the bin that will leave the least empty space
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function bestFitBinPacking(
    items: Item[],
    containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
    // Sort items by area (largest first)
    const sortedItems = [...items].sort((a, b) => b.height * b.width - a.height * a.width);

    // Initialize containers array
    const containers: Container[] = [];
    const unpackedItems: Item[] = [];

    // Process each item
    for (const item of sortedItems) {
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
 * Next Fit Bin Packing algorithm
 * Only considers the most recently used bin
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function nextFitBinPacking(
    items: Item[],
    containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
    // Sort items by height (can improve packing quality)
    const sortedItems = [...items].sort((a, b) => b.height * b.width - a.height * a.width);

    // Initialize containers array
    const containers: Container[] = [];
    const unpackedItems: Item[] = [];

    // Create the first container
    if (sortedItems.length > 0) {
        containers.push({
            id: 0,
            width: containerSpec.width,
            height: containerSpec.height,
            items: []
        });
    }

    // Process each item
    for (const item of sortedItems) {
        // Get the current container
        const currentContainer = containers[containers.length - 1];

        // Calculate current container utilization
        const currentContainerArea = currentContainer.items.reduce(
            (sum, i) => sum + i.width * i.height, 0
        );
        const containerCapacity = currentContainer.width * currentContainer.height;
        const itemArea = item.width * item.height;

        // Check if the item fits in the current container
        if (currentContainerArea + itemArea <= containerCapacity) {
            // Item fits in current container
            currentContainer.items.push(item);
        } else {
            // Item doesn't fit, create a new container
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
 * Worst Fit Bin Packing algorithm
 * Places each item in the bin with the most remaining space
 *
 * @param items Items to pack
 * @param containerSpec Container specification
 * @returns Packing result
 */
export function worstFitBinPacking(
    items: Item[],
    containerSpec: Omit<Container, 'id' | 'items'>
): PackingResult {
    // Sort items by area (largest first)
    const sortedItems = [...items].sort((a, b) => b.height * b.width - a.height * a.width);

    // Initialize containers array
    const containers: Container[] = [];
    const unpackedItems: Item[] = [];

    // Process each item
    for (const item of sortedItems) {
        let bestContainerIndex = -1;
        let mostRemainingSpace = -1;

        // Find the bin with the most remaining space that can fit the item
        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];
            const currentContainerArea = container.items.reduce(
                (sum, i) => sum + i.width * i.height, 0
            );
            const containerCapacity = container.width * container.height;
            const itemArea = item.width * item.height;

            const remainingSpace = containerCapacity - currentContainerArea;

            if (currentContainerArea + itemArea <= containerCapacity &&
                remainingSpace > mostRemainingSpace) {
                bestContainerIndex = i;
                mostRemainingSpace = remainingSpace;
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
