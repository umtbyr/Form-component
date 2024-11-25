export const countSquareBrackets = (data: string): number => {
    let openCount = 0;
    let pairCount = 0;

    for (const char of data) {
        if (char === "[") {
            openCount++;
        } else if (char === "]") {
            if (openCount > 0) {
                pairCount++;
                openCount--;
            }
        }
    }

    return pairCount;
};
