'use strict'

// Production build-time Client IDs cho Weha Markdown.
// Webpack DefinePlugin (xem build/webpack.prod.conf.js) ưu tiên giá trị từ process.env
// nếu có, nếu không fallback sang các hằng ở đây. Giá trị phải là chuỗi JSON (có dấu "").
module.exports = {
  NODE_ENV: '"production"',
  GOOGLE_CLIENT_ID: '"483543053924-sguvcajqbsp2k8lhck9q1m9inkap7bkq.apps.googleusercontent.com"',
  GOOGLE_API_KEY: '"AIzaSyCKiYkuflBIIwEA_hGIyiLj-SPUYE2fHqc"',
}
