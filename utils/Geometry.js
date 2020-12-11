function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

/*  For those not comfortable with this notation,
    and without the conversion to degrees built in: if(x>0) {radians = x;}
    else {radians = 2*PI + x;} so we are just adding 2PI to the result if it is less than 0. –
 */
function aTan2Degrees(x,y) {
    var angle = (Math.atan2(x,y) * (180/Math.PI) + 360) % 360;
}


/*
In a triangle, the three interior angles always add to 180°:
A + B + C = 180°
 */
class triangle {

    /*
        A,B,C are inside angles
        a,b,c are side lengths
     */

    constructor(props) {
        this.base = p.base;
        this.base = p.base;

    }

    areaOfTriangle(a,b,c) {
        const sp = (a + b + c) / 2;
        return Math.sqrt(sp * (sp - a) * (sp - b) * (sp - c) );
    };

    getArea(a,b,C) {
        return  1/2 * a * b * Math.sin(C);
    }

    getArea(base, height) {
        return  1/2 * base * height;
    }


    getAngleC(a,b,c) {
        // (for all triangles)	a2 + b2 − 2ab cos(C) = c2
        // c2 = a2 + b2 − 2ab cos(C)

        let C = Math.acos(  Math.pow(a,2) + Math.pow(b,2) - Math.pow(c,2) / 2 * a * b )
    }


    getRightTriangle(a,b,c) {
        // (Pythagoras Theorem only for Right-Angled Triangles)	a2 + b2 = c2
    }

    getRightAngle(opposite, adjacent, hypotenuse) {
        // also tan(α) = sin(α) / cos(α)
        // atan2(y, x) will give us the value of angle α in radians.
        // atan is used if we only know or are interested in y/x not y and x individually.
        // So if p = y/x then to get α we'd use atan(p)

        if (opposite && hypotenuse) {
            return Math.asin(opposite / hypotenuse);
        }
        if (adjacent && hypotenuse) {
            return Math.acos(adjacent / hypotenuse);
        }
        if (adjacent && opposite) {
            return Math.atan(opposite / adjacent);
        }

    }



}

function circle(radius)
{
    this.radius = radius;
    // area method
    this.area = function ()
    {
        return Math.PI * this.radius * this.radius;
    };
    // perimeter method
    this.perimeter = function ()
    {
        return 2*Math.PI*this.radius;
    };
}
var c = new circle(3);
console.log('Area =', c.area().toFixed(2));
console.log('perimeter =', c.perimeter().toFixed(2));
