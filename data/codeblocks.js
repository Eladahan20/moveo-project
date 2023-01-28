const codeBlocks = [
    {
      id: 1,
      title: "Tik-Tok",
      description: "This code block demonstrates how to make intervals. This is some basic and funny drills that outputs tik-tok as a normal clock would",
      img: "https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      code: `setInterval(() => {
        _______.log("Tick");
        setTimeout(() => {
          console.___("Tock");
        }, 500);
      }, 1000);`,
      solution: `setInterval(() => {
        console.log("Tick");
        setTimeout(() => {
          console.log("Tock");
        }, 500);
      }, 1000);`
    },
    {
      id: 2,
      title: "Rectangle Area Calculaction",
      description: "This code creating a simple function to calculate the area of a rectangle. This code defines a function called calculateArea that takes in two parameters, length and width, and returns the product of those two values",
      img: "https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      code: `function calculateArea(length, width) {
        return length * ______;
      }
      
      console.___(calculateArea(5, 10)); // Output: 50`,
      solution: `function calculateArea(length, width) {
        return length * width;
      }
      
      console.log(calculateArea(5, 10)); // Output: 50`
    },
    {
      id: 3,
      title: "Maaping Array",
      description: "This code is using map() to double the values in an array. The map() method applies the provided function to each element in the original array and returns a new array with the resulting values. ",
      img: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      code: `let numbers = [1, 2, 3, 4, 5];
      let doubledNumbers = numbers.___(function(number) {
        return ______ * 2;
      });
      console.log(doubledNumbers);`,
      solution:  `let numbers = [1, 2, 3, 4, 5];
      let doubledNumbers = numbers.map(function(number) {
        return number * 2;
      });
      console.log(doubledNumbers);`
    },
    {
      id: 4,
      title: "Object Greet",
      description: "Creating an object and adding a method to it,This code creates an object called person with properties for name, age, and a method called greet(). The greet() method logs a string that includes the value of the name property to the console. The last line of the code calls the greet() method on the person object, which logs the message to the console. ",
      img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      code: `let person = {
        name: "John",
        age: 30,
        greet: ________() {
          console.log('Hello, my name is {this.____}');
        }
      };
      person.greet();`,
      solution: `let person = {
        name: "John",
        age: 30,
        greet: function() {
          console.log('Hello, my name is {this.name}');
        }
      };
      person.greet();`
    }
  ];

  module.exports= codeBlocks;