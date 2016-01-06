import jwtToken from 'jsonwebtoken';

/*
 * Returns the decoded JWT token.
 */
export default function getJwtTokenPayload(token) {
  return jwtToken.decode(token);
}
