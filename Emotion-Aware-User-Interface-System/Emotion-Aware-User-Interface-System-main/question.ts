import { Question } from '../types/exam';

export const examQuestions: Question[] = [
  {
    id: 1,
    text: "What is the primary purpose of React Hooks?",
    options: [
      "To add animations to components",
      "To manage state and lifecycle in functional components",
      "To style components",
      "To handle routing"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Which data structure uses LIFO (Last In First Out) principle?",
    options: [
      "Queue",
      "Stack",
      "Array",
      "Linked List"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "In object-oriented programming, what is encapsulation?",
    options: [
      "Creating multiple instances of a class",
      "Hiding internal state and requiring interaction through methods",
      "Inheriting properties from parent class",
      "Executing code in parallel"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "What is the time complexity of binary search?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "Which HTTP method is idempotent?",
    options: [
      "POST",
      "PUT",
      "PATCH",
      "All of the above"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    text: "What is the purpose of a database index?",
    options: [
      "To backup data",
      "To improve query performance",
      "To encrypt data",
      "To compress data"
    ],
    correctAnswer: 1
  },
  {
    id: 8,
    text: "In JavaScript, what does the 'this' keyword refer to?",
    options: [
      "The current function",
      "The global object",
      "The context in which a function is executed",
      "The previous object"
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    text: "What is the main advantage of using TypeScript over JavaScript?",
    options: [
      "Faster execution",
      "Static type checking",
      "Smaller file size",
      "Better browser compatibility"
    ],
    correctAnswer: 1
  },
  {
    id: 10,
    text: "What is a RESTful API?",
    options: [
      "A database management system",
      "An architectural style for designing networked applications",
      "A programming language",
      "A front-end framework"
    ],
    correctAnswer: 1
  }
];
