<br>
<p align="center">
  <u><big>|| <b>Fitbit Mental Health Watcher</b> ||</big></u>
</p>
<p align="center">Created By: Matt Luker
</p>
<p align="center">
    <!-- Matt Avatar/Logo -->
    <a href="https://github.com/jmlden36">
        <img src="https://avatars.githubusercontent.com/u/90112126?v=4" alt= "Matt Luker Profile" width="100" height="100" style="border-radius:50%">
    </a>
    <p align="center">
      ___________________________
    </p>
    <!-- GitHub Link -->
    <!-- Matt-->
    <p align="center">
        <a href="https://github.com/jmlden36">
            <strong>Matt Luker's GitHub</strong>
        </a>
    </p>
    <p align="center">
        <a href="https://www.linkedin.com/in/james-matt-luker/">
            <img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=plastic&logo=linkedin&colorB=2867B2">
        </a>
    </p>         
</p>

<p align="center">
  <small>Initiated February 11th, 2022.</small>
</p>

<!-- Project Links -->
<p align="center">
    <a href="https://github.com/jmlden36/Fitbit-Mental-Health-Watcher#readme"><big>Project Docs</big></a> ·
    <a href="https://github.com/jmlden36/Fitbit-Mental-Health-Watcher/issues"><big>Report Bug</big></a> ·
    <a href="https://github.com/jmlden36/Fitbit-Mental-Health-Watcher/issues"><big>Request Feature</big></a>
</p>
<p align="center">
___________________________
</p>

### Table of Contents
* <a href="#-about-the-project">About the Project</a>
    * <a href="#-description">Description</a>
    * <a href="#-known-bugs">Known Bugs</a>
    * <a href="#-built-with">Built With</a>
* <a href="#-getting-started">Getting Started</a>
    * <a href="#-prerequisites">Prerequisites</a>
    * <a href="#-setup-and-use">Setup and Use</a>
* <a href="#-license">License</a>
* <a href="#-research-and-planning-log">Research and planning log</a>

    

___________________________


## About the Project

### Fitbit Mental Health Watcher Description
Mental Health Watcher is a React application that allows a user to connect to their Fitbit smart watch and record specific time ranges of heartrate data to save for future viewing.  

## Component Diagram
<a>
        <img src="./mental-health-watcher/src/img/Capstone Diagram.jpg">
    </a>


### Known Bugs

* There are no known bugs

### Built With
* [Visual Studio Code](https://code.visualstudio.com/)
* [JavaScript](https://www.javascript.com/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [React](https://reactjs.org/)
* [React-Redux](https://react-redux.js.org/)
* [Firebase](https://firebase.google.com/?gclid=CjwKCAiAvaGRBhBlEiwAiY-yMHtpl0n10ERGEfaA5Wo8fY1H4kVlvYVfWTcq49WpqF2XCmeL5W3vghoCKpYQAvD_BwE&gclsrc=aw.ds)
* [Firebase Authentication](https://firebase.google.com/docs/auth)
* [webpack](https://webpack.js.org/)
* [Fitbit web API](https://dev.fitbit.com/build/reference/web-api/)
* [D3.js](https://d3js.org/)
___________________________


## Getting Started

### Prerequisites

#### Code Editor

  To view or edit the code, you will need an code editor or text editor. I recommend VisualStudio Code.

  1) Code Editor Download:[VisualStudio Code](https://code.visualstudio.com/)
  2) Click the download most applicable to your OS and system.
  3) Wait for download to complete, then install -- Windows will run the setup exe and macOS will drag and drop into applications.
  4) Optionally, create a [GitHub Account](https://github.com)
  5) You will need VisualStudio Live Server to play this game
  6) You will need VisualStudio Code Live Share Extension in order to play with multiple users

### Setup and Use

  #### Cloning

  1) Navigate to the [Mental Health Watcher repository here](https://github.com/jmlden36/Fitbit-Mental-Health-Watcher/tree/main).
  2) Click 'Clone or download' to reveal the HTTPS url ending with .git and the 'Download ZIP' option.
  3) Open up your system Terminal or GitBash, navigate to your desktop with the command: `cd Desktop`, or whichever location suits you best.
  4) Clone the repository to your desktop: `$ git clone https://github.com/jmlden36/tap-room`
  5) Run the command `cd Fitbit-Mental-Health-Watcher` to enter into the project directory.
  6) View or Edit:
      * Code Editor - Run the command `code .` to open the project in VisualStudio Code for review and editing.
      * Text Editor - Open by double clicking on any of the files to open in a text editor.

  #### Download

  1) Navigate to the [Mental Health Watcher repository here](https://github.com/jmlden36/Fitbit-Mental-Health-Watcher/tree/main).
  2) Click 'Clone or download' to reveal the HTTPS url ending with .git and the 'Download ZIP' option.
  3) Click 'Download ZIP' and unextract.
  4) Open by double clicking on any of the files to open in a text editor.
  
  #### Obtaining Fitbit Developer Authorization Token
  
  1) Make sure you have a Fitbit versa 3 or Sense smartwatch and that you have a fitbit account.  When you have an account navigate to the [fitbit developer page](https://dev.fitbit.com/getting-started/) to create a developer account.  
  2) Make sure you are logged in to dev.fitbit.com and click the manage tab and then select Register An App.  Fill out all of the appropriate fields.  None of the URL's have to be actual websites but they must be filled in.  The Redirect URL must be ``http://localhost``.  Default access can be set to Read & Write.  Click the save button and some information will be generated for you such as ClientID and Client Secret.
  3) At the bottom of the page that holds your ClientId click on the OAuth 2.0 tutorial page link.  Choose implicit grant flow and use the values from the previous page to fill in the relevant data into the pages form.  Choose heartrate as a selected scope and choose 604800 as the token expiration time.  This will give you an 8 day access token that can be refreshed as needed.  When all of the required fields are filled out their will be a authorization URL that is generated.  Click that authorization URL and you will be redirected to a user authorization page.  Click allow all data and then click the allow button.  You will be redirected to a blank webpage that holds your authorization URL after the # symbol in the pages URL.  Copy and paste that part of the URL into the provided text field and you will get a long access token.
  4) You will now have an access token!
  5) Create a .env file in the projects root directory.  In the .env use your new authorization token to enter code that looks like this 
  ```
  REACT_APP_API_KEY=Bearer AuthOrIzationKeyHere
  ```
  6) You now have access to the heartrate data from your Fitbit smartwatch!
  
  #### Create a firebase database for your data
  1) add directions for firebase config info and variables to add to .env

  #### Launch the application
  1) Make sure you have the project open in your code editor and have navigated to the project directory in your terminal
  2) In your terminal while in the project directory use the command ```npm install```
  3) Next use the command npm run start to launch the application in your browser

  

  #### Using the application
  1) Click the `Sign Up` button in the upper left corner and create an account with an email and password
  2) After you create an account click `Sign In` and enter your account information
  3) After you submit click `Home` and then you can start creating events with a start time and stop time that will show you your heart rate every minute between those times and will also generate a line graph of the data
  4) To view an events details click on the event and you will be directed to the details page that holds all of the event heart rate data 
  5) To delete an event click the `delete event` button on the event details page
  6) When you are finished click `log out` and then click the log out button

### License

```
MIT License

Copyright (c) 2021 Matt Luker.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
___________________________