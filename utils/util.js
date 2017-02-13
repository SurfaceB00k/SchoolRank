function compare(a, b) {
  if (Object.values(a)[0] < Object.values(b)[0]) {
    return -1;
  }

  if (Object.values(a)[0] > Object.values(b)[0]) {
    return 1;
  }

  return 0;
};

module.exports = {
  compare: compare,
};
