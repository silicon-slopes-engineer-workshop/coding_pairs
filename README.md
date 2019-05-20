<h1 align="center">CODEWITHME</h1>
<p>A MERN app used to make a "smart" pairs for pair coding.</p>
<div align="center">




[![CircleCI](https://img.shields.io/circleci/project/github/mui-org/material-ui/next.svg)]()
[![Coverage Status](https://img.shields.io/codecov/c/github/mui-org/material-ui/next.svg)]()
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/1320/badge)]()
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![PeerDependencies](https://david-dm.org/mui-org/material-ui/next/peer-status.svg?path=packages/material-ui)]()

</div>




## User Stories - App 
1. Sign up process for each member creating a profile with basic skills levels, pair coding preferences (work with strong/weak etc.)  
2. Upon arrival to a meet up user is to click tasks desried for the day somehow and is matched with another programmer, handle odd group total to pair one group with, this happens only after all present have clicked in so to speak 
3. Phase 2 Stretch Features, Bugs, Enhancements, UI Polishing, comments/notes, login, security for the API, styling pizazz and custom desgin stuff if desired, Some type of history/tracking maybe - like who teh user paired with and what they did etc. 


### TECH STACK
- MERN (w/hooks) +Dockerized - deployed with Netlify and Heroku

### Repo Rules (pending discussion and/or approval - subject to change - still in progress) 
- You cannot approve your own PR - so two pairs of eyes on ALL PRs.
- Write clean code, Code to Spec, write tests(TBD), plan each task first (pseudocode) for example:
```
- DETAILED screen-by-screen design layouts with annotations describing all UI/UX components and all data relevant to the screen, back end story board as well 
```
- Pair code each Isssue if possible leveling up each task, assigned a pair in class or otherwise on Slack
- Use a template or process for creating "Issues" whihc got to "TO DO" and are tracked items in the KANBAN board.
-- Reference Article: [Acceptance criteria](http://www.payton-consulting.com/user-stories-create-acceptance-criteria/)
```
Pattern: Input - process - output  
User story - An overview of the intended application and WHY you feel it's valuable to users. Each story is business driven meaning a user benefit
able to illustrate a user story with an example
able to express the acceptance criteria for a user story in terms that will be directly usable as an automated acceptance test
Eliminate unneeded scope - cut out or split up story 
```

### Getting Started 

## Download the repo

`git clone https://github.com/silicon-slopes-engineer-workshop/coding_pairs.git`


## Installation


**[Skeleton architecture with basic auth]()**
```javascript
// in client folder with npm
npm install 
// in api folder with npm
npm install 
```

**[Start MongoDB server]()**
```javascript
// in terminal
mongod
```

**[Create an .env file with a SECRET on the api level]()** 
```javascript
// in api folder with npm
touch .env

// open file and write 
SECRET=yoursecretwordhere
// then save it 
```

**[Start dev servers]()** 
```javascript
// in client folder with npm
npm run start
// in api folder with npm
node index.js
```

**[Get Coding]()** 
```javascript
// load in client in the browser on localhost
// in the browser create a new user with the sign up to access all screens including auth protected routes

```

## Contributing to CODEWITHME

CODEWITHME is an MIT-licensed open source project. It's an independent project with ongoing development made possible thanks to the support of the awesome participants of the "silicon-slopes-engineer-workshop" MeetUp. 
```javascript
// use git to create new feature branch with the pattern of task plus a dash with the iteration of that feature
`git checkout -b deploy-framework-1`
```


## CODE !
