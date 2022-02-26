class Person {
  constructor(private _name: string) {}
  get name() {
    return this._name + 'dell';
  }
  set name(name: string) {
    const realName = name.split(' ')[0];
    this._name = realName;
  }
}

const person = new Person('dell');
console.log(person.name);
person.name = 'dell lel';
