import Node from './node';
export default class Tree {
	constructor(arr) {
		this.root = this.buildTree(arr);
	}

	buildTree(arr) {
		const duplicatesRemoved = [...new Set(arr)];
		const sorted = duplicatesRemoved.sort(this.ascendingSort);
		return this.buildTreeHelper(sorted);
	}

	ascendingSort = (a, b) => {
		return a - b;
	};

	buildTreeHelper = (arr) => {
		if (arr.length == 0) {
			return null;
		}
		const halfIndex = Math.floor(arr.length / 2);
		const rootNode = new Node(
			arr[halfIndex],
			this.buildTreeHelper(arr.slice(0, halfIndex)),
			this.buildTreeHelper(arr.slice(halfIndex + 1))
		);
		return rootNode;
	};

	insert = (value) => {
		const newNode = new Node(value);
		if (!this.root) {
			this.root = newNode;
		}
		let currNode = this.root;
		while (value != currNode.data) {
			if (value < currNode.data) {
				if (currNode.left) {
					currNode = currNode.left;
				} else {
					currNode.left = newNode;
				}
			} else {
				if (currNode.right) {
					currNode = currNode.right;
				} else {
					currNode.right = newNode;
				}
			}
		}
	};

	delete = (value) => {
		if (this.root.data == value) {
			const replacementValue = this.nextBiggestNode(this.root).data;
			this.delete(replacementValue);
			this.root.data = replacementValue;
		} else {
			let parentNode = this.findParent(value, this.root);

			if (parentNode.data) {
				if (value < parentNode.data) {
					let currNode = parentNode.left;
					if (!currNode.left && !currNode.right) {
						parentNode.left = null;
					}
					if (currNode.left && currNode.right) {
						const replacementValue = this.nextBiggestNode(currNode).data;
						this.delete(replacementValue);
						currNode.data = value;
					}
					if (currNode.left) {
						parentNode.left = currNode.left;
					} else {
						parentNode.left = currNode.right;
					}
				}
				if (value > parentNode.data) {
					let currNode = parentNode.right;
					if (!currNode.left && currNode.right) {
						parentNode.right = null;
					}
					if (currNode.left && currNode.right) {
						const replacementValue = this.nextBiggestNode(currNode).data;
						this.delete(replacementValue);
						currNode.data = value;
					}
					if (currNode.left) {
						parentNode.right = currNode.left;
					} else {
						parentNode.right = currNode.right;
					}
				}
			}
		}
	};

	nextBiggestNode = (startNode) => {
		let currNode = startNode.right;
		while (currNode.left) {
			currNode = currNode.left;
		}
		return currNode;
	};

	findParent(value, parentNode) {
		if (!parentNode) {
			return null;
		}
		if (value < parentNode.data && parentNode.left) {
			if (parentNode.left.data === value) {
				return parentNode;
			}
			return this.findParent(value, parentNode.left);
		}
		if (value > parentNode.data && parentNode.right) {
			if (parentNode.right.data === value) {
				return parentNode;
			}
			return this.findParent(value, parentNode.right);
		}
		return null;
	}

	find = (value) => {
		if (this.root) {
			if (this.root.data === value) {
				return this.root;
			}
			// check left child
			const leftChildCheck = this.findHelper(value, this.root.left);
			if (value < this.root.data && leftChildCheck) {
				return leftChildCheck;
			}
			// check right child
			const rightChildCheck = this.findHelper(value, this.root.right);
			if (value > this.root.data && rightChildCheck) {
				return rightChildCheck;
			}
			return null;
		}
		return null;
	};

	findHelper = (value, node) => {
		if (node) {
			if (node.data === value) {
				return node;
			}
			if (value < node.data && this.findHelper(value, node.left)) {
				return this.findHelper(value, node.left);
			}
			if (value > node.data && this.findHelper(value, node.right)) {
				return this.findHelper(value, node.right);
			}
			return null;
		}
		return null;
	};

	levelOrder = (fn) => {
		let currNode = this.root;
		let queue = [];
		let outputArr = [];
		while (Boolean(currNode)) {
			if (fn) {
				fn(currNode);
			} else {
				outputArr.push(currNode.data);
			}

			if (currNode.left) {
				queue = [currNode.left, ...queue];
			}
			if (currNode.right) {
				queue = [currNode.right, ...queue];
			}
			currNode = queue.pop();
		}
		if (!fn) {
			return outputArr;
		}
	};

	// (left, root, right)
	inorder = (fn) => {
		let currNode = this.root;
		let outputArr = [];
		this.inorderHelper(fn, currNode, outputArr);
		if (!fn) {
			return outputArr;
		}
	};

	inorderHelper = (fn, node, arr) => {
		if (node == null) {
			return;
		}
		this.inorderHelper(fn, node.left, arr);
		if (fn) {
			fn(node);
		} else {
			arr.push(node.data);
		}
		this.inorderHelper(fn, node.right, arr);
	};

	// (root, left, right)
	preorder = (fn) => {
		let currNode = this.root;
		let outputArr = [];
		this.preorderHelper(fn, currNode, outputArr);
		if (!fn) {
			return outputArr;
		}
	};

	preorderHelper = (fn, node, arr) => {
		if (node == null) {
			return;
		}
		if (fn) {
			fn(node);
		} else {
			arr.push(node.data);
		}
		this.preorderHelper(fn, node.left, arr);
		this.preorderHelper(fn, node.right, arr);
	};

	// (left, right, root)
	postorder = (fn) => {
        let currNode = this.root;
        let outputArr = [];
        this.postorderHelper(fn, currNode, outputArr);
        if (!fn) {
            return outputArr;
        }
    };

	postorderHelper = (fn, node, arr) => {
		if (node == null) {
			return;
		}
		this.postorderHelper(fn, node.left, arr);
		this.postorderHelper(fn, node.right, arr);
        if (fn) {
            fn(node);
        } else {
            arr.push(node.data);
        }
	};

	height = (node) => {
		if (node == null) {
			return -1;
		}
		if (Boolean(node.left) != Boolean(node.right)) {
			if (Boolean(node.left)) {
				return this.height(node.left) + 1;
			}
			return this.height(node.right) + 1;
		}
		return Math.max(this.height(node.left), this.height(node.right)) + 1;
	};

	depth = (node) => {
		if (!this.find(node.data)) {
			return null;
		}
		let currNode = this.root;
		let depth = 0;
		while (currNode != node) {
			depth++;
			if (node.data < currNode.data) {
				currNode = currNode.left;
			} else {
				currNode = currNode.right;
			}
		}
		return depth;
	};

	isBalanced = () => {
		if (this.root == null) {
			return true;
		}
		if (Math.abs(this.height(this.root.left) - this.height(this.root.right)) <= 1) {
			return true;
		}
		return false;
	};

	rebalance = () => {
		const newArr = this.inorder();
		this.root = this.buildTree(newArr);
	};
}