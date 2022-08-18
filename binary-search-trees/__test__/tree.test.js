import Node from '../node';
import Tree from '../tree';

describe('Tree initialization: buildTree - build a binary search tree with sorted and unique nodes', () => {
	it('should return Node(0) for the root of buildTree([0])', () => {
        const testTree = new Tree([0]);
        expect(testTree.root).toMatchObject(new Node(0));
    });

    it('should return Node(2, Node(1), Node(3)) for the root of buildTree([3,2,1])', () => {
        const testTree = new Tree([3, 2, 1]);
        const matchNode = new Node(2, new Node(1), new Node(3));
        expect(testTree.root).toMatchObject(matchNode);
    });

    it('should return Node(3, Node(2, Node(1)), Node(4)) for the root of buildTree([3,2,1])', () => {
        const testTree = new Tree([3, 2, 4, 1]);
        const matchNode = new Node(3, new Node(2, new Node(1)), new Node(4));
        expect(testTree.root).toMatchObject(matchNode);
    });

    it('should return 8 for the root of buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])', () => {
        const longTestTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
        expect(longTestTree.root.data).toBe(8);
        expect(longTestTree.root.left.left.left.data).toBe(1);
        expect(longTestTree.root.right.right.data).toBe(6345);
    });
});

describe('Tree functions: insert, delete & find nodes', () => {
    it('should return Node(3, Node(2, Node(1)), Node(4)) when 1 is inserted to Tree([2, 3, 4])', () =>{
        const testTree = new Tree([2, 3, 4]);
        const matchNode = new Node(3, new Node(2, new Node(1)), new Node(4));
        testTree.insert(1);
        expect(testTree.root).toMatchObject(matchNode);
    });

    it('should return Node(3, Node(1, null, Node(2)), Node(4)) when 2 is inserted to Tree([1, 3, 4])', () => {
        const testTree = new Tree([1, 3, 4]);
        const matchNode = new Node(3, new Node(1, null, new Node(2)), new Node(4));
        testTree.insert(2);
        expect(testTree.root).toMatchObject(matchNode);
    });

    it('should return same tree when 3 is inserted to Tree([1, 3, 4])', () => {
        const testTree = new Tree([1, 3, 4]);
        const matchTree = new Tree([1, 3, 4]);
        testTree.insert(3);
        expect(testTree.root).toMatchObject(matchTree.root);
    });

    it('should return same object as Node(3, Node(2, Node(1))) when 4 is deleted from Tree([2, 3, 4, 1])', () => {
        const testTree = new Tree([2, 3, 4, 1]);
        const matchNode = new Node(3, new Node(2, new Node(1)));
        testTree.delete(4);
        expect(testTree.root).toMatchObject(matchNode);
    });

    it('should return same object as Node(4, Node(2, Node(1))) when 3 is deleted from Tree([2, 3, 4, 1])', () => {
        const testTree = new Tree([2, 3, 4, 1]);
        const matchNode = new Node(4, new Node(2, new Node(1)));
        testTree.delete(3);
        expect(testTree.root).toMatchObject(matchNode);
    });

    it('should return Node(2, Node(1)) for find(2)', () =>{
        const testTree = new Tree([2, 3, 4, 1]);
        const matchNode = new Node(2, new Node(1));
        expect(testTree.find(2)).toMatchObject(matchNode);
    });

    it('should return Node(6, Node(5), Node(7)) for find(6) of Tree([1, 2, 3, 4, 5, 6, 7])', () => {
        const testTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
        const matchNode = new Node(6, new Node(5), new Node(7));
        expect(testTree.find(6)).toMatchObject(matchNode);
        expect(testTree.find(8)).toBe(null);
    });
})

describe('Tree functions: order - levelOrder, inorder, preorder, postorder', () => {
    let testTree;

    beforeEach(() => {
        testTree = new Tree([1, 2, 3, 4]);
    });

	it('should return an array of values in correct order if no function is given', () => {
        expect(testTree.levelOrder()).toEqual([3, 2, 4, 1]);
		expect(testTree.inorder()).toEqual([1, 2, 3, 4]);
        expect(testTree.preorder()).toEqual([3, 2, 1, 4]);
        expect(testTree.postorder()).toEqual([1, 2, 4, 3]);
	});

    it('should yield each node to the given function in correct order', () => {
        const mockFn = jest.fn();
        testTree.levelOrder(mockFn);
        expect(mockFn).toHaveBeenNthCalledWith(1, testTree.root);
        expect(mockFn).toHaveBeenNthCalledWith(2, testTree.find(2));
        expect(mockFn).toHaveBeenNthCalledWith(3, testTree.find(4));
        expect(mockFn).toHaveBeenNthCalledWith(4, testTree.find(1));
    });
});

describe('Tree properties: height, depth', () => {
	let testTree;

	beforeEach(() => {
		testTree = new Tree([1, 2, 3, 4]);
	});

    it('should return 2 for the height of Tree([1, 2, 3, 4]).root', () => {
		expect(testTree.height(testTree.root)).toEqual(2);
	});

    it('should return 1 for the height of Node(2)', () => {
        expect(testTree.height(testTree.find(2))).toEqual(1);
    });

    it('should return 0 for the height of Node(1) & Node(4)', () => {
        expect(testTree.height(testTree.find(1))).toEqual(0);
        expect(testTree.height(testTree.find(4))).toEqual(0);
    });

    it('should return 2 for the depth of Node(1)', () => {
        expect(testTree.depth(testTree.find(1))).toEqual(2);
    });

    it('should return 1 for the depth of Node(2) & Node(4)', () => {
        expect(testTree.depth(testTree.find(2))).toEqual(1);
        expect(testTree.depth(testTree.find(4))).toEqual(1);
    });

    it('should return 0 for the depth of Node(3)', () => {
        expect(testTree.depth(testTree.find(3))).toEqual(0);
    });
});

describe('Tree balance methods: isBalanced, rebalance', () => {
    it('should return true for Tree([1, 3, 4]) but false for Tree([1, 3, 4]) when 5 & 7 are inserted', () => {
        const testTree = new Tree([1, 3, 4]);
        expect(testTree.isBalanced()).toBe(true);
        testTree.insert(5);
        testTree.insert(7)
        expect(testTree.isBalanced()).toBe(false);
    });

    it('should return Tree([1, 2, 3, 4]) when rebalancing Tree([1, 3, 4]).insert(2)', () => {
        const testTree = new Tree([1, 3, 4]);
        const matchTree = new Tree([1, 2, 3, 4]);
        testTree.insert(2);
        testTree.rebalance();
        expect(testTree.root).toMatchObject(matchTree.root);
    });
});

describe('Helpers', () => {
    it('should return Node(2, Node(1)) for findParent(1) in Tree([1, 2, 3, 4])', () => {
        const testTree = new Tree([1, 2, 3, 4]);
        expect(testTree.findParent(1, testTree.root)).toMatchObject(new Node(2, new Node(1)));
    });

    it('should return null for findParent(4) & findParent(0) in Tree([1, 2, 3, 4, 5, 6, 7])', () => {
        const testTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
        expect(testTree.findParent(4, testTree.root)).toBeNull();
        expect(testTree.findParent(0, testTree.root)).toBeNull();
    });

    it('should return root for findParent(6) & Node(6) for findParent(5) in Tree([1, 2, 3, 4, 5, 6, 7])', () => {
        const testTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
        expect(testTree.findParent(6, testTree.root)).toMatchObject(testTree.root);
        expect(testTree.findParent(5, testTree.root)).toMatchObject(new Node(6, new Node(5), new Node(7)));
    });
});

describe('Tie it all together:', () => {
    const randomArr = (length) => {
        if (length == 0) {
            return [];
        }
        return [Math.floor(Math.random() * 100), ...randomArr(length - 1)]
    };

    let randomTree;
    beforeEach(() => {
        randomTree = new Tree(randomArr(10));
    });

    it('should return true for a random balanced tree and print them out in specified order', () => {
        expect(randomTree.isBalanced()).toBe(true);
    });

    it('should output elements in correct order', () => {
        const orderedTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(orderedTree.levelOrder()).toMatchObject([5, 3, 8, 2, 4, 7, 9, 1, 6]);
        expect(orderedTree.inorder()).toMatchObject([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(orderedTree.preorder()).toMatchObject([5, 3, 2, 1, 4, 8, 7, 6, 9]);
        expect(orderedTree.postorder()).toMatchObject([1, 2, 4, 3, 6, 7, 9, 8, 5]);
    });

    it('should return false for an unbalanced tree and true once rebalanced', () => {
        randomTree.insert(150);
        randomTree.insert(250);
        randomTree.insert(350);
        randomTree.insert(450);
        randomTree.insert(550);
        expect(randomTree.isBalanced()).toBe(false);
        randomTree.rebalance();
        expect(randomTree.isBalanced()).toBe(true);
        /* console.log(`Level order: ${randomTree.levelOrder()}`);
        console.log(`In order: ${randomTree.inorder()}`);
        console.log(`Pre order: ${randomTree.preorder()}`);
        console.log(`Post order: ${randomTree.postorder()}`); */
    });
});