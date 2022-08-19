
var listOfLists = [];
var weekDayLists = [];
var inputObjectList = [];
var idCounter = 0;
var listOfListIDCounter = 0;

const keyPrefix = "2680_jk_project2_";
const key = keyPrefix + "keys";

var formattedObjectToSave = {};
var arrayHoldingSubObject_todo = [];
var arrayHoldingSubObject_done = [];

var objectParsedFromFile = {};


function add(e) {

    e.preventDefault();

    let textInput = document.getElementById("form_input");
    let textInputValue = textInput.value;

    let goalDateInput = document.getElementById("goal_date_input");
    let goalDateInputValue = goalDateInput.value;

    let goalTimeInput = document.getElementById("goal_time_input");
    let goalTimeInputValue = goalTimeInput.value;


    if(textInputValue === "") {
        alert("Input value is blank");
        return false;
    }



    let textInputNumber = Number(textInputValue);

    if (Number.isNaN(textInputNumber)) {

        let newObject = createObject(textInputValue, goalDateInputValue, goalTimeInputValue);
        // let newObject = createObject(textInputValue, goalDateInputValue);
        // let newObject = createObject(textInputValue);
        pushToInputObjectArray(newObject);
        refreshToDoList();
        resetInputField();

       saveToLocalStorageByDefault();
    }
    
    else {
        alert("Please enter an actual item to add to the to-do list.");
    }
    return false;    
} 
    
    function createObject (newTextInput, newDateInput, newTimeInput){
        idCounter = idCounter + 1;

        let currentDate = Date();
        let goalDateCombined = "";
        //let idCounterText = String(idCounter);

            if (newTimeInput == "") {
                goalDateCombined = newDateInput;
            }
            else {
                goalDateCombined = newDateInput + " @" + newTimeInput;
            }

        let newObject = {

            name: newTextInput,
            listID: "list" + idCounter,
            class: "todo",
            date: "<br>", // no need to print upon first creation
            dateID: "date" + idCounter,
            originalDate: "originally created on " + currentDate,
            buttonID: "button " + idCounter,

            deleteButtonID: "delete " + idCounter,
            editButtonID: "edit " + idCounter,
            goalDate: "Goal Time: " + goalDateCombined,
            itemID: idCounter

        }

        return newObject;
    } 



    function pushToInputObjectArray(objectToPush) {
        
        inputObjectList.push(objectToPush);

        return;
    }


    function refreshToDoList() {

       
        var toDoList = document.getElementById("toDoList");
        toDoList.innerHTML = " ";
        toDoList.style.height = null;

        var doneList = document.getElementById("doneList");
        doneList.innerHTML = " ";
        doneList.style.height = null;


        for (var index = 0; index < inputObjectList.length; index++) {
        
            let itemContainerID = document.createElement("div");
            itemContainerID.id = "container " + inputObjectList[index].itemID;
            itemContainerID.setAttribute('style', itemContainerID.getAttribute + '; position: relative; left: 8%; width: 70%;');
            
            
            //I think... I might have to further wrap these itemContainers into a list item each.... nah its ok let it be. these white backgrounds are ugly too.
            // itemContainerID.setAttribute("class", "ui-state-default");
            // let jQueryUISpan = document.createElement("span");
            // jQueryUISpan.setAttribute("class", "ui-icon ui-icon-arrowthick-2-n-s");
            // itemContainerID.append(jQueryUISpan);


            let listID = document.createElement("li");
            listID.id = inputObjectList[index].listID;
            listID.innerHTML = inputObjectList[index].name + " ";
            listID.class = inputObjectList[index].class;
            

            let buttonID = document.createElement("button");
            buttonID.id = inputObjectList[index].buttonID;
            // buttonID.innerHTML = "move";
            buttonID.setAttribute('onclick', 'moveItem(this)');
            // buttonID.setAttribute('style', 'position: absolute; top: 0px; right:15%; font-size:18px; color: green;');
            
            let originalDateID = document.createElement("p");
            originalDateID.id = "original_" + inputObjectList[index].dateID;
            originalDateID.innerHTML = `<p style="font-size:12px" > ${inputObjectList[index].originalDate} </p>`;

            let dateID = document.createElement("p");
            dateID.id = inputObjectList[index].dateID;
            dateID.innerHTML = `<p style="font-size:12px" > ${inputObjectList[index].date} </p>`;
            

            let goalDateID = document.createElement("p");
            goalDateID.id = "goalDate_" + inputObjectList[index].goalDate;
            goalDateID.innerHTML = `<p style="font-size:18px" > ${inputObjectList[index].goalDate} </p>`;


            let buttonID_highlight_item = document.createElement("button");
            buttonID_highlight_item.id = "highlightButton " + inputObjectList[index].itemID;
            buttonID_highlight_item.innerHTML = "Highlight Item";
            buttonID_highlight_item.setAttribute('onclick', 'highlightItem(this)');
            buttonID_highlight_item.setAttribute('style', 'font-size:15px; margin: 3px; background-color: #fff3cf;');


            let buttonID_edit_item = document.createElement("button");
            buttonID_edit_item.id = inputObjectList[index].editButtonID;
            buttonID_edit_item.innerHTML = "Edit Item";
            buttonID_edit_item.setAttribute('onclick', 'editItem(this)');
            buttonID_edit_item.setAttribute('style', 'font-size:15px; margin: 3px; color: purple;');

            let buttonID_edit_goal_date = document.createElement("button");
            buttonID_edit_goal_date.id = "goal_" + inputObjectList[index].buttonID;
            buttonID_edit_goal_date.innerHTML = "Edit Goal Date";
            buttonID_edit_goal_date.setAttribute('onclick', 'editGoalDate(this)');
            buttonID_edit_goal_date.setAttribute('style', 'font-size:15px; margin: 3px; color: purple;');

            let buttonID_delete_item = document.createElement("button");
            buttonID_delete_item.id = inputObjectList[index].deleteButtonID;
            buttonID_delete_item.innerHTML = "Delete Item";
            buttonID_delete_item.setAttribute('onclick', 'deleteItem(this)');
            buttonID_delete_item.setAttribute('style', 'font-size:15px; margin: 3px; color: red;');



            let itemBreak = document.createElement("p");
            itemBreak.innerHTML = "======================";
            itemBreak.setAttribute('style', 'text-align:justify;')


            if (inputObjectList[index].class == "todo") {
               toDoList.append(itemContainerID);
               itemContainerID.append(listID);
               buttonID.innerHTML = "DONE";
               //buttonID.setAttribute('style', 'position: absolute; top: 0px; right:15%; font-size:18px; color: green;');
               buttonID.setAttribute('style', buttonID.getAttribute + '; position: absolute; top: 0px; right:-20%; font-size:18px; color: green;');
               itemContainerID.append(buttonID);
               listID.append(goalDateID);
               listID.append(dateID);
               listID.append(originalDateID);
               listID.append(buttonID_highlight_item);
               listID.append(buttonID_edit_item);
               listID.append(buttonID_edit_goal_date);
               listID.append(buttonID_delete_item);
               listID.append(itemBreak);
            //    //listID.append(dateID); // to switch print order if desired


            // toDoList.append(listID);
            // listID.append(itemContainerID);
            // buttonID.innerHTML = "DONE";
            // itemContainerID.append(buttonID);
            // itemContainerID.append(goalDateID);
            // itemContainerID.append(dateID);
            // itemContainerID.append(originalDateID);
            // itemContainerID.append(buttonID_edit_item);
            // itemContainerID.append(buttonID_edit_goal_date);
            // itemContainerID.append(buttonID_delete_item);
            // //listID.append(dateID); // to switch print order if desired



               
               toDoList.append(document.createElement("br"));
            }
            else if (inputObjectList[index].class == "done") {
                doneList.append(itemContainerID);
                itemContainerID.append(listID);   
                buttonID.innerHTML = "NOT YET DONE";
                //buttonID.setAttribute('style', 'position: absolute; top: 0px; right:15%; font-size:18px; color: blue;');
                buttonID.setAttribute('style', buttonID.getAttribute + '; position: absolute; top: 0px; right:-30%; font-size:18px; color: blue;');
                listID.append(buttonID);
                listID.append(goalDateID);
                listID.append(dateID);
                listID.append(originalDateID);
                listID.append(buttonID_highlight_item);
                listID.append(buttonID_edit_item);
                listID.append(buttonID_edit_goal_date);
                listID.append(buttonID_delete_item);
                listID.append(itemBreak);
                //listID.append(dateID); // to switch print order if desired
                doneList.append(document.createElement("br"));
            }
        }

        let toDoHeight = toDoList.clientHeight;
        let doneHeight = doneList.clientHeight;

        let maxHeight = toDoHeight;
        if (doneHeight > toDoHeight) {
            maxHeight = doneHeight;
        }

        toDoList.style.height = maxHeight + "px";
        doneList.style.height = maxHeight + "px";

        

        let doneSortButtons = document.getElementById("doneSortButtons");
        let doneSortButtonsHeight = doneSortButtons.clientHeight;

        let spaceHolder1 = document.getElementById("spaceHolder1");
        let spaceHolder2 = document.getElementById("spaceHolder2");

        spaceHolder1.style.height = doneSortButtonsHeight + "px";
        spaceHolder2.style.height = doneSortButtonsHeight + "px";

        
        
        return;
    }


    function highlightItem(this_button) {
        let itemID = this_button.id;
        let itemIDText = String(itemID);
        let itemIDTextArray = itemIDText.split(" ");

        let itemIDNumber = itemIDTextArray[1];
        
        let listID = "list" + itemIDNumber;
        let listItem = document.getElementById(listID);

    // function highlightItem(this_button) {
    //     let buttonID = this_button.id;
    //     let buttonIDText = String(buttonID);
    //     let buttonIDTextArray = buttonIDText.split(" ");

    //     let buttonIDNumber = buttonIDTextArray[1];

    //     let listID = "list" + buttonIDNumber;
    //     let listItem = document.getElementById(listID);

        let currentStyleAttribute = listItem.getAttribute('style');
        if (currentStyleAttribute == null || currentStyleAttribute == '') {
            listItem.setAttribute('style', 'background-color: #fff3cf;');
            this_button.innerHTML = "Undo Highlight";
            this_button.setAttribute('style', 'font-size:15px; margin: 3px; background-color: #013ba6; color: white;');
        }

        else {

            listItem.setAttribute('style', '');
            this_button.innerHTML = "Highlight Item";
            this_button.setAttribute('style', 'font-size:15px; margin: 3px; background-color: #fff3cf;');


        }
        //     'style', buttonID.getAttribute + '; position: absolute; top: 0px; right:-20%; font-size:18px; color: green;'

        // listItem.setAttribute()
        // #fff3cf

    }

    function moveItem(this_button) {
        let buttonID = this_button.id;
        let buttonIDText = String(buttonID);
        let buttonIDTextArray = buttonIDText.split(" ");

        let buttonIDNumber = buttonIDTextArray[1];

        let listID = "list" + buttonIDNumber;
        let listItem = document.getElementById(listID);
        let currentDate = Date();

        if (listItem.class == "todo") {
            listItem.class = "done";
            
            for (index = 0; index < inputObjectList.length ; index++) {
                if (inputObjectList[index].listID == listID) {
                    inputObjectList[index].class = "done";
                    inputObjectList[index].date = "completed on " + currentDate;
                    //this_button.innerHTML = "mark as to-do"
                }
            }
        }

        else if (listItem.class == "done") {
            listItem.class = "todo";

            for (index = 0; index < inputObjectList.length ; index++) {
                if (inputObjectList[index].listID == listID) {
                    inputObjectList[index].class = "todo";
                    inputObjectList[index].date = "added again on " + currentDate;
                   // this_button.innerHTML = "mark as done"
                }
            }
        }
        
        refreshToDoList();
        
        saveToLocalStorageByDefault();
        return;
    }

    function resetInputField() {
        let inputField = document.getElementById("form_input_actual_form");
        inputField.reset();
        return;
    }
    

    function clearToDo() {
        var todoClassCounter = 0;
        for (index = 0; index < inputObjectList.length ; index++) {
            if (inputObjectList[index].class == "todo") {
                todoClassCounter = todoClassCounter + 1;
            }
        }
        if (todoClassCounter == 0) {
            alert(" please create a list before clearing ");
        }
        else {
            var confirmResponse = confirm("Are you sure you want to clear the to-do list?");
            if (confirmResponse == true) {


                for (index = 0; index < inputObjectList.length ; index++) {
                    if (inputObjectList[index].class == "todo") {
                        inputObjectList.splice(index,1);
                        index = -1;
                    }
                }

                refreshToDoList();
            }
            else {
                return;
            }
        }

        saveToLocalStorageByDefault();
        return;
    }


    function clearDone() {
        var doneClassCounter = 0;
        for (index = 0; index < inputObjectList.length ; index++) {
            if (inputObjectList[index].class == "done") {
                doneClassCounter = doneClassCounter + 1;
            }
        }
        if (doneClassCounter == 0) {
            alert(" please create a list before clearing ");
        }
        else {
            var confirmResponse = confirm("Are you sure you want to clear the done list?");
            if (confirmResponse == true) {

                for (index = 0; index < inputObjectList.length ; index++) {
                    if (inputObjectList[index].class == "done") {
                        inputObjectList.splice(index,1);
                        index = -1;
                    }
                }
                refreshToDoList();
            }
            else {
                return;
            }
        }

        saveToLocalStorageByDefault();
        return;
    }


    function clearBoth() {
        var totalCounter = 0;
        for (index = 0; index < inputObjectList.length ; index++) {
            if (inputObjectList[index].class == "todo" || inputObjectList[index].class == "done") {
                totalCounter = totalCounter + 1;
            }
        }
        if (totalCounter == 0) {
            alert(" please create a list before clearing ");
        }
        else {
            var confirmResponse = confirm("Are you sure you want to clear both lists?");
            if (confirmResponse == true) {

                for (index = 0; index < inputObjectList.length ; index++) {
                        inputObjectList.splice(index,1);
                        index = -1;
                }

                idCounter = 0;

                refreshToDoList();
                
            }
            else {
                return;
            }
        }
        saveToLocalStorageByDefault();
        return;
    }

    


    function saveToLocalStorageByDefault() {
    
        localStorage.setItem(key, JSON.stringify(inputObjectList));
        localStorage.setItem(key + "_idCounter", idCounter);
        localStorage.setItem(key + "_listOfLists", JSON.stringify(listOfLists));
        localStorage.setItem(key + "_weekDayLists", JSON.stringify(weekDayLists));
        


        return;
    }


    // //NOTE: window.beforeunload didn't work because both array and counter returned to default null

    function loadFromLocalStorageFromDefault() {

  
        let storedInputObject = localStorage.getItem(key);
        let storedCounter = localStorage.getItem(key + "_idCounter");
        let storedLists = localStorage.getItem(key + "_listOfLists");
        let storedCssTheme = localStorage.getItem(key + "_userCssChoice");
        let storedWeekDayLists = localStorage.getItem(key + "_weekDayLists");

        if (storedInputObject) {
            refreshListOfNames();
            resetWeekMenuColor();
            inputObjectList = JSON.parse(storedInputObject);
        }

        if (storedCounter) {
            idCounter = Number(storedCounter);
        }

        if (storedLists) {
            listOfLists = JSON.parse(storedLists);
            menuCounter = listOfLists.length;
        }

        if (storedCssTheme) {
            let currentCSS = document.getElementById("linkToCSS");
            currentCSS.setAttribute("href", `css/style-${storedCssTheme}.css`);
        }

        if (storedWeekDayLists){
            weekDayLists = JSON.parse(storedWeekDayLists);
        }

        refreshToDoList();            
        refreshListOfNames();
        return;
    }

    //window.BeforeUnloadEvent(); // might not work
    window.onbeforeunload = saveToLocalStorageByDefault;
    // this line prevented me from being able to delete local storage even manually lol... I'll keep it anyway though
    // note that the note wasn't really needed for the save to local storage to work..... it worked without it
    
    




 




    function createSubObjectForArray(originalObject) {
        let newObject = {};
         
        newObject = {
             added: originalObject.originalDate,
             item: originalObject.name,
             Modified: originalObject.date,
             goal_date: originalObject.goalDate
        }
 
         return newObject;
     }


    function createArrayForJSON(arrayWanted) {
        let object = {};

        if (arrayWanted == "todo") {
            for (index = 0; index < inputObjectList.length; index++) {
                if (inputObjectList[index].class == "todo") {
                    object = createSubObjectForArray(inputObjectList[index]);
                    arrayHoldingSubObject_todo.push(object);
                }
            }
            let array = arrayHoldingSubObject_todo;
            return array;
        }

        else if (arrayWanted == "done") {
            for (index = 0; index < inputObjectList.length; index++) {
                if (inputObjectList[index].class == "done") {
                    object = createSubObjectForArray(inputObjectList[index]);
                    arrayHoldingSubObject_done.push(object);
                }
            }
            let array = arrayHoldingSubObject_done;
            return array;
        }
    }


   




    function createActualObjectForFormattedObjectToSave() {
        let toDoArray = createArrayForJSON("todo");
        let doneArray = createArrayForJSON("done");
        
        formattedObjectToSave = {
            todo: toDoArray,
            done: doneArray
        } 

        return;
    }



    

        
    function restoringInputObjectListFromFormattedObjectToSave(objectParsed) {
        let toDoArray = objectParsed.todo;
        let doneArray = objectParsed.done; 



        //this part doesn't work but let's leave it.
        //assign class first.
        for (index = 0; index < toDoArray.length; index ++) {
            toDoArray[index].classType = "todo";
            toDoArray[index].timeInMilliseconds = Date.parse(toDoArray[index].added);
        }

        for (index = 0; index < doneArray.length; index ++) {
            doneArray[index].classType = "done";
            doneArray[index].timeInMilliseconds = Date.parse(doneArray[index].added);
        }




                                    //big picture:   
                                    //combine them, 
                                    //sort them in order of date created, 
                                    //assign id number
                                    //also reset idCounter
        
        let tempCombinedArray = [];
        let newCounter = 1; // my original ID's started at 1





        //combine them first:
        //could actually combine with the for loop above, but for my own readability sake let's keep it first
        for (index = 0; index < toDoArray.length; index ++) {
            tempCombinedArray.push(toDoArray[index]);
        }
        for (index = 0; index < doneArray.length; index ++) {
            tempCombinedArray.push(doneArray[index]);
        }





        //then sort according to date created...the "added property"
        tempCombinedArray.sort((a = tempCombinedArray[index].timeInMilliseconds, b = tempCombinedArray[index].timeInMilliseconds) => a - b);

        let restoredObject = {};
        inputObjectList = [];

        // ok now assign id number 
        // or actually, just create the entire object... by passing in newCounter
        for (index = 0; index < tempCombinedArray.length; index ++) {
            restoredObject = convertLoadedSubObjectToOriginalSubObjects(tempCombinedArray[index],tempCombinedArray[index].classType, newCounter );
            inputObjectList.push(restoredObject);
            newCounter = newCounter + 1;
        }

        // now assign original counter with the new counter
        idCounter = newCounter;
        refreshToDoList();

        return;
    }


    function convertLoadedSubObjectToOriginalSubObjects(loadedSubObject, listType, idNumber) {
        let originalSubObject = {};
        let classType = "";

        let dateProperty = "";

      //  let origDateProperty = " ";


        //dateProperty
        if (loadedSubObject.Modified) {
            dateProperty = loadedSubObject.Modified;
        }
        else if ( loadedSubObject.completed) {
            dateProperty = "completed on " + loadedSubObject.completed;
        }
        else {
            dateProperty = " ";
        }





        //listType
        if (listType == "todo" ) {
            classType = "todo";
        }
        else if (listType == "done") {
            classType = "done";
        }


        let addedString = loadedSubObject.added;

        // origDateProperty
        if (addedString.includes("created")) {
            origDateProperty = loadedSubObject.added;
        }
        else {
            origDateProperty = "originally created on " + loadedSubObject.added;

        }


        



        originalSubObject = {
            name: loadedSubObject.item,
            listID: "list" + idNumber,
            class: classType, 
            //date: loadedSubObject.Modified,
            date: dateProperty,
            dateID: "date" + idNumber,
            //originalDate: loadedSubObject.added,
            originalDate: origDateProperty,
            buttonID: "button " + idNumber,

            deleteButtonID: "delete " + idNumber,
            editButtonID: "edit " + idNumber,
            goalDate: loadedSubObject.goal_date,
            itemID: idNumber
            
        }


        return originalSubObject;
    }


    function saveToFile() {

        if ( inputObjectList.length == 0 ){
            alert("The lists are empty");
        }
        
        else {
            
            createActualObjectForFormattedObjectToSave();

            let stringContents = JSON.stringify(formattedObjectToSave, null, 4); // obj to convert to string, trim by, add 4 spaces as indents
            let a = document.createElement("a");
            let file = new Blob([stringContents], {type: "application/json"});
            a.href = URL.createObjectURL(file);
            a.download = "todo.json";
            a.click();

        }

    }



    function eventToLoadFile() {
        var load_file = document.getElementById("load_file");


        load_file.addEventListener("change", function(e) {


            if (e.target.files.length > 0) {
                let file = e.target.files[0];
    
                if (!file) return;
    
                let r = new FileReader();
    
                r.onload = function(f) {
                    objectParsedFromFile = JSON.parse(f.target.result);
                    if (objectParsedFromFile) {

                     restoringInputObjectListFromFormattedObjectToSave(objectParsedFromFile); 

                    }
                };
    
                r.readAsText(file);
            }
        });
    }
        


    
    function myInitializer() {
        initializingWeekDayLists();
        loadFromLocalStorageFromDefault();
        eventToLoadFile();
        refreshListOfNames();
        resetWeekMenuColor();

        // msg2 = "codeMsg,msg2"
        msg3 = "codeMsg2,null"
        modal("welcomeMsg",`codeMsg,${msg3}`);


        // alert('Welcome to my Project 3!' );

    }

    



    function changeCSS(theme) {

        let currentCSS = document.getElementById("linkToCSS");
     

        currentCSS.setAttribute("href", `css/style-${theme}.css`);
        
        localStorage.setItem(key + "_userCssChoice", theme);
        
        //useful references... but I did what was better for me: 
        //https://www.geeksforgeeks.org/how-to-switch-between-multiple-css-stylesheets-using-javascript/
        //https://stackoverflow.com/questions/30401880/switching-between-multiple-css-files-using-javascript/30401934


        //2 buttons method
        //let currentLink = currentCSS.getAttribute(href);

        // if (currentLink == "style-bright.css") {

        //     currentLink = "style-dull.css";

        // }

        // else if (currentLink == "style-dull.css") {

        //     currentLink = "style-bright.css";

        // }


        return;
    }



    function editItem(this_item) {
        let itemID = this_item.id;

        let itemIDText = String(itemID);
        let itemIDTextArray = itemIDText.split(" ");

        let itemIDNumber = itemIDTextArray[1];

        let targetObject = {};

        let listID = "list" + itemIDNumber;
        //let listItem = document.getElementById(listID);


        for (index = 0; index < inputObjectList.length ; index++) {
            if (inputObjectList[index].listID == listID) {
                    targetObject = inputObjectList[index];
                    // this_button.innerHTML = "mark as done"
                }
            }


        
        let userInput = prompt("Enter replacing task", targetObject.name);

        

        if (userInput.length == 0) {
            alert("Input was blank. Edit canceled.")
        }

        else {
            let confirmResponse = confirm(`Are you sure you want to replace: [" ${targetObject.name} "]  with  ["   ${userInput}  "] ?`);
            if (confirmResponse == true) {
                targetObject.name = userInput;
                // this_button.innerHTML = "mark as done"
            }
            else {
                alert("edit cancelled");
            }
            
            
        }
        
        refreshToDoList();
        
        saveToLocalStorageByDefault();
        return;
    }


    function editGoalDate(this_item) {
        let itemID = this_item.id;

        let itemIDText = String(itemID);
        let itemIDTextArray = itemIDText.split(" ");

        let itemIDNumber = itemIDTextArray[1];

        let targetObject = {};

        let listID = "list" + itemIDNumber;
        //let listItem = document.getElementById(listID);


        for (index = 0; index < inputObjectList.length ; index++) {
            if (inputObjectList[index].listID == listID) {
                    targetObject = inputObjectList[index];
                    // this_button.innerHTML = "mark as done"
                }
            }


        
        let userInput = prompt("Enter replacing goal time", targetObject.goalDate);

        

        if (userInput.length == 0) {
            alert("Input was blank. Edit canceled.")
        }

        else {

            let userInputWithFormat = "";
            if (userInput.includes("Goal Time")){
                userInputWithFormat = userInput;
            }

            else {
                userInputWithFormat = "Goal Time: " + userInput;
            }


            let confirmResponse = confirm(`Are you sure you want to replace: [" ${targetObject.goalDate} "]  with  ["   ${userInputWithFormat}  "] ?`);
            if (confirmResponse == true) {

                targetObject.goalDate = userInputWithFormat;
                
            }
            else {
                alert("edit cancelled");
            }
            
            
        }
        
        refreshToDoList();
        
        saveToLocalStorageByDefault();
        return;


    }

    function deleteItem(this_item) {

        let itemID = this_item.id;

        let itemIDText = String(itemID);
        let itemIDTextArray = itemIDText.split(" ");

        let itemIDNumber = itemIDTextArray[1];

        let targetObject = {};
        let targetObjectIndex = 0;

        let listID = "list" + itemIDNumber;
        //let listItem = document.getElementById(listID);

        for (index = 0; index < inputObjectList.length ; index++) {
            if (inputObjectList[index].listID == listID) {
                    targetObject = inputObjectList[index];
                    targetObjectIndex = index;
                    // this_button.innerHTML = "mark as done"
                }
            }

        
        let userInput = confirm(`Are you sure you want to delete [" ${targetObject.name} "]? This will be irreversible unless you download a JSON file of the current list then load it back from there later.`);

        

        if (userInput == true) {

            inputObjectList.splice(targetObjectIndex,1);

        }


        else {

           alert("Delete cancelled.");
            
        }
        
        refreshToDoList();
        
        saveToLocalStorageByDefault();
        return;


    }
     


    // reference: https://jqueryui.com/dialog/#modal-message
    function modal(msg, nextMsg) {
        
            msgID = `#${msg}`;
            

            if(nextMsg == "null") {
                buttonsContent = {
                    Close: function() {
                         $( this ).dialog( "close" );
                    }
                  }
            }


 
            else {
                nextMsgArray = nextMsg.split(",");
                if(nextMsgArray.length==2){
                    nextMsgPart2 = nextMsgArray[1];
                }
                else {
                    nextMsgPart2 = "";
                    for(i=1;i<nextMsgArray.length;i++){
                        if (i == 1) {
                            nextMsgPart2 = nextMsgPart2 + nextMsgArray[i];
                        }
                        else {
                            nextMsgPart2 = nextMsgPart2 + "," + nextMsgArray[i];
                        }

                    }

                }
                // nextMsgPart1 = nextMsgArray[0];
                // // nextMsgPart1.replace('\"',' ');
                // // nextMsgPart1.trim();

                // nextMsgPart2 = nextMsgArray[1];
                // // nextMsgPart2.replace('\"',' ');
                // nextMsgPart2.trim();

                buttonsContent = 
                {
                    Yes: function(){
                        $( this ).dialog( "close" );
                        modal(nextMsgArray[0], nextMsgPart2);
                       }, 
                    Close: function() {
                         $( this ).dialog( "close" );
                       }
                  }

            }

            // $( "#dialog" ).dialog(
            $( msgID ).dialog(

               {
                resizable: true,
                height: "auto",
                width: "auto",
                modal: true,
                buttons: buttonsContent
               }

            );
          
    }


    //works but can customize better

    // // reference: https://jqueryui.com/dialog/#modal-message
    // function modal(msg) {
    //     {
    //         msgID = `#${msg}`;

    //         // $( "#dialog" ).dialog(
    //         $( msgID ).dialog(

    //            {
    //             resizable: true,
    //             height: "auto",
    //             width: "auto",
    //             modal: true,
    //             buttons: {
    //                 Ok: function() {
    //                      $( this ).dialog( "close" );
    //                 }
    //               }
    //            }

    //         );
    //       }
    // }

    function fetchList (){

           modal("fetchListDialog","null");


           let savedList = secretLoadFile("project3proposal.json");

           objectParsedFromFile = JSON.parse(savedList);
           if (objectParsedFromFile) {
               restoringInputObjectListFromFormattedObjectToSave(objectParsedFromFile); 
           }
     

           resetWeekMenuColor();
           refreshListOfNames();
        //    alert("ta da! This is a list of features achieved in this project. I do need to cite the source for the XML path search function. <br> It breaks what we learned about XMLHttpRequest into two separate functions for better reusing of the code. Reference from: https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript <br> sample website he provided: http://sealevel.info/test_file_read.html <br> path format is relative path");
  
    }


    function resetWeekMenuColor() {
        for(day=1; day < 8; day++) {
            let div = document.getElementById(`day${day}`);
            div.setAttribute("style", "background-color: black; ");
        }
    }

    // kind reference from: https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript
    // sample website he provided: http://sealevel.info/test_file_read.html
    // path format is relative path, for example:     var myStuff = loadFile("files/hello.txt");

    function secretLoadFile(filePath) {
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = xmlhttp.responseText;
        }
        return result;
      }
      
    








    //then just sort function + local storage ambition left after that!!! wow!!!
    // never mind... i have a bunch of new ideas to try LOL
    


//sorting


 


    function helperSortFunction(sortBy, array, order) {
        
        

        if (sortBy == "goal") {

            for (index = 0; index < array.length; index++) {

                goalDateTrim = array[index].goalDate;
                goalDateTrimArray = goalDateTrim.split(":");

                if (goalDateTrimArray.length == 2) {
                    goalDateTrim = goalDateTrimArray[1];
                    goalDateTrim = goalDateTrim.trim();
                    newDate = new Date(goalDateTrim)

                    array[index].compareThisTime = newDate.getTime();

                }
                else if ((goalDateTrimArray.length == 3)) {
                    goalDateTrim = goalDateTrimArray[1];
                    goalDateTrim = goalDateTrim.trim();

                    goalDateTrimArray2= goalDateTrim.split("@");
                    goalDateTrimArray2[0] = goalDateTrimArray2[0].trim();
                    goalDateTrim = goalDateTrimArray2[0] + "T" + goalDateTrimArray2[1] + ":" + goalDateTrimArray[2] + ":00";
                    newDate = new Date(goalDateTrim)

                    array[index].compareThisTime = newDate.getTime();
                }
            }
            
            // array.sort( (a, b) => a.compareWith - b.compareWith);
            // array.sort( (a = array[index].compareThisTime, b = array[index].compareThisTime) => a - b);
            if (order == "ascending")  {
                array = array.sort((a, b) => a.compareThisTime - b.compareThisTime);
            }

            else if (order == "descending")  {
                array = array.sort((a, b) => b.compareThisTime - a.compareThisTime);
            }
            
        }


        else if (sortBy == "add") {

            for (index = 0; index < array.length; index++) {

                addedDateTrim = array[index].originalDate;
                addedDateTrimArray = addedDateTrim.split("d on");

                
                    addedDateTrim = addedDateTrimArray[1];
                    // addedDateTrim = addedDateTrim.trim();
                    newDate = new Date(addedDateTrim)

                    array[index].compareThisTime = newDate.getTime();

                
                    // array[index].compareThisTime = newDate.getTime();
                }
            
            
            
            if (order == "ascending")  {
                array = array.sort((a, b) => a.compareThisTime - b.compareThisTime);
            }

            else if (order == "descending")  {
                array = array.sort((a, b) => b.compareThisTime - a.compareThisTime);
            }


        }


        else if (sortBy == "completion") {

            for (index = 0; index < array.length; index++) {


                completionDateTrim = array[index].date;
                completionDateTrimArray = completionDateTrim.split("d on");

                
                    completionDateTrim = completionDateTrimArray[1];
                    newDate = new Date(completionDateTrim);

                    // let time = newDate.getTime();
                    // if (Number.isNaN(time) == true) {
                    //     completeionDateTrim = array[index].originalDate;
                    //     completionDateTrimArray = completionDateTrim.split("on");
                    //     completionDateTrim = completionDateTrimArray[1];
                    //     newDate = new Date(completionDateTrim);
                    // }


                    
                    if (Number.isNaN(newDate.getTime()) == true) {
                        // let currentTime = Date.now();
                        // array[index].compareThisTime = currentTime.getTime();
                        array[index].compareThisTime = Date.now();
                    }
                    else {
                        array[index].compareThisTime = newDate.getTime();
                    }

                }
            
            
            
            if (order == "ascending")  {
                array = array.sort((a, b) => a.compareThisTime - b.compareThisTime);
            }

            else if (order == "descending")  {
                array = array.sort((a, b) => b.compareThisTime - a.compareThisTime);
            }



        }

        else if (sortBy == "eitherAdd") {

            for (index = 0; index < array.length; index++) {


                completionDateTrim = array[index].date;
                completionDateTrimArray = completionDateTrim.split("d on");

                
                    completionDateTrim = completionDateTrimArray[1];
                    newDate = new Date(completionDateTrim);

                    // let time = newDate.getTime();
                    // if (Number.isNaN(time) == true) {
                    //     completeionDateTrim = array[index].originalDate;
                    //     completionDateTrimArray = completionDateTrim.split("on");
                    //     completionDateTrim = completionDateTrimArray[1];
                    //     newDate = new Date(completionDateTrim);
                    // }
                    if (Number.isNaN(newDate.getTime()) == true) {
                        // let currentTime = Date.now();
                        // array[index].compareThisTime = currentTime.getTime();
                        completionDateTrim = array[index].originalDate;
                        completionDateTrimArray = completionDateTrim.split("d on");

                    
                        completionDateTrim = completionDateTrimArray[1];
                        newDate = new Date(completionDateTrim);
                        }
                    else {
                        array[index].compareThisTime = newDate.getTime();
                    }

                }
            
            
            
            if (order == "ascending")  {
                array = array.sort((a, b) => a.compareThisTime - b.compareThisTime);
            }

            else if (order == "descending")  {
                array = array.sort((a, b) => b.compareThisTime - a.compareThisTime);
            }



        }




        return array;

    }

    function sortList(sortBy, list, order) {

        

        let toDoCount = 0;
        let doneCount = 1;
        let toDoList = [];
        let doneList = [];

        for (index = 0; index < inputObjectList.length ; index++) {
            if (inputObjectList[index].class == "todo") {
                toDoList.push(inputObjectList[index]);
                toDoCount = toDoCount + 1;
            }
            else {
                doneList.push(inputObjectList[index]);
                doneCount = doneCount + 1;
            }
        }








        if (list == "todo") {
          

            if (toDoCount == 0) {
                alert(" please create a list before sorting ");
                return;
            }
            else {
                var confirmResponse = confirm("Are you sure you want to sort the to-do list?");
                if (confirmResponse == true) {
    
    
                   toDoList = helperSortFunction(sortBy, toDoList, order);
                    
                    
                }
                else {
                    return;
                }
            }

        }



        else if (list == "done") {


            if (doneCount == 0) {
                alert(" please create a list before sorting ");
                return;
            }
            else {
                var confirmResponse = confirm("Are you sure you want to sort the done list?");
                if (confirmResponse == true) {
    
                   doneList = helperSortFunction(sortBy, doneList, order);
              
                    
                }
                else {
                    return;
                }
            }

        }


        inputObjectList = [];

        for (index = 0; index < toDoList.length; index ++) {
            inputObjectList.push(toDoList[index]);
        }
        for (index = 0; index < doneList.length; index ++) {
            inputObjectList.push(doneList[index]);
        }


        refreshToDoList();
        saveToLocalStorageByDefault();

        return;
    }








    function listSave(e) {
        e.preventDefault();

        console.log("at the start of the save function, listOfLists is: ");
        console.log(listOfLists);

        let textInput = document.getElementById("list_form_input");
        let textInputValue = textInput.value;


        
        if(textInputValue === "") {
            alert("Input value is blank");
            return;
        }

        for (index = 0; index < listOfLists.length; index++) {
        
            if (textInputValue == listOfLists[index].listName) {
                alert("Name already exists. Please save under another name.");
                return;
                
            }

        }

      
        
        
            let newObject = createListOfListObject(textInputValue);
            pushToListOfListArray(newObject);
        
        
        let inputField = document.getElementById("listNameSave");
        inputField.reset();

        resetWeekMenuColor();
        refreshListOfNames();
            console.log("after refreshing the menu, listOfLists is: ");
            console.log(listOfLists);


        return;    
    }

    function createListOfListObject(name){


        listOfListIDCounter = listOfListIDCounter + 1;
        let currentList = JSON.stringify(inputObjectList);

        
        let newListToPush = {

            listName: name,
            listArray: currentList,
            listNameID: "id: " + listOfListIDCounter

        }

        return newListToPush;

    }


    function pushToListOfListArray(objectToPush) {
        listOfLists.push(objectToPush);

        return;
    }

    function refreshListOfNames() {

        let menu = document.getElementById("menu");
        let menuCounter = 1;

        menu.innerHTML = " ";

        // menu.append(document.createElement("br"));

        for (index = 0; index < listOfLists.length; index++) {
            
            let outerList = document.createElement("li");
            outerList.setAttribute("class", "ui-menu-item");


            let outerDiv = document.createElement("div");
            outerDiv.setAttribute("id", `ui-id-${menuCounter}`);
            outerDiv.setAttribute("class", "ui-menu-item-wrapper");
            outerDiv.setAttribute("aria-haspopup", "true");
            outerDiv.setAttribute("tabindex", "-1");
            outerDiv.setAttribute("role", "menuitem");
            outerDiv.setAttribute("style", "background-color: black;");
            
            menuCounter++;

            let savedName = listOfLists[index].listName;

            outerDiv.innerHTML = savedName;
            // outerList.setAttribute("onclick",`selectListFromMenu("${outerDiv.innerHTML}")`);

            

            //inner UL
            let innerUL = document.createElement("ul");
            innerUL.setAttribute("class", "ui-menu ui-widget ui-widget-content ui-front");
            innerUL.setAttribute("style", "top: 1093.47px; left: 161.2px; display: none;");
            innerUL.setAttribute("role", "menu");
            innerUL.setAttribute("aria-expanded", "false");
            innerUL.setAttribute("aria-hidden", "true");




            //select button
            let innerListSelect = document.createElement("li");
            innerListSelect.setAttribute("class", "ui-menu-item");


            let innerDivSelect = document.createElement("div");
            innerDivSelect.setAttribute("id", `ui-id-${menuCounter}`);
            innerDivSelect.setAttribute("class", "ui-menu-item-wrapper menuSelect");
            innerDivSelect.setAttribute("tabindex", "-1");
            innerDivSelect.setAttribute("role", "menuitem");
            

            innerDivSelect.innerHTML = `<br> Select this saved record named: ${savedName} <br> <br>` ;
            innerListSelect.setAttribute("onclick",`selectListFromMenu("${savedName}", "${outerDiv.id}")`);





            //delete button
            let innerListDelete = document.createElement("li");
            innerListDelete.setAttribute("class", "ui-menu-item");


            let innerDivDelete = document.createElement("div");
            innerDivDelete.setAttribute("id", `ui-id-${menuCounter}`);
            innerDivDelete.setAttribute("class", "ui-menu-item-wrapper menuDelete");
            innerDivDelete.setAttribute("tabindex", "-1");
            innerDivDelete.setAttribute("role", "menuitem");
            

            innerDivDelete.innerHTML = `<br> delete this saved record named: ${savedName} <br> <br>`;
            innerListDelete.setAttribute("onclick",`deleteFromMenu("${savedName}")`);




            innerListDelete.append(innerDivDelete);
            innerListSelect.append(innerDivSelect);
            innerUL.append(innerListSelect);
            innerUL.append(innerListDelete);
            outerList.append(outerDiv);
            outerList.append(innerUL);
            menu.append(outerList);

            
            menuCounter++;

        }
        // menu.append(document.createElement("br"));

        menuCounter = menuCounter - 1;
        menu.setAttribute("aria-activedescendant", `ui-id-${menuCounter}`);



    }

    function selectListFromMenu(selectedList, selectedListID) {
        // alert("selecting!");
        let theRightArray;
        
         
        for (index = 0; index < listOfLists.length; index++) {
        
            if(listOfLists[index].listName == selectedList) {
                
                let userConfirmation = confirm(`Selecting List: "${selectedList}". ` + "Are you sure you want to load this list? Your current list will be lost unless it is saved.")

                if (userConfirmation == true) {

                                // inputObjectList.currentWeekDay = "";
                                // let currentDayDiv = document.getElementById(inputObjectList.currentWeekDayID);
                                // if (currentDayDiv == null || currentDayDiv == "") {
            
                                // }
                                // else {
                                //     currentDayDiv.setAttribute("style", "background-color: white;");
                                // }

                    theRightArray = listOfLists[index].listArray;
                    theRightArrayParsed = JSON.parse(theRightArray);
                    inputObjectList = theRightArrayParsed;

                    // for (index = 0; index < listOfLists.length; index++) {

                    //     let individualDiv = document.getElementById(`ui-id-${menuCounter}`);
                    //     individualDiv.setAttribute("style", "background-color: white;");
                    // }
                    resetWeekMenuColor();
                    refreshListOfNames();
                    let relevantDiv = document.getElementById(selectedListID);
                    relevantDiv.setAttribute("style", "background-color: yellow; color: black;");


                    
                    refreshToDoList();
                    saveToLocalStorageByDefault();

                    return;
                }

                else {
                    alert("Action cancelled.");
                }
            }
        }        
    }


    function deleteFromMenu(selectedListName) {



        let targetObjectIndex = -1;
         
        for (index = 0; index < listOfLists.length; index++) {
            if(listOfLists[index].listName == selectedListName) {
                targetObjectIndex = index;
            }
        }    
        
        
        let userConfirmation = confirm(`Deleting List: "${selectedListName}". ` + "Are you sure you want to delete this list? The delete is permanent unless you have downloaded it as a file. You can also save the list again.")

        if (userConfirmation == true) {
            listOfLists.splice(targetObjectIndex,1);
            
            refreshListOfNames();
            refreshToDoList();
            saveToLocalStorageByDefault();

            return;
        }

        else {
            alert("Delete cancelled.");
        }

    }


    //"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"

    function createWeekDayObject(day) {
        let emptyArray = [];
        let emptyArrayStringified = JSON.stringify(emptyArray);

        let objectCreated = {
            dayName: day,
            listContent: emptyArrayStringified
        }

        return objectCreated;
    }

    function initializingWeekDayLists() {

        weekDayLists[0] = createWeekDayObject("Mon");
        weekDayLists[1] = createWeekDayObject("Tue");
        weekDayLists[2] = createWeekDayObject("Wed");
        weekDayLists[3] = createWeekDayObject("Thu");
        weekDayLists[4] = createWeekDayObject("Fri");
        weekDayLists[5] = createWeekDayObject("Sat");
        weekDayLists[6] = createWeekDayObject("Sun");
        
    }
    
    function savingWeekDayLists(day) {
        let objectToSave = JSON.stringify(inputObjectList);
        for(index = 0; index < weekDayLists.length; index++) {
            if (weekDayLists[index].dayName == day) {

                weekDayLists[index].listContent = objectToSave;
            }
        }
        
   

    }


    function switchToSet(day) {

        refreshListOfNames();
        
        let currentActiveSet = inputObjectList.currentWeekDay;

        if (currentActiveSet == null || currentActiveSet == "") {

        }
        
        else {
            savingWeekDayLists(currentActiveSet);
    
            let currentDayDiv = document.getElementById(inputObjectList.currentWeekDayID);
            currentDayDiv.setAttribute("style", "background-color: black;");
        }
      

        let theRightArray;
        let dayID

        if (day == "Mon") {
            theRightArray = weekDayLists[0].listContent;  
            dayID = "day1";
            
        }
        if (day == "Tue") {
            theRightArray = weekDayLists[1].listContent;  
            dayID = "day2";
        }
        if (day == "Wed") {
            theRightArray = weekDayLists[2].listContent;  
            dayID = "day3";
        }
        if (day == "Thu") {
            theRightArray = weekDayLists[3].listContent;  
            dayID = "day4";
        }
        if (day == "Fri") {
            theRightArray = weekDayLists[4].listContent;  
            dayID = "day5";
        }
        if (day == "Sat") {
            theRightArray = weekDayLists[5].listContent;  
            dayID = "day6";
        }
        if (day == "Sun") {
            theRightArray = weekDayLists[6].listContent;  
            dayID = "day7";
        }

        let selectedDayDiv = document.getElementById(dayID);
        selectedDayDiv.setAttribute("style", "background-color: yellow;")

        theRightArrayParsed = JSON.parse(theRightArray);
        inputObjectList = theRightArrayParsed;
        inputObjectList.currentWeekDay = day;
        inputObjectList.currentWeekDayID = dayID;
        
        refreshToDoList();
        saveToLocalStorageByDefault();        


    }


    //https://jqueryui.com/hide/
    // $( function() {
    //     // run the currently selected effect
    //     function runEffect() {
    //       // get effect type from
    //       var selectedEffect = $( "#effectTypes" ).val();
     
    //       // Most effect types need no options passed by default
    //       var options = {};
    //       // some effects have required parameters
    //       if ( selectedEffect === "scale" ) {
    //         options = { percent: 50 };
    //       } else if ( selectedEffect === "size" ) {
    //         options = { to: { width: 200, height: 60 } };
    //       }
     
    //       // Run the effect
    //       $( "#effect" ).hide( selectedEffect, options, 1000, callback );
    //     };
     
    //     // Callback function to bring a hidden box back
    //     function callback() {
    //       setTimeout(function() {
    //         $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
    //       }, 1000 );
    //     };
     
    //     // Set effect from select menu value
    //     $( "#hideQuickAccessButton" ).on( "click", function() {
    //       runEffect();
    //     });
    //   } );


    //   $( "#hideQuickAccessButton" ).click(function() {
    //     $( "#listLoad" ).toggle( "fold", 1000 );
    //     // $( "listLoad2" ).toggle( "hide", 1000 );
    //   });

// Not really needed... might be useful for part 4 or maybe even a new feature... but not as useful as file I/O
//     function customSaveLocally(e) {

//         e.preventDefault();
    
//         let input = document.getElementById("localStorageNameInput_Save");
//         let inputValue = input.value;

    
//         if(inputValue === "") {
//             alert("Input value is blank");
//             return false;
//         }
    
//         else {
    
//             let keyname = inputValue;
//             let keyvalue = inputObjectList;
//             lsObject[keyname] = keyvalue;

//            // saveToLocalStorage();
//            // refreshContents();
        
//         }
        
//         return false;    
//     } 

// gotta write this to accompany the above if I decide to implement the above.
//     function customLoadLocally() {

//     }
        