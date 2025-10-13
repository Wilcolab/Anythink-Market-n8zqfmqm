/**
 * Converts a string to dot.case (lowercase words separated by dots).
 *
 * - Converts camelCase or PascalCase to dot.case (e.g., "myVariableName" → "my.variable.name").
 * - Replaces spaces, underscores, and hyphens with dots.
 * - Collapses multiple consecutive dots into a single dot.
 * - Converts the entire string to lowercase.
 * - Trims leading and trailing dots.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The dot.case formatted string.
 * @throws {Error} Throws if the input is not a string.
 */
function addNumbers(a, b) {
    if (a === undefined || b === undefined) {
        throw new Error('Both arguments must be provided.');
    }
    if (a === null || b === null) {
        throw new Error('Arguments cannot be null.');
    }
    if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
        throw new Error('Both arguments must be valid numbers.');
    }
    return a + b;
}

function toDotCase(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string.');
    }
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1.$2') // camelCase to camel.Case
        .replace(/[\s_-]+/g, '.')              // spaces, underscores, hyphens to dots
        .replace(/\.+/g, '.')                  // multiple dots to single dot
        .toLowerCase()
        .replace(/^\.+|\.+$/g, '');            // trim leading/trailing dots
}


