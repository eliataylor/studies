int arrayMaxConsecutiveSum(std::vector<int> inputArray, int k) {
    int mx = 0;
    for(int i = 0; i < k; i++) mx += inputArray[i];
    int s = mx;
    for(int i = k; i < inputArray.size(); i++) {
        s -= inputArray[i-k];
        s += inputArray[i];
        mx = std::max(mx, s);
    }
    return mx;
}
