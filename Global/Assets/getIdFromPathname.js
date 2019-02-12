/**
 * @file Utility to get the numerical Id from a pathname.
 * @copyright Copyright (c) 2017-present, ProReNata AB
 * @version 1.0.0
 * @module GlobalAssets/getFromPathname
 */

const PATHNAME_ID_RX = /^\/.*\/(\d+)\/?$/;

/**
 * This method gets the numerical Id from a pathname.
 *
 * @param {Array} args - The arguments array.
 * @param {string} args.pathname - The pathname to extract the Id from.
 * @param {*} [args.defaultValue] - The default value if no Id matched.
 * @returns {number} The extracted Id if matched; otherwise the defaultValue or -1.
 */
export default function getFromPathname(...args) {
  const [pathname, defaultValue] = args;
  const match = String(pathname)
    .trim()
    .match(PATHNAME_ID_RX);

  if (match) {
    return Number(match[1]);
  }

  return args.length > 1 ? defaultValue : -1;
}
