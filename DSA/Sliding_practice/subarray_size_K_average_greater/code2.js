var numOfSubarrays = function (arr, k, threshold) {
    let windowSum = 0;
    let count = 0;
    let target = k * threshold;

    for (let i = 0; i < k; i++) {
        windowSum += arr[i]
    }

    if (windowSum >= target) {
        count++
    }

    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k]
        if (windowSum >= target) {
            count++
        }
    }
    return count
};