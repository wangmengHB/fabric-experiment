import AbstractCommand from './abstractCommand';



export default class CommandA extends AbstractCommand {
  private param = null;  

  execute(val) {
    if (val) {
      this.param = val;
    }

    // do sth with param
    console.log( `doing command A with ${this.param}`);
  }

  undo() {
    this.param;
    // calc the undo param

    // do anti - command 
    console.log( `undo command A with -${this.param}`);

  }

  

}

