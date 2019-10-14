

export default abstract class AbstractCommand {
  abstract execute(val: any);
  abstract undo();
}

