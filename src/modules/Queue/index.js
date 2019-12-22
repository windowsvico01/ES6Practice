class Queue {
  constructor() {
    this.items = [];
  }
  /** 向尾部添加一个或者多个新的项 */
  enqueue(ele) {
    this.items.push(ele)
  }
  /** 移除队列中的第一项，并返回被移除的元素 */
  dequeue() {
    return this.items.shift();
  }
  /** 返回队列中的第一项 */
  front() {
    return this.items[0];
  }
  /** 返回队列是否为空 */
  isEmpty() {
    return this.items.length === 0;
  }
  /** 返回队列中包含的元素个数 */
  size() {
    return this.items.length;
  }
  /** 打印 */
  print() {
    console.log(this.items.toString());
  }
}
export default Queue;