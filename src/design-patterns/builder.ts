interface Maze {}

abstract class MazeBuilder {
    abstract buildMaze(): void;
    abstract buildRoom(room: number): void;
    abstract buildDoor(roomFrom: number, roomTo: number): void;
    abstract getMaze(): Maze;
}

// Every builder has own logic to build objects
class StandardMazeBuilder extends MazeBuilder {
    buildMaze(): void {}
    buildRoom(room: number): void {}
    buildDoor(roomFrom: number, roomTo: number): void {}
    getMaze(): Maze {
        throw new Error("Method not implemented.");
    }
}

class SuperMazeBuilder extends MazeBuilder {
    buildMaze(): void {}
    buildRoom(room: number): void {}
    buildDoor(roomFrom: number, roomTo: number): void {}
    getMaze(): Maze {
        throw new Error("Method not implemented.");
    }
}

class MazeGame {
    createMaze(mazeBuilder: MazeBuilder): Maze {
        mazeBuilder.buildMaze();
        mazeBuilder.buildRoom(1);
        mazeBuilder.buildRoom(2);
        mazeBuilder.buildDoor(1, 2);

        return mazeBuilder.getMaze();
    }
}

const game = new MazeGame();
const maze = game.createMaze(new SuperMazeBuilder())