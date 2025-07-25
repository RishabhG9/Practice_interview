const domTree = {
  tag: "div",
  id: "root",
  children: [
    {
      tag: "section",
      children: [
        { tag: "p", id: "intro" },
        {
          tag: "div",
          children: [
            { tag: "span", id: "highlight" },
            { tag: "a", id: "link1" }
          ]
        }
      ]
    },
    {
      tag: "footer",
      id: "footer"
    }
  ]
};

const findNodeById = (node, target) => {
  if (node.id == target) {
    return node
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findNodeById(child, target)

      if (found) {
        return found
      }
    }
  }

  return null
}
console.log(findNodeById(domTree, "highlight"));
// Returns: { tag: 'span', id: 'highlight' }

const findNodeByIdByIterative = (root, target) => {
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();

    if (node.id == target) {
      return node
    }

    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i])
      }
    }
  }

  return null
}

console.log(findNodeByIdByIterative(domTree, "highlight"));
