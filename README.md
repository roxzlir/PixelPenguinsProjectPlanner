# Project Planner Application.
## PPPP - PixelPenguins Project Planner
We received a task to create an application where the user is able to report time to different projects.
For this task we have used React as our frontend application, we have a Expressjs server solution as a middleware to be able to connect with our databases via Notion API. 

#### Thank you for using PixelPenguins Applications
##### PLEASE NOTE: When the user visits our page you will be presented with a login demand.
To access the functions of this page the user need to exist in the database of employees and have both a name, employment role and a password added to them. All the employees that
will have access to the page are found in the select list on the login page and just need to enter his/hers password to be redirected to all the functions.
Example password for users:
Ture Thorén password: 999999 (Teamleader account)
Dominic Ement password: 123456 (Employee account)

There are seperate functions based on your employment role. Employees only have access to log time reports but will also se their personal data displayed upon login.
If a teamleader or the CEO login they will have mutch more access to both see all timereports, see all project and make changes to them both. 
They can also add new timereports in any employees name in case of emergency.

##### Technical notes:
The first page from witch you begin is the page we've named /LoginPage
and we have integrated our Menu component in our App.js file since we base which Menu link's that will be visible for the user
we needed to reload the App.js for the menu to update. 

So on the LoginPage we render our LoginAuth component and based on the result from that component we 
render 2 different result in our <Menu/> component. We have also added a condition on our LoginPage to display our 
<UserVisualize/> component only IF the user is logged in.

##### Users with role Employee will see: 
###### Link Home to "/" 
<UserVisualize/> Present all the logged in user's personal data.
<LoginAuth/> Handle the login process.

###### Link Report Time to "/ReportTime" where we render:
<LogTimereport/> Tool to make a new timereport, based on the user who is logged in. 

##### Users with role Teamleader/CEO will see:
###### Link Home to "/"

###### Link Timereports to "/DisplayTimereport" where we render:
<FilterTimereports/> Filter timereports based on both name or date, possible to select all.
<FilterProjectReports/> Let's you see all timereports that been added for selected project
<TimereportInputEdit/> Tool to change the date on any timereport that have been added. 

###### Link Report Time to "/ReportTimeAll" where we render:
<AddTimeReport>  Tool to make a new timereport on any of the employee's.

###### Link to Projects "/DisplayProjects" where we render: 
<AlertCompareEndDate/> Display all the projects sorted by status and highlights some warnings 
<Alert/> Give different warnings based on project's timespan and hos many hours that are left, have a filter for project that are close to go live as well. 
<ActiveProjects/> Let you display project based on selected status.
<ProjectInputEdit/> Tool to change the timespan dates on any project.
<ProjectHoursEdit/> Tool to change the amount of hours a project is allowed. 
<AddNewProject/> Tool to add a new project to the database.

##### What happens when I'm done?
When the user press the Logout button there is a function that reload the page (to update the Menu component and clear the links) and remove all
data from localStorage and return the user to our "/LoginPage" again as when the page was opend the first time.

#### Link to our SCRUM board:
[https://app.asana.com/0/1206692289443729/1206692184386317](https://app.asana.com/read-only/Pixel-Penguins/1201209955681624/8f66c19702d85e5f19a8d5f3dec76d8b/board)

#### Link to our Asana page for our Daily Standup, Sprint Planning & Review's: 
https://app.asana.com/0/1206714234837953/1206714473590103

#### The Pixel Penguin Team:
##### -> Angelica Lindström
##### -> Caroline Uthawong-Burr
##### -> Emil Nordin
##### -> Theres Sundberg Selin






















