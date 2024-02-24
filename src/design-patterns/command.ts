interface ICommand {
    execute(): void;
    cancel(): void;
}

let result = 2;

class Add implements ICommand {
    constructor(readonly value: number) {}

    execute(): void {
        result = result + this.value;
    }

    cancel(): void {
        result = result - this.value;
    }
}

class Diff implements ICommand {
    constructor(readonly value: number) {}

    execute(): void {
        result = result - this.value;
    }

    cancel(): void {
        result = result + this.value;
    }
}

// 2 - 3 - 4 + 5 + 12 -3
const commands: ICommand[] = [
    new Diff(3),
    new Diff(4),
    new Add(5),
    new Add(12),
    new Diff(3),
];

// execute all commands
commands.forEach(command => {
    command.execute();
})

// cancel all commands
commands.forEach(command => {
    command.cancel();
})
