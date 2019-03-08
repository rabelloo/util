/**
 * Returns whether or not string `whole` contains/includes string `part`
 * @param whole String to look in
 * @param part String to look for
 */
export function contains(whole: string, part: string): boolean {
  return includes(whole, part);
}
/**
 * Returns whether or not string `whole` contains/includes string `part`
 * @param whole String to look in
 * @param part String to look for
 */
export function includes(whole: string, part: string): boolean {
  return part == null || simplify(whole).includes(simplify(part));
}

/**
 * Formats a string by replacing keys with specified values
 * @param replacements Key/value pairs to replace on the `text`.
 * Can be any number of `Object` which will be replaced in order,
 * or `string` or `number` which will use each param index
 * @example
 * // With object
 * const obj = { thing: 'house', greeting: 'Hello' };
 * format('{greeting} {thing}!', obj , { thing: 'world' })
 * > 'Hello world!'
 *
 * // With params
 * format('{1} {0}!', 'world', 'Hello')
 * > 'Hello world!'
 */
export function format(
  text: string,
  ...replacements: (string | number | { [key: string]: string })[]
): string {
  if (!replacements.length) {
    return text.toString();
  }

  const args = getArgs(replacements);

  return Object.keys(args).reduce(
    (formattedString, key) =>
      formattedString.replace(new RegExp(`\\{${key}\\}`, 'gi'), args[key]),
    text.toString()
  );
}

/**
 * Simplifies a string (trims and lowerCases)
 */
export function simplify(s: string): string {
  return `${s}`.trim().toLowerCase();
}

/**
 * Transforms a camelCase string into a readable text format
 * @example textify('helloWorld!')
 * // Hello world!
 */
export function textify(text: string) {
  return text
    .replace(/([A-Z])/g, char => ` ${char.toLowerCase()}`)
    .replace(/^([a-z])/, char => char.toUpperCase());
}

// =======================================================================
//                            Private helpers
// =======================================================================

function getArgs(
  replacements: (string | number | { [key: string]: string })[]
) {
  if (isObject(replacements[0])) {
    return replacements.reduce((args, r) => Object.assign(args, r), {});
  }
  return replacements;
}

function isObject(input: any): input is Object {
  return input instanceof Object && !(input instanceof Array);
}
