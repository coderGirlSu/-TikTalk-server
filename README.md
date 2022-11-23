# TikTalk🎃, a MERN Application

TikTalk is a Halloween-themed chat application which allows people to communicate in groups. It is built with React, ExpressJS, NodeJS, and MongoDB (MERN stack). It has been deployed on AWS (EC2 instances) and Netlify.

---

- Production client app: https://www.tiktalkproject.com/ 

- Production backend service (JSON requests / responses): https://tiktalk-server.codergirlsu.dev

- Staging/Development client app: https://tiktalkdevelopment.netlify.app

- Staging/Development backend service (JSON requests / responses): http://tiktalk-dev-server.codergirlsu.dev

- Client Repo: https://github.com/hunteradams10/TikTalk-Client

- Server Repo: https://github.com/coderGirlSu/TikTalk-server

- Part A Documentation Repo: https://github.com/coderGirlSu/TikTalk-documentation

---

## Installation Guide

The production app can be found at https://www.tiktalkproject.com , where you can make an account, add friends to your group, and get chatting! If you're after a more local experience, please follow the instructions below.

Requirements:

- NodeJS 14.18.0 or later
- MongoDB (be sure to create an account!)

Server-Side:

- Create a new directory and call it whatever you want! We advise `TikTalk`, or something similar 😉
- `cd` into that folder, then create another folder called `tiktalk-server`, or whatever best suits you 😊
- Clone the server repo using the `CLI` from here: `git clone git@github.com:coderGirlSu/TikTalk-server.git`
- `cd` into that folder (you should see `git` initialize), then run `npm install` or `npm i` to download everything you need to get started!
- Open a terminal window, and run `npm start` - make sure you have MongoDB open!
- If all went well, you'll see the server start on port `80` in your terminal!

Client-Side:

- `cd` out of the `server` folder, make a new folder called `tiktalk-client`. `cd` into it, and run `git clone git@github.com:hunteradams10/TikTalk-Client.git`
- Open a terminal, make sure it's in the current directory, and run `npm i` or `npm install` to make sure that all the required files are downloaded into the `package.json`.
- In that terminal, run `npm start` to run the client-side application in a new browser window.
- The server will expect requests from `localhost:3000`, so it should all be good! Happy chatting! 🦇

---

## Libraries and Dependencies

- ` "cors": "^2.8.5"` - The `cors` library allows cross-origin resource sharing. This prevents cors issues when the back-end and front-end are trying to communicate with one-another.
- `"dotenv": "^16.0.3"` `dotenv` is what allows us to load environment variables into the `process.env`, instead of having it in the code body, which is a spooky security risk 👻
- `"express": "^4.18.2",` - `expressjs` is a NodeJs web framework that enabled us to build this application! It helps to manage routes and servers. The force is strong with this one. 💫
- `"firebase": "^9.13.0"` - `Firebase` took care of all our authentication and authorization for the application. It holds the keys to all the doors.

- `"firebase-admin": "^11.2.0"` - Firebase's node SDK allows us to control what environments can access the server (such as development or production), another security step 👮
- `"helmet": "^6.0.0"` - `helmet` allowed us to build safe HTTP headers, to add additional security to the back-end.
- `"mongoose": "^6.7.2"` - `mongoose` allows developers to point to a specific schema in the database. It is an ODM library for MongoDB.

## Dev-Dependencies (Server)

- `"jest": "^29.3.1"` - a Javascript testing framework to make sure all our code is nice and correct and working properly ☑️
- `"nodemon": "^2.0.20"` - `nodemon` will automatically refresh the application when changes are detected in the directory. Very handy and saved a lot of time! 
- `"supertest": "^6.3.1"` - `supertest` is a NodeJS testing library that allows us to test our API, the HTTPS servers.

## Dependencies (Client)

- `"react": "^18.2.0"` - `React` is a Javascript front-end framework developed by Facebooks. It helps developers build modular, scalable front-end user interfaces using components.
- `"react-dom": "^18.2.0"` - `react-dom` is a library that binds React to the Document Object Model. It is the reason that React can `render()` browser content.
-  `"react-router-dom": "^6.4.3"` - `react-router-dom` allows React applications to be SPA's (or Single Page Applications). It allows us to add extensions to the URL by creating `Routes` that navigate to different "Pages".
- `"react-scripts": "5.0.1"` - `react scripts` enables us to use additional scripts along with those that come with React natively. These can be use to create custom builds, say, for production.
- `"sass": "^1.56.1"` - `SASS` is a CSS-Compiler that allows us to write all of our CSS on one page, with nested descendents inside of ancestors. It also allows us to create custom colour variables! Neat.
- `"moment": "^2.29.4"` - `moment` allows us to show all the dates and times of messages correctly, ensuring that they are readable.
- `"node-sass": "^7.0.3"` - `node-sass` is what allows us to convert the `scss` into `css`. It is a `css` pre-processor.
- `"jwt-decode": "^3.1.2",` - `JWT decode` is a means to decode `jwt` tokens when they are sent from the back-end for authentication.
- `"axios": "^1.1.3"` - `Axios` is a Javascript library that allows us to use the `Promise API` with HTTP requests. It handles all such requests and returns a promise - the result of which can be handled in React.

---

## Environments

In this project we set up two environments. One environment is for development and the other is for production. Each environment is split into two parts. Part one is a front end server running in Netlify. Part two is a backend server running in AWS as an EC2 instance. Each environment also has its own instance of MongoDB and its own instance of firebase configured.

When either the front-end or the back end code starts, it reads environment variables to determine which environment it is running in. Using environment variables such as DB connection string, Firebase private key, API key and port number it can connect to the other related services in the same environment, such as the database or Firebase.

### AWS EC2 instances

In the screenshot below you can see the two EC2 instances running. One instance represents the development backend server and the other the production backend server. The backend servers use the node package `dotenv` to read environment files containing environment variables related to the specific environment they are in.

![](docs/environments%20screenshots/AWS%20EC2%20instances.png)

## Front-End Environments

Here is a screenshot of the two environments running on Netlify. One is a development environment, and the other is the production environment.

![dev and prod environments](./docs/front-end%20environments/both-enviros.png)

Just the front-end development environment, which is set to automatic deploys from Github:

![dev enviro](./docs/front-end%20environments/dev%20environment.png)

And the development environment, which is set to manual deploys from the `build` folder in React:

![prod enviro](./docs/front-end%20environments/prod%20enviro.png)

---

## API Endpoints

---
| Authentication      | Messages           | Groups                         |
| ------------------- | ------------------ | ------------------------------ |
| POST /users/sign-in | POST /messages/    | GET /groups/history?groupId=   |
| POST /users/sign-up |                    | PATCH /groups/leave            |
|                     |                    | PATCH /groups/add              |
|                     |                    | POST /groups/create            |
|                     |                    | GET /groups/                   |

---

## Testing

User Manual test logs

![](docs/test%20screenshots/Screen%20Shot%202022-11-23%20at%208.13.20%20pm.png)

### Frontend test coverage

![](docs/test%20screenshots/frontend%20tests.png)

### Backend server test coverage

![](docs/test%20screenshots/server%20test%20results.png)

---

### Postman server testing and error messages

User sign in

![](docs/test%20screenshots/sign%20in.png)


Sign in with invalid email
![](docs/test%20screenshots/sign%20in%20with%20invalid%20email.png)


Sign in with invalid password

![](docs/test%20screenshots/sign%20in%20with%20invalid%20password.png)

User sign up

![](docs/test%20screenshots/sign%20up.png)


Sign in with wrong password

![](docs/test%20screenshots/sign%20in%20with%20wrong%20eamil.png)


Sign up with invalid email

![](docs/test%20screenshots/sign%20up%20with%20invalid%20email.png)


Sign up with invalid password

![](docs/test%20screenshots/sign%20up%20with%20invalid%20password.png)

Sign up with registered email address

![](docs/test%20screenshots/sign%20up%20with%20registered%20email%20address.png)


Create a group

![](docs/test%20screenshots/create%20a%20group.png)


Add user to a group

![](docs/test%20screenshots/add%20user%20to%20a%20group.png)


Add existing user to a group

![](docs/test%20screenshots/Add%20existing%20user%20to%20a%20group.png)


Get all groups that user is in

![](docs/test%20screenshots/get%20all%20groups%20that%20user%20is%20in.png)

Get message history

![](docs/test%20screenshots/get%20history.png)


Leave a group as last user

![](docs/test%20screenshots/leave%20a%20gourp%20as%20last%20user.png)


Leave a group

![](docs/test%20screenshots/leave%20a%20group.png)


Send a message with invalid token


![](docs/test%20screenshots/send%20message%20with%20invalid%20token.png)

Send a message in a group

![](docs/test%20screenshots/send%20message.png)

---

## Application Screenshots

**Register**

![register](./docs/app%20screenshots/register.png)

**Login**

![login](./docs/app%20screenshots/login.png)

**Chat**

![chat](./docs/app%20screenshots/chat.png)

**Group Chat**

![group chat](./docs/app%20screenshots/group%20chat.png)

---

## Project Management

All of our project management was done in Trello. Initially, we separated our work into the following columns: `nice to have`, `must to have`, `back-end`, `front-end`, `README2` (for this README!), `doing`, `done`, `check` (for making sure certain things were definitely kept track of), and `ideas` (the initial ideas for the app). We thought of the most basic things we needed to do and made cards in their relevant columns, deciding what was most important all the way through to least important.

![login/sign-up](./docs/trello%20screenshots/login-sign-up.png)

![nice to have](./docs/trello%20screenshots/initial-nice-to-have.png)

We had a meeting and decided upon the initial ideas for the app features, and made cards for them:

![initial features](./docs/trello%20screenshots/initial-ideas.png)

We decided that Su would work primarily on the back-end, and Hunter on the front-end, according to our strengths. We added our names to each card that we'd be working on individually, time limits for the most important features, and a number system so that when a pull request was made on github, we could keep track of which number item we were creating the request for and mark it off in Trello.

![register](./docs/trello%20screenshots/register.png)

As the project grew, more cards were added with our names assigned, as well as fixes that needed to be done. Features like making the navbar sticky were added and assigned to the respective developer, and fixes that were being worked on currently were added to the `doing` column. As bugs came up, we added cards for them to keep track of them, and to remind ourselves to work on them.

![more components](./docs/trello%20screenshots/more-components.png)

![and more components](./docs/trello%20screenshots/even-more-cards.png)

We decided to try to implement a colour-coding system for which marking criteria each card was for, but this ended up being cumbersome and was abandoned. We began to work on back-end testing.

![some things done](./docs/trello%20screenshots/some-things-done.png)

As we neared our deadline, the `doing` column started to shrink:

![doing column shrink](./docs/trello%20screenshots/doing-colum-shrinking.png)

![shrinking-more](./docs/trello%20screenshots/shrink-more.png)

There were some small tasks that were added towards the end, once the main project was mostly done:

![almost-done](./docs/trello%20screenshots/nearing-end.png)

![done](./docs/trello%20screenshots/done.png)

---

## Commits and PRs

Below is evidence of the client and server side commits and PRs throughout the project. We worked together as a team and used upstream workflows and pull requests to make changes to the main code. We had two seperate repos for the client and server side, as the delegations based on our strengths made this approach more practical.

Client commits (over 130 total)

![](docs/github%20screenshots/client-commits.png)

Client PRs

![](docs/github%20screenshots/client-prs.png)

Server commits

![](docs/github%20screenshots/server-commits.png)

Server PRs

![](docs/github%20screenshots/server-prs.png)

## Reflection

It was a huge joy and a huge challenge to build this application, but Hunter Adams and Su Zhang are very proud of it. We found out that we didn't have enough time to implement every feature that we wanted to (such as a lightmode, drop-down for responsive Chats column), but intend to add these in future. The project-management, although it was a lifesaver, was a little bit cumbersome in its details and the PR card-numbering system was largely abandoned on the front-end, due to the amount of fixes and changes that needed to be made and the time limit in which to make them... and also some forgetfulness. The teamwork and communication, however, was almost flawless. Su and Hunter stayed in constant communication every step of the way. Due to the enormity of the front-end, Su and Hunter decided to work together on it once the back-end was finished, and this contributed enormously to the product being completed by the due date. The developers are enormously proud of their work.