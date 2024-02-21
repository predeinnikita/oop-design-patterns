interface IFileLoader {
    getBigFile(): Promise<{ id: number, name: string }>
}

export class FileLoader implements IFileLoader {
    constructor() {
        // too long creating
        for (let i = 0; i < Math.pow(10, 10); i++) {}
    }

    getBigFile(): Promise<{ id: number; name: string }> {
        return Promise.resolve({ id: 1, name: 'file' });
    }
}

export class ProxyFileLoader implements IFileLoader {
    private loader?: FileLoader;

    getBigFile(): Promise<{ id: number; name: string }> {
        if (!this.loader) {
            this.loader = new FileLoader();
        }

        return this.loader.getBigFile();
    }
}

// without proxy
// takes too long to create when calling the constructor
const loader1: IFileLoader = new FileLoader();
loader1.getBigFile().then(console.log);
//
// // with proxy
const loader2: IFileLoader = new ProxyFileLoader();
// // takes too long just when calling the method
loader2.getBigFile().then(console.log);

