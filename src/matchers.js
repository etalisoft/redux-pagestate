const matchers = {
  equal: a => b => a === b,
  lower: a => {
    const la = (a || '').toLowerCase();
    return b => la === (b || '').toLowerCase();
  },
  regex: a => b => RegExp(b).test(a),
};

export default matchers;
