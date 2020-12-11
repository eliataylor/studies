function growingPlant(upSpeed, downSpeed, desiredHeight) {


    let height = 0,days = 1;
    height += upSpeed;
    while (height < desiredHeight) {
        days += 1;
        height -= downSpeed;
        height += upSpeed;
    }
    return days;

    /*
    if (upSpeed > desiredHeight) return 1;
    let perday = upSpeed - downSpeed;


    days = Math.floor(desiredHeight / upSpeed);

    let nights = Math.floor(desiredHeight / (upSpeed - downSpeed));

    console.log(days, nights, ' > ');

    console.log(Math.log(upSpeed - downSpeed))
    console.log(Math.log(desiredHeight))

    let log1 = Math.log(days/desiredHeight);
    let log2 = Math.log(nights/desiredHeight);
    console.log(log1)
    console.log(log2)
    console.log(Math.log(days/desiredHeight))
    console.log(Math.log(nights/desiredHeight))

    //return Math.log(upSpeed/desiredHeight) / Math.log(10/100+1);
    return Math.floor(log1/ log1);

    return Math.max(days, nights);
    */

}

// OTHERS
function growingPlant( upSpeed,  downSpeed,  desiredHeight)
{
    // The height after x days (up - down) * (x - 1) + up
    // We want dh <= (u - d) * (x - 1) + u
    // (dh - u) / (u - d) + 1 <= x
    return upSpeed > desiredHeight ? 1 : Math.ceil((desiredHeight - upSpeed) / (upSpeed - downSpeed)) + 1;
}

function growingPlant($u, $d, $h) {
    return $h<=$u?1:floor(($h-$u-1)/($u-$d))+2;}
