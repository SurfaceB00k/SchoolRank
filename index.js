const api = require('dcard');
const utils = require('./utils/util');
const fs = require('fs');
const FETCH_NUM = 20000;
let curPostId = 225797012;
let stopPostId = curPostId - FETCH_NUM;
let schoolCount = {};

const getPost = api.posts.getPost;

const processor = (res) => {
  if (res) {
    post = res;
    if (post.school && schoolCount[post.school] != undefined) {
      console.log(`Paring school ${curPostId} ${post.school} ${schoolCount[post.school] + 1}`);
      schoolCount[post.school] = schoolCount[post.school] + 1;
    } else if (post.school) {
      console.log(`Paring school ${curPostId} ${post.school}`);
      schoolCount[post.school] = 1;
    }
  }

  curPostId--;
  console.log(`Parsing ${curPostId}...`);
  loop(curPostId, stopPostId);
};

const loop = (postId, stopPostId) => {
  if (postId >= stopPostId) {
    return getPost(postId, {}).then(processor).catch((e) => {
      curPostId--;
      console.log(`Parsing ${curPostId}...`);
      loop(curPostId, stopPostId);
    });
  } else {
    console.log(schoolCount);
    let finalCount = [];
    Object.keys(schoolCount).forEach((k) => {
      let school = {};
      school[k] = schoolCount[k];
      finalCount.push(school);
    });

    finalCount.sort(utils.compare);
    const countList = JSON.stringify(finalCount, null, 4);
    fs.writeFile('./count.json', countList, 'utf-8', function (err) {
      if (!err) {
        console.log('No errs!');
      }
    });
  }
};

loop(curPostId, stopPostId).then(() => {
  console.log('done ...');
});
