
import { Roadmap } from '@/types/roadmap';

export const dummyRoadmaps: Roadmap[] = [
  {
    id: '1',
    name: 'Web Development',
    description: 'A comprehensive roadmap to become a full-stack web developer',
    createdAt: '2023-06-12T10:30:00Z',
    updatedAt: '2023-06-12T10:30:00Z',
    items: [
      {
        id: '1-1',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the basic building blocks of websites. Master HTML5 semantic elements and CSS styling including Flexbox and Grid layouts.',
        timeEstimate: '2-3 weeks',
        order: 1,
        resources: [
          'MDN Web Docs - HTML',
          'CSS Tricks - Complete Guide to Flexbox',
          'Web.dev - Learn CSS'
        ]
      },
      {
        id: '1-2',
        title: 'JavaScript Basics',
        description: 'Get comfortable with JavaScript syntax, variables, data types, functions, and control flow. Learn DOM manipulation.',
        timeEstimate: '4-6 weeks',
        order: 2,
        resources: [
          'JavaScript.info',
          'Eloquent JavaScript Book',
          'FreeCodeCamp - JavaScript Algorithms and Data Structures'
        ]
      },
      {
        id: '1-3',
        title: 'Frontend Framework',
        description: 'Choose and master a modern frontend framework like React, Vue, or Angular. Build component-based UI applications.',
        timeEstimate: '8-10 weeks',
        order: 3,
        resources: [
          'React Documentation',
          'Vue.js Guide',
          'Angular Tutorial'
        ]
      },
      {
        id: '1-4',
        title: 'Backend Development',
        description: 'Learn a backend language/framework (Node.js, Python/Django, Ruby on Rails). Understand REST APIs, databases, and server-side concepts.',
        timeEstimate: '10-12 weeks',
        order: 4,
        resources: [
          'Node.js Documentation',
          'Express.js Guide',
          'MongoDB University'
        ]
      },
      {
        id: '1-5',
        title: 'DevOps & Deployment',
        description: 'Learn version control with Git, CI/CD pipelines, and how to deploy applications to cloud platforms like AWS, Azure, or Heroku.',
        timeEstimate: '3-4 weeks',
        order: 5,
        resources: [
          'GitHub Learning Lab',
          'AWS Free Tier Tutorials',
          'Heroku Getting Started Guide'
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Data Science',
    description: 'Master data science from statistics to machine learning',
    createdAt: '2023-07-05T14:15:00Z',
    updatedAt: '2023-07-05T14:15:00Z',
    items: [
      {
        id: '2-1',
        title: 'Mathematics & Statistics',
        description: 'Build a strong foundation in linear algebra, calculus, probability and statistics - the building blocks of data science.',
        timeEstimate: '6-8 weeks',
        order: 1,
        resources: [
          'Khan Academy - Linear Algebra',
          'MIT OpenCourseWare - Statistics for Applications',
          'StatQuest YouTube Channel'
        ]
      },
      {
        id: '2-2',
        title: 'Programming for Data Science',
        description: 'Learn Python or R programming language with a focus on data analysis libraries like pandas, numpy, and data visualization tools.',
        timeEstimate: '4-6 weeks',
        order: 2,
        resources: [
          'Python for Data Science Handbook',
          'DataCamp - Introduction to Python',
          'Kaggle Learn - Python'
        ]
      },
      {
        id: '2-3',
        title: 'Data Cleaning & Exploration',
        description: 'Master techniques for data wrangling, cleaning, preprocessing, and exploratory data analysis to prepare data for modeling.',
        timeEstimate: '3-4 weeks',
        order: 3,
        resources: [
          'Kaggle - Data Cleaning Challenge',
          'Towards Data Science - EDA Tutorials',
          'R for Data Science Book'
        ]
      },
      {
        id: '2-4',
        title: 'Machine Learning Fundamentals',
        description: 'Learn supervised and unsupervised learning algorithms, model evaluation techniques, and feature engineering.',
        timeEstimate: '8-10 weeks',
        order: 4,
        resources: [
          'Andrew Ng\'s Machine Learning Course',
          'Scikit-learn Documentation',
          'Machine Learning Crash Course by Google'
        ]
      },
      {
        id: '2-5',
        title: 'Deep Learning & AI',
        description: 'Explore neural networks, deep learning frameworks, and applications in computer vision, NLP, and reinforcement learning.',
        timeEstimate: '10-12 weeks',
        order: 5,
        resources: [
          'Deep Learning Specialization - Coursera',
          'fast.ai Practical Deep Learning',
          'TensorFlow Documentation'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'UX Design',
    description: 'Learn the principles and process of user experience design',
    createdAt: '2023-08-18T09:45:00Z',
    updatedAt: '2023-08-18T09:45:00Z',
    items: [
      {
        id: '3-1',
        title: 'UX Fundamentals',
        description: 'Understand the core principles of user experience design, including usability, accessibility, and information architecture.',
        timeEstimate: '2-3 weeks',
        order: 1,
        resources: [
          'Don Norman\'s "The Design of Everyday Things"',
          'UX Design Institute - Free Resources',
          'Interaction Design Foundation Courses'
        ]
      },
      {
        id: '3-2',
        title: 'User Research Methods',
        description: 'Learn various research methodologies to understand user needs, behaviors, and motivations. Master user interviews, surveys, and usability testing.',
        timeEstimate: '4-5 weeks',
        order: 2,
        resources: [
          'Just Enough Research by Erika Hall',
          'Nielsen Norman Group - Research Methods',
          'UserTesting University'
        ]
      },
      {
        id: '3-3',
        title: 'Wireframing & Prototyping',
        description: 'Create low and high-fidelity wireframes and interactive prototypes to test and communicate your design solutions.',
        timeEstimate: '3-4 weeks',
        order: 3,
        resources: [
          'Figma Tutorials',
          'Sketch Documentation',
          'Adobe XD Learn & Support'
        ]
      },
      {
        id: '3-4',
        title: 'Visual Design & UI',
        description: 'Develop a strong sense of visual design principles including typography, color theory, layout, and UI patterns.',
        timeEstimate: '6-8 weeks',
        order: 4,
        resources: [
          'Refactoring UI Book',
          'Material Design Guidelines',
          'Learn UI Design Blog'
        ]
      },
      {
        id: '3-5',
        title: 'UX Portfolio Development',
        description: 'Create compelling case studies and build a professional UX portfolio showcasing your process and problem-solving skills.',
        timeEstimate: '3-4 weeks',
        order: 5,
        resources: [
          'How to Create a UX Portfolio Without Experience',
          'UX Portfolio Formula Course',
          'Behance UX Portfolios'
        ]
      }
    ]
  }
];
