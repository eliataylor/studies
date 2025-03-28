const arr = [1, 2, 3, 4, 5];

console.log("Test nested continue:");
try {
    arr.forEach(num => {
        console.log(`[continue] Outer ForEach: ${num}`);
        for (let inner of arr) {
            if (inner === 3) continue; // Skips iteration before logging
            console.log(`[continue]   Inner For: ${num}: ${inner}`);
        }
    });
} catch (e) {
    console.log(`[continue] Error:`, e);
}

console.log("\nTest nested break:");
try {
    arr.forEach(num => {
        console.log(`[break] Outer ForEach: ${num}`);
        for (let inner of arr) {
            if (inner === 3) break; // Breaks before logging
            console.log(`[break]   Inner For: ${num}: ${inner}`);
        }
    });
} catch (e) {
    console.log(`[break] Error:`, e);
}

console.log("\nTest return true:");
try {
    arr.forEach(num => {
        console.log(`[return true] Outer ForEach: ${num}`);
        for (let inner of arr) {
            if (inner === 3) return true; // Exits function before logging
            console.log(`[return true]   Inner For: ${num}: ${inner}`);
        }
    });
} catch (e) {
    console.log(`[return true] Error:`, e);
}

console.log("\nTest return false:");
try {
    arr.forEach(num => {
        console.log(`[return false] Outer ForEach: ${num}`);
        for (let inner of arr) {
            if (inner === 3) return false; // Exits function before logging
            console.log(`[return false]   Inner For: ${num}: ${inner}`);
        }
    });
} catch (e) {
    console.log(`[return false] Error:`, e);
}

console.log("Test breaking outer forEach with throw:");
try {
    arr.forEach(num => {
        console.log(`[throw] Outer ForEach: ${num}`);
        for (let inner of arr) {
            if (inner === 3) throw new Error("Break outer loop");
            console.log(`[throw]   Inner For: ${num}: ${inner}`);
        }
    });
} catch (e) {
    console.log("[throw] Loop exited early:", e.message);
}

