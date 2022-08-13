import Node from '../node';

let testNode;

beforeEach(() => {
    testNode = new Node(0, 'foo', 'bar');
})

it('should return 0 for the data of Node(0, \'foo\', \'bar\')', () => {
    expect(testNode.data).toBe(0);
});

it("should return 'foo' for the left child data of Node(0, 'foo', 'bar')", () => {
	expect(testNode.left).toBe('foo');
});

it("should return 'bar' for the right child data of Node(0, 'foo', 'bar')", () => {
	expect(testNode.right).toBe('bar');
});