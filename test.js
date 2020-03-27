class Animal {
  constructor(name, voice) {
    this.name = name;
    this.voice = voice;
    this.say = function () {
      console.log("I say: " + this.voice);
    }
  }
}

class Cat extends Animal {
  constructor(name, voice) {
    super(name, voice);
    this.beСute = function () {
      console.log("Purrrrrrr....purrrrr.....")
    }
  }
}

class Dog extends Animal {
  constructor(name, voice) {
    super(name, voice);
    this.guard = function () {
      console.log("Step aside, strrrrrrranger!")
    }
  }
}

let dog = new Dog("Spike", "gav-gav!");
let cat = new Cat("Barsik", "meow-meow!")

console.log(dog.name);
dog.say();
dog.guard();

console.log(cat.name);
cat.say();
cat.beСute();