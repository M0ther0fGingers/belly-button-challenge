# belly-button-challenge
Module 14 repo

## File Structure
The belly-button-challenge repo contains index.html, this README.md, samples.json, and one subfolder, static. Inside static is a JS folder which contains app.js, the code for this challenge. 

## Accessing and Using the Webpage
To access the webpage built for this challenge, right-click on index.html in your VS Code and select "Open in default browser". Select the "Test Subject ID Number" drop down and select a number. The bar graph, bubble chart, and Demographic Info panel will update to show that test subjects data. 

## app.js
Upon launching the webpage, the init function runs. Init loads the data, creates a list of sample IDs, selects the first item from the list, and creates the event listener.  

Next, the buildMetadata function runs. This populates the table with the sample's demographic information. a .filter is used to limit to the selected sample results. 

Lastly, the buildCharts function runs. Similar to the buildMetadata function, the data is loaded and filtered to the selected sample. Then a bubble chart and bar graph are built. 

## Development notes
The app.js code was written with help from tutor Angel Milla and DAB class teacher Shuen. 
