class Node<NodeType extends HTMLElement = HTMLElement> {
    public node: NodeType;

    constructor(parentNode: HTMLElement | null, tagName = 'div', className = '', content = '') {
        const element = Node.setChild(parentNode, tagName, className, content);
        this.node = element as NodeType;
    }

    setAttribute(attributeName: string, attributeValue: string): void {
        this.node.setAttribute(attributeName, attributeValue);
    }

    append(element: HTMLElement): void {
        this.node.append(element);
    }

    destroy(): void {
        this.node.remove();
    }

    public static setChild(parentNode: HTMLElement | null, tagName = 'div', className = '', content = ''): HTMLElement {
        const element = document.createElement(tagName);
        element.className = className;
        element.textContent = content;
        if (parentNode) {
            parentNode.append(element);
        }

        return element;
    }
}

export default Node;
