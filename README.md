
## Trillion OpenFDA Data Visualization Platform

Trillion Technology Solutions, Inc. [(Trillion)] (http://www.ttsiglobal.com) has implemented a prototype – “Trillion OpenFDA Data Visualization Platform” [(ODV Platform)] (http://18f.ttsiglobal.com) - in response to GSA 18F Agile BPA that leverages industry leading open source technology stacks and developed using Agile development methodology.
## Methodology Approach
Trillion has embraced Agile since 2006 and successfully implemented several turnkey and mission critical applications in commercial and government sectors.  We leveraged this experience to create a compact set of Agile sprints for development a solution for the challenge posed by GSA 18F BPA.  Our team comprised of members who were self-organizing and cross-functional and participated in flushing out user stories, design and development, unit and integration testing.  One of the conference rooms in our office was barricaded off from the rest of the company and was used exclusively by the ODV Platform Agile team for daily Scrums, discussions and collaborative team development.
Sprint 0 comprised of understanding and detailing the requirements presented in the RFQ and creating a few skeleton user stories that created a bare bone structure of the prototype including wireframes , AWS setup and GitHub among others.  Core development was during Sprint 1, Sprint 2 and Sprint 3, each lasting 5 days.  User stories with acceptance were created after discussion among the team and with the product owner.  Daily Scrum meetings provided everyone to come together formally to discuss work done the previous day and the plan for that day in addition to bringing up impediments if any.  The last day of each sprint included sprint retrospective and review followed by sprint planning for the next sprint.  A product backlog was created by the product owner from which user stories were chosen for each sprint which went into the sprint backlog.  An open source Agile Lifecycle Management (ALM) tool – Tiaga  – was used for capturing all Agile artifacts.  End of the sprint deployments were done on the Amazon instance and a demo was provided to the product owner with feedback taken that was loaded back into the product backlog.  The product owner resolved  the user stories to show acceptance of the deliverables.

## Design and Development Approach -- This need to change

##ODV Features and Usage -- This need to change
ODV Platform allows users an interactive user interface that provides a top down drill down method to accessing recall information provided by the government. Hierarchical information access works as follows:
* It starts at the top level from the home page  which takes them to an interactive graphic of the map of United States.  Recall information is available for each category – Drugs, Devices and Food.
* The users can click on each state  of the map to obtain a bar graph of annual historical color coded recall information, for each of the categories per US state. 
* Clicking on each annual bar  in the graph, per category, provides monthly recalls for each category
*	Clicking on each category per month  lists detailed recall records for that month, US state and chosen category
*	The detailed list has smart search  per each column shown.  Typing in part or full phrases filters down the records list to match the search pattern.

## Production URL
https://18fpool1.ttsiglobal.com

### Installation
See our [Installation Guide](INSTALL.md)
