class Node<NodeType extends HTMLElement = HTMLElement>{
  public node: NodeType;

  constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = content;
    if (parentNode) {
      parentNode.append(element);
    }
    this.node = element as NodeType;
  }

  setAttribute(attributeName: string, attributeValue: string):void {
    this.node.setAttribute(attributeName, attributeValue);
  }

  destroy(): void {
    this.node.remove();
  }
  
}

export default Node;