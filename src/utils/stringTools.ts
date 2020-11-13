/**
 * Splits a Pascal-Case word into individual words separated by spaces.
 * Source: https://gist.github.com/JeffJacobson/3841577
 * @param {Object} word
 * @returns {String} Splitted into words
 */
export function splitPascalCase(word: string) {
    const result = word.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
    // return match ? match.join(' ') : match;
}

/**
 * Capitalizes the first letter of string
 * @param string given string to capitalize
 */
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
