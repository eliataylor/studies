def gen_fib(n):
    fn = [0, 1]
    i = 2
    s = 2
    while s < n:
        s = fn[i - 2] + fn[i - 1]
        fn.append(s)
        i += 1
    return fn


def new_paths(A, n, last_pos, fn):
    """
    Given an array A of len n.
    From index last_pos which numbers in fn jump to a leaf?
    returns list: set of indexes with leaves.
    """
    paths = []
    for f in fn:
        new_pos = last_pos + f
        if new_pos == n or (new_pos < n and A[new_pos]):
            paths.append(new_pos)
    return path


def solution(A):
    n = len(A)
    if n < 3:
        return 1

    # A.append(1) # mark final jump
    fn = sorted(gen_fib(100000)[2:])  # Fib numbers with 0, 1, 1, 2..  clipped to just 1, 2..
    # print(fn)
    paths = set([-1])  # locate all the leaves that are one fib jump from the start position.

    jump = 1
    while True:
        # Considering each of the previous jump positions - How many leaves from there are one fib jump away
        paths = set([idx for pos in paths for idx in new_paths(A, n, pos, fn)])

        # no new jumps means game over!
        if not paths:
            break

        # If there was a result in the new jumps record that
        if n in paths:
            return jump

        jump += 1

    return -1


test = [0, 1, 0, 1, 1, 1, 0]
solution(test)
