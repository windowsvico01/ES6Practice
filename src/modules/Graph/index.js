import Dictionary from '../Dictionary';
import Queue from '../Queue';
class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Dictionary();
  }

  /** 向图中添加顶点*/
  addVertex(v) {
    this.vertices.push(v);
    this.adjList.set(v, []); // 键对应的字典值为空
  }

  /** 添加顶点之间的边 */
  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
  }

  /** 打印图中的结构 */
  toString() {
    let s = '';
    this.vertices.forEach((vertex) => {
      s += `${vertex} -> `;
      const neighbors = this.adjList.get(vertex);
      neighbors.forEach((neighbor) => {
        s += `${neighbor} `;
      })
      s += '\n';
    })
    return s;
  }
  
  /** 广度优先遍历BFS 辅助函数 */
  initializeColor() {
    const color = {};
    this.vertices.forEach((vertex) => {
      color[vertex] = 'white';
    })
    return color;
  }
  /** 广度优先遍历BFS 函数 */
  bfs(v, callback) {
    const color = this.initializeColor(),
          queue = new Queue(),
          d = {}, // 从v到u的距离 d[u]
          pred = {}; // 用来推导从v到其他每个顶点u的最短路劲
    queue.enqueue(v);
    this.vertices.forEach((vertex) => {
      d[vertex] = 0;
      pred[vertex] = null;
    })
    while(!queue.isEmpty()) {
      const u = queue.dequeue(),
            neighbors = this.adjList.get(u);
      color[u] = 'grey';
      neighbors.forEach((item) => {
        if (color[item] === 'white') {
          color[item] = 'grey';
          d[item] = d[u] + 1;
          pred[item] = u;
          queue.enqueue(item);
        }
      })
      color[u] = 'black';
      if (callback) callback(u);
    }
    return {
      distances: d,
      predecessors: pred,
    };
  }
  /** 深度优先遍历DFS 函数 */
  dfs(callback) {
    let time = 0;
    const color = this.initializeColor(),
          d = {},
          f = {},
          pred = {};
    const dfsVisit = (u, color, callback) => {
      console.log(`discovered ${u}`);
      color[u] = 'grey';
      d[u] = ++time;
      if (callback) {
        callback(u);
      }
      var neighbors = this.adjList.get(u);
      neighbors.forEach((vertex) => {
        const w = vertex;
        if (color[w] === 'white') {
          pred[w] = u;
          dfsVisit(w, color, callback);
        }
      })
      color[u] = 'black';
      f[u] = ++time;
      console.log(`explored ${u}`);
    }
    this.vertices.forEach((vertex) => {
      f[vertex] = 0;
      d[vertex] = 0;
      pred[vertex] = null;
    })
    this.vertices.forEach((vertex) => {
      if (color[vertex] === 'white') dfsVisit(vertex, color, callback);
    })
    return {
      discovery: d,
      finished: f,
      predecessors: pred,
    };
  }
  

}

export default Graph;