<?php

function solution($A)
{
    $p = array(); // peaks
    for ($i=1; $i<count($A)-1; $i++)
        if ($A[$i] > $A[$i-1] && $A[$i] > $A[$i+1])
            $p[] = $i;

    $n = count($p);
    if ($n <= 2)
        return $n;

    $maxFlags = min(intval(ceil(sqrt(count($A)))), $n); // max number of flags
    $distance = $maxFlags; // required distance between flags
    // try to set max number of flags, then 1 less, etc... (2 flags are already set)
    for ($k = $maxFlags-2; $k > 0; $k--)
    {
        $left = $p[0];
        $right = $p[$n-1];
        $need = $k; // how many more flags we need to set

        for ($i = 1; $i<=$n-2; $i++) {
            $pos = $p[$i];
            // found one more flag for $distance
            if ($pos-$left >= $distance && $right-$pos >= $distance) {
                if ($need == 1) {
                    return $k+2;
                }
                $need--;
                $left = $pos;
            }

            if ($right - $pos <= $need * ($distance+1)) {
                break; // impossible to set $need more flags for $distance
            }

        }

        if ($need == 0) {
            return $k+2;
        }


        $distance--;
    }
    return 2;
}


$tests = json_decode('[{
        "name": "Test 1",
        "arg": [[1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]],
        "expected": 3
    },{
        "name": "Test 2",
        "arg": [[1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]],
        "expected": 2
    },
    {
        "name": "Test 3",
        "arg": [[1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5]],
        "expected": 2
    },
    {
        "name": "Test 4",
        "arg": [[1, 1, 1, 5, 1, 1, 1, 5, 1, 1, 1, 5]],
        "expected": 3
    },
    {
        "name": "Test 5",
        "arg": [[1,2,3,12,5,6,9]],
        "expected": 1
    },
    {
        "name": "Test base",
        "arg": [[5]],
        "expected": 1
    },
    {
        "name": "Test base",
        "arg": [[]],
        "expected": 0
    },
    {
        "name": "Test base",
        "arg": [[1,2,3,4,5,6,9]],
        "expected": 0
    }]', JSON_NUMERIC_CHECK);

foreach ($tests as $i=>$o) {
    $result = call_user_func('solution', ...$o['arg']);
    echo join(': ', [$o['name'],  strval($i)]);
    if (!is_array($o['expected'])) {
        echo ($result === $o['expected']) ? ' PASSED.' : ' FAILED.';
    } else {
        echo (json_encode($result) === json_encode($o['expected'])) ? ' PASSED.' : ' FAILED.';
    }
    var_dump($result);
}
