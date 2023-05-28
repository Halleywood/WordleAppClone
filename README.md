# WordleAppClone
### Project Description
This is a Wordle game clone I built with the help of Ania Kubów from YouTube. It is really great to see women in the technology industry and to be able to learn from them. As a new developer, I have found coding alongside an experienced developer as a way to gain productive time on the keyboard and really see how much you can do with code. This application uses basic web fundamentals: JavaScript, CSS, and HTML. It was important for me to know how to build a front end application with the basics before I moved onto learning frameworks like React or Angular, I also think that the better my fundamental knowledge the more I can do with a framework. The backend is run with Node.js because it works seamlessly with the JavaScript on the front end, its fast and does not require lengthy coding. 

### Tools and Technologies: 
- JavaScript 
- CSS and HTML
- Node.js
- Express.js
- Axios 

### Development Approach 
- This application has very minimal HTML and CSS, it uses JavaScript to dynamically render the rows and boxes so that we can capture user input from both the keyboard letter strokes as well as the word guess. 
- It was first developed with a hardcoded 5 letter word to test all of the necessary logic like turning letters green, grey, or yellow and ensuring all of our JavaScript was manipiulating the DOM as intended. 
- Once the game logic was working, we could then set up http request to a Random word API to set the answer to a random 5 letter word at th beginning of the game. 
- The application also uses a Dictionary API to verify each guess is as an actual word. 

### Install and Play!
- Unfortunately, Heroku no longer offers a free deployment server where this site used to be hosted. However, the following installation instructions have been added so you have play right on your local machine. 
- 1.) Install Necessary Dependencies: 
    -  you will need Node and NPM in order to run this on your machine. 
    -  In your terminal run the following commands to check if you have Node and NPM already installed: 
    ```
    node -v
    npm -v 
    ```  
    - If you need to install them, you have visit https://nodejs.org for instructions on how to get the latest version. 
- 2.) Once you have installed the necessary dependencies, you can download the code from the GitHub either by downloading the zip file and extracting it OR cloning it into the directory of your choice. 
    - Simply go to github repositoy here: https://github.com/Halleywood/WordleAppClone and click the big green Code button to download or get the http address to clone it 
- 3.) Once downloaded, in your terminal navigate to the directory where you downloaded the code and run the following command: 
     ```
   npm start
    ```  
    - This will start the node server! 
    - It should automatically run on port 3000, but please take not of what port your server is running on. 
 - 4.) Now in the browser of your choice, navigate to: http://localhost:3000/ *OR* if your server if running on a different port, replace "3000" with the port your machine is running on. 
 - 5.) Have fun! 
