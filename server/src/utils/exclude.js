/**
 * Exclude a key from an object
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const exclude = (obj, ...keys) => {
  for (let key of keys) {
    delete obj[key];
  }
  return obj;
};
