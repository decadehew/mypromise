const promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('成功...');
  //   // reject('失败');
  // }, 2000);
  // throw new Error('Err...')
  resolve('成功');
  // reject('失败');
  
});

promise.then().then().then(res => console.log(res));

// promise.then(success => {
//   console.log('1', success);
// }, error => {
//   console.log(error);
// });
// promise.then(success => {
//   console.log('2', success);
// }, error => {
//   console.log(error);
// });
// promise.then(success => {
//   console.log('3', success);
// }, error => {
//   console.log(error);
// });

function otherPromise () {
  return new MyPromise((resolve, reject) => {
    resolve('otherPromise');
  })
}

// promise
//   .then(success => {
//     console.log('我现在要返回 100 给下一个 then 方法作为参数');
//     return otherPromise();
//     // return 100;
//   })
//   .then(data => {
//     console.log('返回上一个 then 方法中 return 值', data)
//   })

// 防止 promise 对象自己返回自己
// const p1 = promise.then(res => p1);
// p1.then(res => res, err => console.log(err))
