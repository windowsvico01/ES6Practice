import Graph from '../modules/Graph';
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('D', 'B');
graph.addEdge('F', 'B');
graph.addEdge('F', 'E');
graph.addEdge('E', 'C');
console.log(graph.toString());
/** 辅助函数，打印 */
const printNode = (value) => {
    console.log(`Visited vertex: ${value}`);
}
// graph.bfs('A', printNode);
console.log(graph.bfs('A'));
console.log(graph.dfs(printNode));
