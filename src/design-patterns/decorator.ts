// Classic decorator

interface IComponent {
    operation(value: number): Promise<number>;
}

class Component implements IComponent {
    operation(value: number): Promise<number> {
        return new Promise(resolve => {
            setTimeout(() => resolve(Math.pow(value, 2)), 2000)
        });
    }
}

/**
 * Cache decorator
 */
class CachedComponent implements IComponent {
    private cache: Map<number, number> = new Map<number, number>();

    constructor(
        private component: Component
    ) {}

    operation(value: number): Promise<number> {
        if (this.cache.has(value)) {
            return Promise.resolve(this.cache.get(value));
        }
        return this.component.operation(value).then(result => {
            this.cache.set(value, result);

            return result;
        });
    }
}

export async function applyOperations() {
    console.log('Classic decorator');
    const component: IComponent = new CachedComponent(new Component());

    console.log(await component.operation(1));
    console.log(await component.operation(2));
    console.log(await component.operation(1));
}


// TypeScript decorator example

function Cache() {
    const cache = new Map<number, number>();

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const sourceMethod: Function = descriptor.value;
        descriptor.value = function(value: number, ...args: any[]): any {
            if (cache.has(value)) {
                return Promise.resolve(cache.get(value));
            }
            return sourceMethod.apply(this, [value]).then((response: number) => {
                cache.set(value, response);

                return response;
            });
        }
    }
}


class OtherComponent implements IComponent {

    @Cache()
    operation(value: number): Promise<number> {
        return new Promise(resolve => {
            setTimeout(() => resolve(Math.pow(value, 2)), 2000)
        });
    }
}

export async function applyOtherOperations() {
    console.log('TypeScript decorator');
    const component: IComponent = new OtherComponent();

    console.log(await component.operation(1));
    console.log(await component.operation(2));
    console.log(await component.operation(1));
}