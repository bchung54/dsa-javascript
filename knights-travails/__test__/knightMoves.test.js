import knightMoves from '../knightMoves';

/* it('should return [[6,5], [5,6]] for adjacent vertices of [7,7]', () => {
    expect(knightMoves([0, 1], [2, 2]).findAdjacentVertices([7, 7])).toEqual([
			[6, 5],
			[5, 6]
		]);
});

it('should return an array of length 63 for unvisited nodes when initialized', () => {
    const unvisited = knightMoves([0, 1], [2, 2]).unvisited;
    console.log(unvisited)
	expect(unvisited.length).toBe(63);
}); */

it('should return correct array for knightMoves function', () => {
	expect(knightMoves([0, 0], [1, 2])).toEqual([
		[0, 0],
		[1, 2]
	]);

	expect(knightMoves([0, 0], [3, 3])).toEqual([
		[0, 0],
		[1, 2],
		[3, 3]
	]);

	expect(knightMoves([3, 3], [0, 0])).toEqual([
		[3, 3],
		[2, 1],
		[0, 0]
	]);
});