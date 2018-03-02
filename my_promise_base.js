//链式调用：返回的是一个新的promise
function Promise(executor){
  let self  = this;
  self.status = 'pending';//等待状态
  self.value = undefined;//成功状态
  self.reason = undefined;//失败状态
  self.onResolvedCallBacks =[];
  self.onRejectedCallBacks =[];

  function resolve(value){
    if(self.status === 'pending'){
      self.value = value;
      self.status = 'resolved';
      self.onResolvedCallBacks.forEach(item=>item(self.value));
    }
  }
  function reject(reason){
        if(self.status === 'pending'){
          self.reason = reason;
          self.status = 'rejected';
          self.onRejectedCallBacks.forEach(item=>item(self.reason));
        }
  }
  try {//当执行器中有错误出现 会走线失败状态
    executor(resolve,reject)
  }catch(e){//有错误会走向失败;
    reject(e)
  }
}
Promise.prototype.then = function(onFulfilled,onRejected){
    let self = this;
    if(self.status === 'resolved'){
      onFulfilled(self.value);
    }
    if(self.status === 'rejected'){
      onRejected(self.reason);
    }
    if(self.status === 'pending'){
      self.onResolvedCallBacks.push(onFulfilled);
      self.onRejectedCallBacks.push(onRejected);
    } 
}
var p = new Promise(function(resolved,reject){
  reject('dasda')
});
p.then((data)=>{
   console.log(data)
  },(err)=>{
  console.log('err',err)
  })


