// 它是一个类 高版本浏览器已经实现了promise类
//一旦成功就不会失败
//promise 许诺
// executor 执行器
// executor 包含两个参数{resolve:解决，reject:拒绝}
let fs  = require('fs');

let p = new Promise(function (resolve,reject){
  //成功或者失败的执行是我们自己决定的
  fs.readFile('./school.text','utf-8',function(err,data){
    if(err) reject(err)
    resolve(data);
  })
});
p.then(function(data){//成功的回调
console.log(data)
},function(error){//失败的回调
console.log(error)
})