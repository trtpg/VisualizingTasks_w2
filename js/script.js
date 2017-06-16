var task1 = {
  "description": "study JavaScript (default)",
  "level": "Medium",
  "assignedTo": "self"
}
// var task2 = {
//   "description": "Intro HTML5 tutorial",
//   "level": "Easy",
//   "assignedTo": "Lenning"
// }

var TODO = {
  type: "misc",
  tasks:[task1]
}

// Will run after all HTML is done rendering
window.onload = function(){
  drawList();
  var form = document.querySelector("form");
  form.onsubmit = taskBuilder;
}

function drawList() {
  console.log("enter drawlist()...");

  // Select #list-container element from HTML (add it to HTML first!)
  var parent = document.getElementById("list-container")
  console.log(parent);

  // Clear out existing contents
  parent.innerHTML = ""

  // Create a <ul> node
  var ul = document.createElement("ul")

  for(var i =0; i<TODO.tasks.length; i++){
    console.log(TODO.tasks[i].description)
    // Create an <li> node
    var li = document.createElement("li")

    // Add the roof string to the li

    // li.innerHTML = "<span tyle=color:blue>" + TODO.tasks[i].description + "</span>";
    li.innerHTML = TODO.tasks[i].description + " - " + TODO.tasks[i].level + " (" + TODO.tasks[i].assignedTo +")"  ;


    // Append li to ul
    ul.appendChild(li)
  }

  // Append the ul to the #list-container
  parent.appendChild(ul)

}

function taskBuilder() {
  console.log("enter task builder...")
  event.preventDefault();
  var form = document.querySelector("form");

  var whom = getRadioCheckedVal( "assignedTo" );
  var newTask = {description: form.taskdesc.value, // or document.getElementById("task-desc").value;
                 level: form.level.value,
                 assignedTo: whom};
  TODO.tasks.push(newTask);
  drawList();
}


function getRadioCheckedVal(radioName) {
  var oRadio = document.forms[0].elements[radioName];
  for(var i = 0; i < oRadio.length; i++)
  {
    if(oRadio[i].checked) {return oRadio[i].value; }
  }
}
