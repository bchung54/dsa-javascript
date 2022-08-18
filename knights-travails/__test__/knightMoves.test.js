import knightMoves from '../knightMoves';

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