const { is } = require('effector');

function splitMap(source, cases) {
  const result = {};

  let current = is.store(source) ? source.updates : source;

  for (const key in cases) {
    if (key in cases) {
      const fn = cases[key];

      result[key] = current.filterMap(fn);
      current = current.filter({
        fn: (data) => !fn(data),
      });
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  result.__ = current;

  return result;
}

module.exports = { splitMap };
