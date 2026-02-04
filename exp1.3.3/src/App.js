import React from 'react';
import './App.css';
// Base Person class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  introduce() {
    return `Hello, my name is ${this.name}.`;
  }
}
// Student class inherits from Person
class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I'm studying ${this.major}.`;
  }
}

// Teacher class inherits from Person
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I teach ${this.subject}.`;
  }
}
function App() {
  const person = new Person('Mumukshu', 20);
  const student = new Student('Mumukshu Jain', 20, 'Computer Science');
  const teacher = new Teacher('Ms.Amandeep kaur', 45, 'FullStack');
  return (
    <div className="min-h-screen bg-white-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl  font-bold border-5  border-black mb-8">Person Class Hierarchy</h1>
        {/* Person Card */}
        <div className="bg-gray-400 p-8 rounded-2xl shadow-sm mb-6">
          <h2 className="text-3xl font-bold mb-4">{person.name} (Person)</h2>
          <p className="text-2xl mb-4">Age: {person.age}</p>
          <p className="text-2xl italic text-gray-700">{person.introduce()}</p>
        </div>
        {/* Student Card */}
        <div className="bg-gray-400 p-8 rounded-2xl shadow-sm mb-6">
          <h2 className="text-3xl font-bold mb-4">{student.name} (Student)</h2>
          <p className="text-2xl mb-4">Age: {student.age}</p>
          <p className="text-2xl italic text-gray-700 mb-4">{student.introduce()}</p>
          <p className="text-2xl">Major: {student.major}</p>
        </div>
        {/* Teacher Card */}
        <div className="bg-gray-400 p-8 rounded-2xl shadow-sm mb-6">
          <h2 className="text-3xl font-bold mb-4">{teacher.name} (Teacher)</h2>
          <p className="text-2xl mb-4">Age: {teacher.age}</p>
          <p className="text-2xl italic text-gray-700 mb-4">{teacher.introduce()}</p>
          <p className="text-2xl">Teaching: {teacher.subject}</p>
        </div>
      </div>
    </div>
  );
}

export default App;