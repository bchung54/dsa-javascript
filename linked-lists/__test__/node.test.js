import createNode from '../node';

let testNode;

beforeEach(() => {
    testNode = createNode(5);
})

it('should return value of 5 for node(5).value', () => {
    expect(testNode.value).toBe(5);
});

it('should return value of null for node(5).nextNode', () => {
	expect(testNode.next).toBeNull();
});

it('should return value of 3 for node(5).nextNode.value', () => {
    testNode.setNext(createNode(3));
	expect(testNode.next.value).toBe(3);
});

it('should return node with null as default value', () => {
    testNode = createNode();
	expect(testNode.value).toBeNull();
});