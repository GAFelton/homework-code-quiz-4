# Homework #4: Code Quiz

## Goal:

To create a responsive quiz web-app that uses localStorage to hold high scores and  JavaScript functions to control the questions and buttons.

![Code Quiz Screenshot](./assets/screenshot-code-quiz.jpg)

[Link to Deployed Page](https://gafelton.github.io/homework-code-quiz-4/)



## Description:

This coding quiz challenge was fun! There were many parameters to consider - the HTML/CSS, the timer, the button controls, using localStorage, and more. I gave myself the added challenge of not using Bootstrap, which helped me figure out exactly what bootstrap's column system is doing. 

I started with pseudocode to try and get my thoughts in order, particularly for the data structure for the questions:

```javascript
/* CODE QUIZ PSEUDOCODE
question storage: Array for each question. Each question is an object. Within each object, there are three parameters: Question, Possible Answers[], Correct Answer Index.

on button click, start timer.
display questions:
-each question has 4 possible answers. (display answers in random order)
-on correct answer click, say "Correct" and move to the next question.
-on incorrect answer click, say "Incorrect", deduct 15 seconds from timer, and move to the next question.
q1
q2
q3
q4
q5
-Hard code as little as possible so that questions are easy to add/remove. Quiz duration, number of possible answers, the order randomizer are all based on quizArray.length.

Game Over: When timer = 0 or when user completes all questions, end the quiz.
Input form to save initials and score (to localStorage). Sort initials in descending order, show highest score.
*/
```

Big thanks to my tutor @Matthew Chen, who helped me figure out the possible answers order randomizer! I'd also like to thank my brother, Peter, who helped me debug a couple tricky syntax errors. 
After the initial setup and figuring out the data structure, my work was split into a couple main areas:

* Rendering the questions & handling Answer clicks, including validation.
* Controlling the timer, making sure it stopped when needed and translated into score.
* Displaying the various pages and creating links to retake or start the quiz.
* Storing new high score entries as objects in an array, which is then pushed & pulled from localStorage.

I also had fun coming up with basic JavaScript questions. The next version of this quiz app should include an area for code snippets in questions, track which question the user is on (ex. #2/12), and the ability for the user to set difficulty (a.k.a. time per question, which is currently set to 15 seconds/question).
