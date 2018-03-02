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
    let promise2;
    if(self.status === 'resolved'){
      return promise2 = new Promise(function(resolved,reject){
        let x = onFulfilled(self.value);
        if(x instanceof Promise){//当返回promise的实例时
          x.then(resolve,reject);
        }else{
          resolve(x);
        }
       
      })
    }
    if(self.status === 'rejected'){
      return promise2 = new Promise(function(resolved,reject){
        let x = onFulfilled(self.value);
        if(x instanceof Promise){
          x.then(resolve,reject);
        }else{
          resolve(x);
        }     
      })
    }
    if(self.status === 'pending'){
      return promise2 = new Promise(function(resolved,reject){
        self.onResolvedCallBacks.push(function(){
          let x = onFulfilled(self.value);
          if(x instanceof Promise){
            x.then(resolve,reject);
          }else{
            resolve(x);
          }  
        })
        self.onRejectedCallBacks.push(function(){
          let x = onRejected(self.value);
          if(x instanceof Promise){
            x.then(resolve,reject);
          }else{
            resolve(x);
          }  
        })
      })
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


