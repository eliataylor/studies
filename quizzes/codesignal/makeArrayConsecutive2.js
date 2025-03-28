/*
Ratiorg got statues of different sizes as a present from CodeMaster for his birthday, each statue having an non-negative integer size. Since he likes to make things perfect, he wants to arrange them from smallest to largest so that each statue will be bigger than the previous one exactly by 1. He may need some additional statues to be able to accomplish that. Help him figure out the minimum number of additional statues needed.

 */
function makeArrayConsecutive2(sequence) {
    return Math.max(...sequence)-Math.min(...sequence)+1-sequence.length
}


function makeArrayConsecutive2Old(statues) {
    statues.sort((a,b) => a - b);
    console.log(statues);

    let more = 0;
    statues.forEach( (val, i) => {
        if (i > 0) {
            more += Math.max(0, val - statues[i-1] - 1);
            console.log(i + ' more ' + more);
        }
    })
    return more;
}
