class TextNode {
    private children: TextNode[] = [];

    constructor(private value: string) {}

    add(node: TextNode): void {
        this.children.push(node);
    }

    toString(): string {
        return this.children.reduce((result, current) => {
            return result + current.toString()
        }, this.value.toString());
    }

    remove(node: TextNode): void {
        this.children.splice(
            this.children.findIndex(child => child === node),
            1
        );
    }
}

export class LineNode extends TextNode {

    constructor(private line: string) {
        super(line);
    }

    public static create(line: string): LineNode {
        return new LineNode(line);
    }
}

export class CharacterNode extends TextNode {
    constructor(private character: string) {
        super(character);
    }

    public static create(character: string): CharacterNode {
        return new CharacterNode(character);
    }
}

export class ParagraphNode extends TextNode {
    constructor(private paragraph: string) {
        super(paragraph);
    }

    public static create(paragraph: string): ParagraphNode {
        return new ParagraphNode(paragraph);
    }
}

export class SpaceNode extends TextNode {
    constructor() {
        super(' ');
    }

    public static create(): SpaceNode {
        return new SpaceNode();
    }
}

export class NewLineNode extends TextNode {
    constructor() {
        super(`\n`);
    }

    public static create(): NewLineNode {
        return new NewLineNode();
    }
}

const paragraph = ParagraphNode.create('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
paragraph.add(NewLineNode.create())
paragraph.add(LineNode.create('Hello World'))
paragraph.add(SpaceNode.create())
paragraph.add(CharacterNode.create('!'))

console.log(paragraph.toString())