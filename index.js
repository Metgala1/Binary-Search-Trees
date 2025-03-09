class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      const sortedArray = [...new Set(array.sort((a, b) => a - b))];
      const build = (arr, start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = build(arr, start, mid - 1);
        node.right = build(arr, mid + 1, end);
        return node;
      };
      return build(sortedArray, 0, sortedArray.length - 1);
    }
  
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  
    insert(value, node = this.root) {
      if (node === null) {
        return new Node(value);
      }
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
      return node;
    }
  
    deleteItem(value, node = this.root) {
      if (node === null) {
        return node;
      }
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        if (node.left === null) {
          return node.right;
        } else if (node.right === null) {
          return node.left;
        }
        node.data = this.minValue(node.right);
        node.right = this.deleteItem(node.data, node.right);
      }
      return node;
    }
  
    minValue(node) {
      let minv = node.data;
      while (node.left !== null) {
        minv = node.left.data;
        node = node.left;
      }
      return minv;
    }
  
    find(value, node = this.root) {
      if (node === null || node.data === value) {
        return node;
      }
      if (value < node.data) {
        return this.find(value, node.left);
      }
      return this.find(value, node.right);
    }
  
    levelOrder(callback) {
      if (!callback) {
        throw new Error("Callback is required.");
      }
      if (!this.root) return;
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    inOrder(callback, node = this.root) {
      if (!callback) {
        throw new Error("Callback is required.");
      }
      if (node) {
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
      }
    }
  
    preOrder(callback, node = this.root) {
      if (!callback) {
        throw new Error("Callback is required.");
      }
      if (node) {
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
      }
    }
  
    postOrder(callback, node = this.root) {
      if (!callback) {
        throw new Error("Callback is required.");
      }
      if (node) {
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
      }
    }
  
    height(node) {
      if (node === null) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node, root = this.root, edgeCount = 0) {
      if (node === null || root === null) return -1;
      if (node.data === root.data) return edgeCount;
      if (node.data < root.data) {
        return this.depth(node, root.left, edgeCount + 1);
      } else {
        return this.depth(node, root.right, edgeCount + 1);
      }
    }
  
    isBalanced(node = this.root) {
      if (node === null) return true;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  
    rebalance() {
      const nodes = [];
      this.inOrder((node) => nodes.push(node.data));
      this.root = this.buildTree(nodes);
    }
  }
  
  function generateRandomArray(size, max) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * max));
    }
    return arr;
  }
  
  const randomArray = generateRandomArray(20, 100);
  const tree = new Tree(randomArray);
  
  console.log("Is Balanced:", tree.isBalanced());
  console.log("Level Order:");
  tree.levelOrder((node) => console.log(node.data));
  console.log("Pre Order:");
  tree.preOrder((node) => console.log(node.data));
  console.log("In Order:");
  tree.inOrder((node) => console.log(node.data));
  console.log("Post Order:");
  tree.postOrder((node) => console.log(node.data));
  
  tree.insert(101);
  tree.insert(102);
  tree.insert(103);
  tree.insert(104);
  
  console.log("Is Balanced after unbalancing:", tree.isBalanced());
  
  tree.rebalance();
  
  console.log("Is Balanced after rebalancing:", tree.isBalanced());
  console.log("Level Order:");
  tree.levelOrder((node) => console.log(node.data));
  console.log("Pre Order:");
  tree.preOrder((node) => console.log(node.data));
  console.log("In Order:");
  tree.inOrder((node) => console.log(node.data));
  console.log("Post Order:");
  tree.postOrder((node) => console.log(node.data));