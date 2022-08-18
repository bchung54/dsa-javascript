const knightMoves = (start, end) => {
    let visited = [];
    let queue = [{
        pos: start,
        distance: 0,
        via: null
    }];

    const findAdjacentVertices = (position) => {
        const row = position[0];
        const col = position[1];
        return [row - 1, row + 1]
					.flatMap((row) => [col - 2, col + 2].map((col) => [row, col]))
					.concat([row - 2, row + 2].flatMap((row) => [col - 1, col + 1].map((col) => [row, col])))
                    .filter((pos) => !(pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7));
    };

    while (visited.find((element) => element.pos[0] == end[0] && element.pos[1] == end[1]) == undefined) {
        let currVertex = queue.shift();
        let currDistance = currVertex.distance + 1;
        let adjacentVertices = findAdjacentVertices(currVertex.pos);
        adjacentVertices.forEach((vertex) => {
            queue.push({
                pos: vertex,
                distance: currDistance,
                via: currVertex.pos
            });
        });
        visited.push(currVertex);
    };

    const backtrack = (vertex) => {
        if (vertex[0] == start[0] && vertex[1] == start[1]) {
            return [start];
        }
        let currNode = visited.find(node => node.pos[0] == vertex[0] && node.pos[1] == vertex[1]);
        let prevNode = visited.find(element => element.pos[0] == currNode.via[0] && element.pos[1]== currNode.via[1])
        return [...backtrack(prevNode.pos), vertex];
    };
    
    let output = backtrack(end);
    const endNode = visited.find((node) => node.pos[0] == end[0] && node.pos[1] == end[1]);
    
    endNode.distance == 1
			? console.log(`You made it in ${endNode.distance} move! Here's your path:`)
			: console.log(`You made it in ${endNode.distance} moves! Here's your path:`);
    output.forEach(element => console.log(element));

    return output;
};

export default knightMoves;