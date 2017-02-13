const count = require('./count.json');
const fs = require('fs');
let cnt = 0;
for (let c of count.reverse()) {
  cnt += Object.values(c)[0];
  if (Object.values(c)[0] * 100 / 18768 >= 0.5) {
    console.log(Object.keys(c)[0], (Object.values(c)[0] * 100 / 18768).toFixed(2), Object.values(c)[0]);
  }
}

console.log(cnt);
