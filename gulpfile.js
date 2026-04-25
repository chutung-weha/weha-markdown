const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');

// NOTE (2026-04): the original StackEdit gulpfile appended
// `prism-!(*.min).js` (a glob over ALL prism components) AFTER the curated
// list. node-glob sorts ASCII-alphabetically, which loads `prism-javadoc.js`
// BEFORE `prism-javadoclike.js`. javadoc.js calls
// `Prism.languages.javadoclike.addSupport(...)` at top level and crashes
// the bundle with "Cannot read properties of undefined (reading 'addSupport')".
// We drop the glob and ship only the 8 explicit components — those are all
// StackEdit actually highlights. Adding more later requires explicit
// dependency-aware ordering.
const prismScripts = [
  'prismjs/components/prism-core',
  'prismjs/components/prism-markup',
  'prismjs/components/prism-clike',
  'prismjs/components/prism-c',
  'prismjs/components/prism-javascript',
  'prismjs/components/prism-css',
  'prismjs/components/prism-ruby',
  'prismjs/components/prism-cpp',
].map(require.resolve);

gulp.task('build-prism', () => gulp.src(prismScripts)
  .pipe(concat('prism.js'))
  .pipe(gulp.dest(path.dirname(require.resolve('prismjs')))));
