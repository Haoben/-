// 递归深拷贝
export const deepClone = function(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

// 防抖
let globe_timer
export const debounce = function(fn, time) {
  if (globe_timer) clearTimeout(globe_timer)
  globe_timer = setTimeout(() => {
    fn()
    globe_timer = null
  }, time)
}

// 节流
export const throttle = function(fn, delay, atleast) {
  let timer = null
  let previous = null
  return function() {
    let now = +new Date()
    if (!previous) previous = now
    if (atleast && now - previous > atleast) {
      fn()
      previous = now
      clearTimeout(timer)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn()
        previous = null
      }, delay)
    }
  }
}

// 数组去重
// arr 需要被去重的正常复杂数组
// field 判定每一项是否重复的凭证 如id
// _arr 只要传入该值，便默认arr参数已经没有重复的项，然后函数返回
// 两个数组合并、并去重过后的新增的值
export const unique = function(arr, filed, _arr = []) {
  let empty_obj = {}
  let aggregate = [...arr, ..._arr].reduce((cur, next) => {
    empty_obj[next[filed]] ? '' : (empty_obj[next[filed]] = true && cur.push(next))
    return cur
  }, []) // 设置cur默认类型为数组，并且初始值为空的数组
  // console.log(aggregate)
  return _arr.length ? aggregate.slice(arr.length) : aggregate
}
