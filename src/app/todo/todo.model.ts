export class Todo {
  constructor(public name: string, public id?: number) {
    if (id === undefined) {
      this.id = Math.floor(Date.now() * Math.random());
    }
  }
}
