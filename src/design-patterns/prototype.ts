abstract class Prototype {
    abstract clone(): Prototype;
}

class ConcretePrototype1 extends Prototype {
    constructor(
        readonly id: number,
        readonly name: string
    ) {
        super();
    }

    override clone(): ConcretePrototype1 {
        return new ConcretePrototype1(this.id, this.name);
    }
}

class ConcretePrototype2 extends Prototype {
    readonly id: number;
    readonly name: string;
    constructor(data: { id: number, name: string }) {
        super();
        this.id = data.id;
        this.name = data.name;
    }

    override clone(): ConcretePrototype2 {
        return new ConcretePrototype2({ id: this.id, name: this.name });
    }
}

export class Client {
    private prototypes: Prototype[] = [
        new ConcretePrototype1(1, 'first'),
        new ConcretePrototype1(2, 'second'),
        new ConcretePrototype2({ id: 3, name: 'third' }),
        new ConcretePrototype1(4, 'fourth'),
        new ConcretePrototype2({ id: 5, name: 'fifth' }),
    ]

    someOperation(): void {
        this.prototypes.forEach(prototype => {
           const clonedPrototype = prototype.clone();
           console.log(clonedPrototype);
           console.log(clonedPrototype === prototype);
           console.log('-------');
        });
    }
}
