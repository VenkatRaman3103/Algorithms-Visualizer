export const codeData = {
	binaryTree: `export class AvlTree {
	constructor() {
		this.root = null;
	}

	getHeight(node) {
		return node ? node.height : 0;
	}

	rotateRight(x) {
		let y = x.left;
		x.left = y.right;
		y.right = x;

		// update the height
		x.height =
			Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

		y.height =
			Math.min(this.getHeight(y.left), this.getHeight(y.right)) + 1;

		return y;
	}

	rotateLeft(x) {
		let y = x.right;
		x.right = y.left;
		y.left = x;

		x.height =
			Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

		y.height =
			Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

		return y;
	}

	add(value) {
		let stack = [];
		let traverse = this.root;
		const newNode = new Node(value);

		if (this.root === null) {
			this.root = newNode;
			return;
		}

		while (true) {
			stack.push(newNode);
			if (value < traverse.value) {
				if (traverse.left === null) {
					traverse.left = newNode;
					break;
				}
				traverse = traverse.left;
			} else if (traverse.value <= value) {
				if (traverse.right === null) {
					traverse.right = newNode;
					break;
				}
				traverse = traverse.right;
			}
		}

		while (stack.length > 0) {
			const current = stack.pop();

			current.height =
				Math.max(
					this.getHeight(current.left),
					this.getHeight(current.right),
				) + 1;

			const balance =
				this.getHeight(current.left) - this.getHeight(current.right);

			if (balance > 1 && value < current.left.value) {
				// Left-Left
				if (stack.length == 0) {
					this.root = this.rotateRight(current);
				} else {
					let parent = stack[stack.length - 1];

					if (parent.left == current) {
						parent.left = this.rotateRight(current);
					} else {
						parent.right = this.rotateRight(current);
					}
				}
			} else if (balance < -1 && value > current.right.value) {
				// Right-Right
				if (stack.length == 0) {
					this.root = this.rotateLeft(current);
				} else {
					let parent = stack[stack.length - 1];
					if (parent.right == current) {
						parent.right = this.rotateLeft(current);
					} else {
						parent.left = this.rotateRight(current);
					}
				}
			} else if (balance > 1 && value > current.left.value) {
				// Left - Right
				current.left = this.rotateLeft(current.left); // to left
				if (stack.length == 0) {
					this.root = this.rotateRight(current);
				} else {
					let parent = stack[stack.length - 1];

					if (parent.left == current) {
						parent.left = this.rotateRight(current);
					} else {
						parent.right = this.rotateRight(current);
					}
				}
			} else if (balance < -1 && value < current.right.value) {
				// Right - Left
				current.right = this.rotateRight(current.right); // to right

				if (stack.length == 0) {
					this.root = this.rotateLeft(current);
				} else {
					let parent = stack[stack.length - 1];
					if (parent.right == current) {
						parent.right = this.rotateLeft(current);
					} else {
						parent.left = this.rotateLeft(current);
					}
				}
			}
		}
	}

	inOrder(node, result = []) {
		if (node) {
			this.inOrder(node.left, result);
			result.push(node.value);
			this.inOrder(node.right, result);
		}
		return result;
	}

	preOrder(node, result = []) {
		if (node) {
			result.push(node.value);
			this.preOrder(node.left, result);
			this.preOrder(node.right, result);
		}
		return result;
	}

	postOrder(node, result = []) {
		if (node) {
			this.postOrder(node.left, result);
			this.postOrder(node.right, result);
			result.push(node.value);
		}
		return result;
	}

	print() {
		return JSON.stringify(this.root);
	}
}

export class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.height = null;
	}
}

const avlTree = new AvlTree();
avlTree.add(7);
avlTree.add(16);
avlTree.add(8);
avlTree.add(9);
avlTree.add(3);
avlTree.add(12);
avlTree.add(24);
avlTree.add(6);
console.log(avlTree.print());
console.log(avlTree.inOrder(avlTree.root));
console.log(avlTree.preOrder(avlTree.root));
console.log(avlTree.postOrder(avlTree.root));
`,
}
