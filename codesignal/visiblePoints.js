function visiblePointsOld(points) {
    let max = 0;

    // A. For each point, sum other points within 45 degrees either direction
    // B. For each degree, sum all points within 45 degrees
    max = points.reduce((acc, v) => {
        let origin = v;
        let end1 = [origin[0] * 2, origin[1] * 2]
        let end2 = [origin[0] * -2, origin[1] * -2]
    })

}


function visiblePoints(points) {
    'use strict';

    const pointCount = points.length,
          viewingAreaSize = 45 * Math.PI / 180; // radians

    // Get the angle of each point
    for (let p = 0; p < pointCount; p++) {
        points[p][2] = Math.atan2(points[p][1], points[p][0]) + Math.PI;
    }

    // Sort the points by their angle, ascending
    points.sort((a, b) => a[2] - b[2]);
    console.log(points);

    // Rotate the viewing area to have one point just inside the edge
    let result = 0,
        visible = 0,
        nextPoint = 0,
        nextPointAngle = 0;
    for (let p = 0; p < pointCount; p++) {

        const start = points[p][2], end = start + viewingAreaSize;

        // Count the number of points which entered the viewing area
        while (nextPointAngle <= end && nextPoint < pointCount) {
            visible++;
            nextPoint++;
            let diff = nextPoint % pointCount; // auto revolves, so points[pointCount] === points[0]
            let point = points[diff];
            nextPointAngle = point[2];
            if (nextPoint >= pointCount) {
             //    nextPointAngle += 2 * Math.PI;
            }
        }

        // Store the result
        result = Math.max(result, visible);

        // Remove the point on the start edge because we are moving
        // the viewing area to the next point
        visible--;
    }

    return result;
}

/*
 * We can tell how many points are currently visible by calculating
 * their angle from the origin. We begin with the initial set of
 * visible points in an array, and move the viewing angle to the
 * edge of each point, one-by-one, removing the old "edge-point"
 * and adding any which came into view. After completing a full
 * rotation, the maximum number of points which were visible at
 * once is returned.
 */

/*

1,5 (origin)
3,2 (in)
1,1 (in)
1,3 (in)

3,1 (out)

*/

visiblePoints23 = p => {
    angles = []
    p.map(p => {
        x = p[0]
        y = p[1]
        angle = Math.asin(x / Math.sqrt(x*x + y*y)) * 180 / Math.PI
        angle = (y > 0 ? angle : 180 - angle) * 1e5 + .5 | 0
        angles.push(angle)
        angles.push(360 * 1e5 + angle)
    })
    angles.sort((a,b) => a-b)

    max = 0
    i = j = 0
    while (j < angles.length) {
        if (angles[j] - angles[i] <= 45 * 1e5) {
            j++
        } else {
            if (max < j - i) max = j - i
            i++
        }
    }
    return max < j - i ? j - i : max
}


const tests = [
    {
        name: 'Test 1',
        arg: [[[1,1],
            [3,1],
            [3,2],
            [3,3],
            [1,3],
            [2,5],
            [1,5],
            [-1,-1],
            [-1,-2],
            [-2,-3],
            [-4,-4]]],
        expected: 6
    }
];

tests.forEach((o, i) => {
    let result = visiblePoints(...o.arg);
    console.log('TEST ' + o.name + ': ' + i + ((JSON.stringify(result) === JSON.stringify(o.expected)) ? ' PASSED' : ' FAILED'));
})
