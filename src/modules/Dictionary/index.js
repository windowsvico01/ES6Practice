class Dictionary {
  constructor() {
    this.items = {};
  }
  /** 判断是否包含某个键值 */
  has(key) {
    return key in items;
  }
  /** 向字典中添加新元素 */
  set(key, value) {
    this.items[key] = value;
  }
   /** 通过使用键值来移除对应的数据值 */
   remove(key) {
    if (this.has(key)) {
      delete this.items[key];
      return true;
    }
    return false;
  }
  /** 通过键值查找对应的数据值并返回 */
  get(key) {
    return this.has(key) ? this.items[key] : undefined;
  }
  /** 以数组的形式返回字典中所有values实例的值 */
  values() {
    const values = [];
    for (var k in this.items) {
      if (this.items.hasOwnProperty(k)) { // 验证items对象是否包含这个属性值
        values.push(this.items[k]);
      }
    }
    return values;
  }
  /** 清空字典 */
  clear() {
    this.items = {};
    return true;
  }
  /** 获取字典的size */
  size() {
    return Object.keys(this.items).length;
  }
  /** 返回字典中所有键名（数组的形式） */
  keys(){
    return Object.keys(this.items);
  }
}
// const Dictionary = () => {
//     const items = {};
//     /** 判断是否包含某个键值 */
//     this.has = (key) => {
//       return key in items;
//     }
//     /** 向字典中添加新元素 */
//     this.set = (key, value) => {
//       items[key] = value;
//     }
//     /** 通过使用键值来移除对应的数据值 */
//     this.remove = (key) => {
//       if (this.has(key)) {
//         delete items[key];
//         return true;
//       }
//       return false;
//     }
//     /** 通过键值查找对应的数据值并返回 */
//     this.get = (key) => {
//       return this.has(key) ? items[key] : undefined;
//     }
//     /** 以数组的影视返回字典中所有values实例的值 */
//     this.values = () => {
//       const values = [];
//       for (var k in items) {
//         if (items.hasOwnProperty(k)) { // 验证items对象是否包含这个属性值
//           values.push(items[k]);
//         }
//       }
//       return values;
//     }
//     /** 清空字典 */
//     this.clear = () => {
//       items = {};
//       return true;
//     }
//     /** 获取字典的size */
//     this.size = () => {
//       return Object.keys(items).length;
//     }
//     /** 返回字典中所有键名（数组的形式） */
//     this.keys = () => {
//       return Object.keys(items);
//     }
//   }
export default Dictionary;