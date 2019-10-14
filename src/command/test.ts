import CommandManager from './CommandManager';
import CommandA from './CommandA';


const mgr = new CommandManager();
const cmd1 = new CommandA();
const cmd2 = new CommandA();
const cmd3 = new CommandA();
const cmd4 = new CommandA();


mgr.executeCommand(cmd1, 1);
mgr.executeCommand(cmd2, 2);
mgr.executeCommand(cmd3, 3);
mgr.executeCommand(cmd4, 4);

mgr.undo();
mgr.undo();
mgr.undo();
mgr.redo();
mgr.redo();
mgr.redo();



