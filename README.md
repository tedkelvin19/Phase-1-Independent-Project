# Phase-1-Independent-Project
# Auto Car Dealer
This is a simple car dealer application that offers a range of different vehicles.
The objectives i wished yo achieve in this project were;
1. Dispaly Available cars on the dom
2. Request a car that is not available
3. Filter cars by name
4. Buy a car
5. Add comments
## Dispaly Available cars on the dom
This was achieved by fetching the car details from the cars.json, then i created a card to contain
car details and i appended the card to the Dom
## Request a car that is not available
This was achieved by creating a form containing all car details.Then i created a function to grab all the values entered by the user. Using this values i created a carObj. After the carObj was created i 
created a POST request to the cars.json inorder to add the carObj to the cars.json
## Filter cars by name
This was achieved by creating a form with one input field that is the search bar. Then i created a for loop that looped through the database and find the car names available. Then iside the For Loop i created a IF statement that checked if the user input matched the car name in the database.
## Buy a Car
The buy car button was created so that when the user clicks on the button it deletes the carObj form the databace and DOM.This was achieved by a creating a fetch and assigning a anonymous function with the Method Delete.
 ## Add comments
 This was achieved by creating a form and unordered list. Then inside the js file i created a  function to grab the form and its values. Then i created a li element and assigned it the value from the form. Then i  appended the li to the ul.
 # Installation
 Inorder to use this application, follow the following instuction;
 1. Navigate to my github acccout [(https://github.com/tedkelvin19)].
 2. Click on the repositories and select the repo you want. 
 3. After you open the you will see a tab written code with a dropdown arrow
 4. Select the dropdown arrow and copy the ssh Link or download the zip file.
 5. if you copied the ssh link open the terminal and type git clone + ssh link .
 6. if you downloaded the zip file , locate the zip file an extract it.
 7. Then open the parent folder and right click inside that folder and select open with termianl.
 8. In the terminal run the following command to start the json server.'json-server --watch cars.json' 
 9. All done you can open the index.html and enjoy the application.
 # Languages used 
 1. HTML
 2. CSS
 3. JavaScript
 4. JSON

 # License
 MIT License

Copyright (c) 2023 tedkelvin19

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