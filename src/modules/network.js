/**
 * Network functions
 *
 * @module network
 */

/**
 * Does a fetch request to a given API url address
 *
 * @param {string} url - API url
 * @param {boolean} useProxy - Use allorigins proxy
 * @param {object} options - Fetch options
 * @returns JSON data
 */
const doFetch = async (url, useProxy = false, options) => {
  if (useProxy) {
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('http error, code: ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('doFetch failed: ' + error.message);
  }
};

export {doFetch};
