import AbstractCommand from './abstractCommand';


export default class CommandManager {
  private undoStack = [];
  private redoStack = [];

  executeCommand(command: AbstractCommand, args: any) {
    command.execute(args);
    this.undoStack.push(command);
    if (this.redoStack.length > 0) {
      this.redoStack = [];
    }

  }

  undo() {
    if (this.undoStack.length > 0) {
      const command = this.undoStack.pop();
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const command = this.redoStack.pop();
      command.execute();
    }
  }




}