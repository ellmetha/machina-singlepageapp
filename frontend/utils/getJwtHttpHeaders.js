/*
 * Returns the required header to access protected API urls.
 */
export default function getJwtHttpHeader(token) {
  return { Authorization: 'JWT ' + token };
}
