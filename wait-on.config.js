// HACK: wait-on claims endpoint returning 404, when it's actually 200 thus breaking cypress test run commands
// see https://github.com/jeffbski/wait-on/issues/78#issuecomment-867813529
module.exports = {
  headers: { accept: 'text/html' },
};
