// Client IDs được webpack DefinePlugin inject lúc build (build/webpack.prod.conf.js).
// Cho phép deploy static thuần (không cần Express backend /conf endpoint).
// Set các env sau khi build:
//   GOOGLE_CLIENT_ID, GOOGLE_API_KEY,
//   GITHUB_CLIENT_ID,
//   DROPBOX_APP_KEY, DROPBOX_APP_KEY_FULL,
//   WORDPRESS_CLIENT_ID
/* global GOOGLE_CLIENT_ID, GOOGLE_API_KEY, GITHUB_CLIENT_ID */
/* global DROPBOX_APP_KEY, DROPBOX_APP_KEY_FULL, WORDPRESS_CLIENT_ID */

const pick = value => (value && value.length ? value : undefined);

export default {
  googleClientId: pick(typeof GOOGLE_CLIENT_ID !== 'undefined' ? GOOGLE_CLIENT_ID : ''),
  googleApiKey: pick(typeof GOOGLE_API_KEY !== 'undefined' ? GOOGLE_API_KEY : ''),
  githubClientId: pick(typeof GITHUB_CLIENT_ID !== 'undefined' ? GITHUB_CLIENT_ID : ''),
  dropboxAppKey: pick(typeof DROPBOX_APP_KEY !== 'undefined' ? DROPBOX_APP_KEY : ''),
  dropboxAppKeyFull: pick(typeof DROPBOX_APP_KEY_FULL !== 'undefined' ? DROPBOX_APP_KEY_FULL : ''),
  wordpressClientId: pick(typeof WORDPRESS_CLIENT_ID !== 'undefined' ? WORDPRESS_CLIENT_ID : ''),
  allowSponsorship: false,
};
