# miniature-telegram

Assignment: Code Quiz

Developer: Mehdi Mehrabani

For this week, we were tasked with building a timed coding quiz app with multiple-choice questions. In the week prior, our focus was on Web APIs and as a result, learning about this topic became extremely important in the success of building this app.

To be honest, I had no idea what Web API’s were until this assignment. The term API seems to be used all the time, and unless you are utilizing them for your own personal projects it's hard to understand the usefulness. For this reason, I had to brush up on the learning done during class before attempting this assignment.

API stands for Application Programming Interface. In it's most basic form, an a API is the middle man between two softwares.

There are two types of Web APIs: Browser APIs and Third-Party APIs. For this assignment, we used browser APIs in combination with Javascript to create the Code Quiz app.

To understand what APIs are, see below two examples:

1. Per MuleSoft:

> "When you use an application on your mobile phone, the application connects to the Internet and sends data to a server. The server then retrieves that data, interprets it, performs the necessary actions and sends it back to your phone. The application then interprets that data and presents you with the information you wanted in a readable way."

MuleSoft link [What is an API?](https://www.mulesoft.com/resources/api/what-is-an-api)

2. Per MDN Web Docs:

> "think about the electricity supply in your house, apartment, or other dwellings. If you want to use an appliance in your house, you plug it into a plug socket and it works. You don't try to wire it directly into the power supply — to do so would be really inefficient and, if you are not an electrician, difficult and dangerous to attempt."

MDN Web Docs link [Introduction to web APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)

In addition to understanding the basics of Web APIs, I wanted to know more on what qualities are required for an app to be successful. From my research, below are the top 5 qualities after you’ve come up with your world changing idea.

1. The Design – The app needs to look good
2. The User Interface – Interaction with the app should be easy
3. Cross Platform Functionality – Should be compatible with different operating systems
4. Speed – No one likes slow loading times.
5. Offline Usage – Not everyone has unlimited data.

If you want a good guide to building an app, check out this link [The beginner’s advanced guide to building an app](https://uxdesign.cc/break-it-down-or-the-making-of-an-app-part-i-b2f260c2dffb)

## ASSIGNMENT SUMMARY

The requirements for completing the Code Quiz App assignment were the following.

Upon loading the code quiz app:

1. When start button is clicked, user is presented with a question.

2. For each answer:

   a. If correct, user is presented with another question.

   b. If incorrect, time is subtracted from the clock

3. The game is over when:

   a. User answers all questions.

   b. Time reaches 0.

4. Once game is over, user can submit initials for high score list placement.

## Structure & Process of Writing Code

### Resources Used To Complete Assignment

- Bootcamp
- Udemy
- Google & GoogleDev Tools
- Youtube

### Steps Taken To Write Code

1. Create file structure
2. Draw a flow chart
3. Write pseudo-code
4. Design App
5. Begin writing code
6. Test
7. Debug
8. Research efficient ways of solving issues
9. Test
10. Debug
11. Submit

### File Structure

When git clone, you will find the following:

1. File: Index.html
2. File: README.md
3. Folder: Assets

   a. Folder: css

   - style.css

   b. Folder: js

   - script.js
   - questions.js

4. Folder: Vendors

   a. Folder: css

   - normalize.css

### App Design

I love applying my own flare when it comes to design, so I took time to make the app look fun. I assumed, when you’re taking a quiz, you’re preparing for an exam, and anything that can reduce stress and increase usability is a plus.

1. Font Family: For a more playful feel, I used google fonts family “Suez One” styling.

2. Color Theme: To increase user engagement, I used a mixture of orange, teal and pink. See image of the final app at the end of this readme.doc

3. Buttons: I applied a border radius to make edges a little softer for a more game type feeling. I also applied a hover effect for when the user places cursor directly on the button.

4. Timer: Instead of just writing “Time Remaining”, I used a circle with number ticking down once quiz starts.

### Writing Code

[A] HTML Structure

1. Header

   a. `<header>`

   b. `<nav>`

   - `<button>` - For the highscore click events in js
   - `<p>` & `<span>` - For the clock/timer

2. Main Body Section

   a. `<section>` - 6 sections:

   1. Intro
   2. Questions
   3. Initials
   4. Highscores:
   5. Game Over: When time runs out without all questions answered a game over screen will appear allowing user to play again.
   6. Answer Check: A `setTimeout` function to show and remove whether user quiz choice was correct or incorrect.

[B] Javascript Structure

1. Javascript Files: Main Code & Quiz Questions

- Separation Of Data For Debugging: The space occupied by the questions in the main .js file made for debugging a little more difficult. As a result, I created a new .js file to house the questions. By doing this, I freed myself of important space when reading the code.

2. Use Of Strict Mode For Debugging

- While going through some online tutorials, I came across this concept of "strict mode". From what I understand, javascript allows for simple errors to be bypassed, and by invoking the strict mode, you can catch these simple errors and debug on the spot.

3. Variables: Game Reload

- Whenever user loads the app, three variables are used to determine the initial app state:

a. `cTime = 75` - To start time at 75 seconds
b. `qCount = 0` - To start questions at question 1
c. `score = 0` - Score in this instance is based on the seconds left from cTime.

4. Variables: HTML

a. `var queryElement` - To get in the habit of writing clean and easier to read code, I wrote a function to shorten the referencing to html elements. The sorting of references are done based on html document logical order.

5. App Screen Change Operation

- For each section aside from the intro section, you'll find the word hidden referenced. In combination with css styling `display: none` and js `classList` DOM property, I'm able to hide sections by adding the word "hidden" to the html for each section that is not the focus.

6. To Start Quiz

- The starting of the quiz is based on an `addEventListener()' & `click event` which allows js to listen to when the user clicks on the "Start Quiz" button. Once clicked,

> The Intro Section classlist is updated to include 'hidden'
> The Questions Section classlist is updated to remove 'hidden'
> Start the question loading process by calling on the setQuestion() function.
> Start the countdown by calling on countdown() which reduces the initial 75secs clock by 1 second.
> Load highscores from local storage by calling on `init()`.

7. To Keep Track Of Time

- The timer functionality is placed under a function called `countdown()`. It's initialized once the start quiz button is clicked and will stop either when all questions have been answered or if time reaches 0. See below for further explanation.

  a. Scenerio 1: `cTime > 0 && qCount < quizData` Length (5 questions): Timer will only reduce by 1 sec.

  b. Scenerio 2: `cTime > 0 && qCount === quizData Length` (5 questions) - When user has answered all questions within the 75 seconds: game ends, initials section will appear for highscore list input and user score = cTime (time remaining).

  c. Scenerio 3: cTime = 0 - One of the rules to the code app was to reduce time with each wrong question answered. In my code quiz, each wrong answer reduces time by 20 seconds. As a result, if user gets multiple questions wrong and cTime = 0, the game over section will appear.

8. Quiz Data Questions File + Questions Loading & Changing Functionality

- questions.js File - The quiz questions are placed within an array. Each element of the array contains 6 data points (strings). For example, see below for question 1 or `quiaData[0]`.

```
  question: 'Inside which HTML element do we put the JavaScript?',
  a: '<javascript>',
  b: '<script>',
  c: '<js>',
  d: '<scripting>',
  correct: 'b',
```

- Questions Loading Functionality - The loading of the questions is done under a function called setQuestions(id). When user clicks on Start Quiz button, the `addEventListener()` will call on this function and set the first id to equal 0. Since the questions are housed under an array, `quiaData[0]` will match each answer and question with it's respective html element.

```
    questionEl.textContent = quizData[id].question;
    btnAnswer[0].textContent = quizData[id].a;
    btnAnswer[1].textContent = quizData[id].b;
    btnAnswer[2].textContent = quizData[id].c;
    btnAnswer[3].textContent = quizData[id].d;
```

- Questions Changing Functionality - The changing of questions functionality is done with a ` for loop`. Since each `btnAnswer` is a button, I placed a `addEventListener()` to loop / determine which button was clicked. Once determined, I wrote an if statement to check the clicked event vs. the correct answer from the quizData array. With each click, qCount is increased for the loading of next set of questions.

9. Initials + Highscores List + Local Storage Section

- It should be noted that this section took the most amount of time and our Bootcamp weekly activities were extremely helpful. In summary, after user submits initials, the scores and the initials are pushed into an array called highscoresArray[].

- What made this section difficult was the sorting of the highscoresArray[]. Even though the code itself did not take much space, it became one of those situations where I overthought the situation. I was able to solve the sorting by:

a. Under the `btnSubmit.addEventListener()`

> Push user submitted initials + score into the highscoresArray[].

> Sort the values based on the score.

b. Under `function renderHighscores()`

- Using the turnery operator when appending li list based on highscoresArray[] data.

10. High Score Nav Button & Initials Submit Buttons + Alert Box

- High Scores Nav Button - The high score nav button will only work so long as there are highscores available for user to view. If there are no highscores available, an alert will appear notifying user that no highscores are available.

- Initials Submit Button - The submit button will only work so long input is not empty. If empty, an alert will appear notifying user an empty field is not allowed.

### Key Learning Points

[A] GoogleDev BreakPoints For Logic Check – I think the biggest learning was done when utilizing the breakpoints event watcher. There were many instances where I could not understand what the issue was and had to just go step by step over each function to check the values. A great example was for the sorting of the high scores and converting the li creations from appearing as objects on the screen to the values the user submitted.

[B] Reload Function & localStorage.clear() – Each assignment I come across a simple way of doing something that might at first feel like it requires more work. For this assignment, the two I found were the reload page function for the “Go Back” button and the localStorage.clear() to clear the high scores list.

[C] High Score Nav Button Functionality - Understanding how to create a check to see if localstorage has any data for the prompt message when highscores list is empty.

# Image Of Final Assignment

![alt text](./assets/img/miniature-telegram.png)
