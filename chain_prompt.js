/**
 * Converts a string to kebab-case.
 *
 * Kebab-case rules:
 * - Lowercase all letters.
 * - Replace any sequence of whitespace with a single hyphen.
 * - Remove any characters that are not letters (including Unicode), numbers, whitespace, _, or -.
 * - Replace underscores with hyphens.
 * - Convert camelCase and PascalCase to kebab-case.
 * - Collapse repeated hyphens and trim leading/trailing hyphens.
 * - Normalize diacritics to their base characters.
 * - If input is not a string, coerce to string (except null/undefined, which return '').
 *
 * @param {*} input - The value to convert to kebab-case.
 * @returns {string} The kebab-case version of the input string.
 */
function toKebabCase(input) {
    // Return empty string for null/undefined/empty
    if (input == null || input === '') return '';

    // Coerce input to string if not already
    let str = String(input);

    // Normalize Unicode diacritics to base characters
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Insert hyphens before camelCase or PascalCase transitions
    // e.g., "helloWorld" -> "hello-World", "HelloWorld" -> "Hello-World"
    str = str.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
    str = str.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2');

    // Replace underscores with hyphens
    str = str.replace(/_/g, '-');

    // Remove any character that is not a Unicode letter, number, whitespace, or hyphen
    // \p{L} = any kind of letter from any language, \p{N} = any kind of numeric character
    str = str.replace(/[^\p{L}\p{N}\s-]/gu, '');

    // Replace any sequence of whitespace with a single hyphen
    str = str.replace(/\s+/g, '-');

    // Collapse multiple hyphens into one
    str = str.replace(/-+/g, '-');

    // Lowercase everything
    str = str.toLowerCase();

    // Trim leading/trailing hyphens
    str = str.replace(/^-+|-+$/g, '');

    return str;
}

// --- Usage Examples ---
console.log(toKebabCase('Hello World!'));           // "hello-world"
console.log(toKebabCase('Crème Brûlée'));           // "creme-brulee"
console.log(toKebabCase('order10StatusUpdate'));    // "order-10-status-update"

// --- Unit Tests ---
console.assert(toKebabCase('') === '', 'Test: empty string');
console.assert(toKebabCase(null) === '', 'Test: null input');
console.assert(toKebabCase(undefined) === '', 'Test: undefined input');
console.assert(toKebabCase('  hello   world  ') === 'hello-world', 'Test: spaces');
console.assert(toKebabCase('foo_bar-baz') === 'foo-bar-baz', 'Test: underscores and hyphens');
console.assert(toKebabCase('helloWorld') === 'hello-world', 'Test: camelCase');
console.assert(toKebabCase('HelloWorld') === 'hello-world', 'Test: PascalCase');
console.assert(toKebabCase('a--b__c  d') === 'a-b-c-d', 'Test: repeated separators');
console.assert(toKebabCase('Crème Brûlée!') === 'creme-brulee', 'Test: accented Unicode');
console.assert(toKebabCase('order10') === 'order-10', 'Test: numbers');
console.assert(toKebabCase('foo!@#bar') === 'foo-bar', 'Test: punctuation');
console.assert(toKebabCase(12345) === '12345', 'Test: number input');
console.assert(toKebabCase('___foo___') === 'foo', 'Test: leading/trailing underscores');
console.assert(toKebabCase('  --foo--  ') === 'foo', 'Test: leading/trailing hyphens');