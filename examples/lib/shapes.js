//HELP: I accidentally deleted the package lock file because I installed the wrong version of Jest
//Also need help on how to use Jest to test the project
const fs = require('fs');
const inquirer = require('inquirer');

class Shape {
  constructor(shapeColor) {
    this.shapeColor = shapeColor;
  }

  getShapeContent() {
    throw new Error('Child class must implement getShapeContent() method.');
  }
}

class Circle extends Shape {
  getShapeContent() {
    return `<circle cx="150" cy="100" r="80" fill="${this.shapeColor}" />`;
  }
}

class Triangle extends Shape {
  getShapeContent() {
    return `<polygon points="150,20 250,180 50,180" fill="${this.shapeColor}" />`;
  }
}

class Square extends Shape {
  getShapeContent() {
    return `<rect x="50" y="50" width="200" height="200" fill="${this.shapeColor}" />`;
  }
}

class LogoGenerator {
  constructor(text, textColor, shape, shapeColor) {
    this.text = text;
    this.textColor = textColor;
    this.shape = shape;
    this.shapeColor = shapeColor;
  }

  start() {
    this.promptText()
      .then(() => this.promptTextColor())
      .then(() => this.promptShape())
      .then(() => this.promptShapeColor())
      .then(() => this.generateLogo());
  }

  promptText() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
        validate: input => input.length <= 3 || 'Enter up to three characters',
      },
    ]).then(answers => {
      this.text = answers.text;
    });
  }

  promptTextColor() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (color keyword or hex number):',
      },
    ]).then(answers => {
      this.textColor = answers.textColor;
    });
  }

  promptShape() {
    return inquirer.prompt([
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
    ]).then(answers => {
      this.shape = answers.shape;
    });
  }

  promptShapeColor() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (color keyword or hex number):',
      },
    ]).then(answers => {
      this.shapeColor = answers.shapeColor;
    });
  }

  generateLogo() {
    const svgContent = this.render();
    fs.writeFileSync('logo.svg', svgContent);
    console.log('Generated logo.svg');
  }

  render() {
    const shape = this.createShape();
    const svgShapeContent = shape.getShapeContent();

    return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${svgShapeContent}<text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text></svg>`;
  }

  createShape() {
    switch (this.shape) {
      case 'circle':
        return new Circle(this.shapeColor);
      case 'triangle':
        return new Triangle(this.shapeColor);
      case 'square':
        return new Square(this.shapeColor);
      default:
        throw new Error('Invalid shape selected.');
    }
  }
}

module.exports = LogoGenerator;
