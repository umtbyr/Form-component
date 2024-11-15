export function countSquareBrackets(input: String) {
    const matches = input.match(/\[\]/g);
    return matches ? matches.length : 0;
}
