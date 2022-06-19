# Football-Match-Data-Generator

## View football lineups and match results on a web page

An API built using Fetch API to pull raw data from Statsbomb free data resources (https://github.com/statsbomb/open-data) and generate football llineups and results

## How to install and run project

* Clone this repository
* Open index.html on a web browser

## How it works

* A GET request is sent to the StatsBomb open data endpoint to retrieve the raw data, which is then converted to JSON

<p align="center">
  <img src="https://github.com/Harrisman05/Football-Match-Data-Generator/blob/master/assets/get_request_demo.png" width="60%" height="60%"/>
</p>

* JSON data is manipulated in JavaScript code and then relevant data appended to the DOM. Below is an example of team lineups/formations being generated on a pitch:

<p align="center">
  <img src="https://github.com/Harrisman05/Football-Match-Data-Generator/blob/master/assets/populated_pitch_demo.png" width="60%" height="60%"/>
</p>

* Further example of the lineup being generated in table format:

<p align="center">
  <img src="https://github.com/Harrisman05/Football-Match-Data-Generator/blob/master/assets/populated_table.png" width="60%" height="60%"/>
</p>
