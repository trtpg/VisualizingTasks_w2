google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);

var levelCounter = {
  Easy: 0,  // default task assigned as Easy
  Medium: 0,
  Hard: 0
}

var whomCounter = {
  Jen: 0,  //default task assigned to Jen
  Thomas: 0,
  Lucy: 0,
  Justin: 0
}

var TODO = {
  type: "misc",
  tasks:[]
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
  parent.innerHTML = "";

  // Create a <ul> node
  var ul = document.createElement("ul");

  for(var i =0; i<TODO.tasks.length; i++){
    console.log(TODO.tasks[i].description);
    // Create an <li> node
    var li = document.createElement("li");

    // Add task string to the li
    li.innerHTML = TODO.tasks[i].description + " - " + TODO.tasks[i].level + " (" + TODO.tasks[i].assignedTo +")"  ;
    ul.appendChild(li);   // Append li to ul
  }
  parent.appendChild(ul);   // Append the ul to the #list-container
}



function taskBuilder() {
  console.log("enter task builder...")
  event.preventDefault();
  var form = document.querySelector("form");

  var person = getRadioCheckedVal( "assignedTo" );
  var newTask = {description: form.taskdesc.value, // or document.getElementById("task-desc").value;
                 level: form.level.value,
                 assignedTo: person};
  TODO.tasks.push(newTask);
  drawList();

  // keep track counter
  levelCounter[form.level.value] += 1;
  whomCounter[person]  += 1;
  console.log(whomCounter[person]);

  drawChart1(); // donut chart
  drawChart2(); // bar chart
}

function drawChart1() {
  console.log("enter chart1 ...");
  console.log("easy/med/hard = " + levelCounter.Easy + " - " + levelCounter.Medium + " - " + levelCounter.Hard);
  console.log("Jen/Thomas/Lucy/Justin = " + whomCounter.Jen + " - " + whomCounter.Thomas + " - " + whomCounter.Lucy +" - "+whomCounter.Justin );

  // Create the data table1.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Difficult Level');
  data.addColumn('number', 'Level assigned');
  data.addRows([
    ['Easy', levelCounter.Easy],
    ['Medium', levelCounter.Medium],
    ['Hard', levelCounter.Hard]
  ]);

  // Set chart options
  var options = {'title':'Task Difficult Level Distribution',
                 'width':500,
                 'height':300,
                  pieHole:0.2};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart-container1'));
  chart.draw(data, options);
}

function drawChart2() {
  console.log("enter chart2...");

  // Set chart options
  var options = {title:'Barchart: How Many Task assigned to each Person',
                       width:500,
                       height:300,
                       legend: 'none'};

  // Create the data for barchart.
  var data = google.visualization.arrayToDataTable([
          ['Element', 'No. Task', { role: 'style' }],
          ['Jen', whomCounter.Jen, '#b87333'],  // RGB value
          ['Thomas', whomCounter.Thomas, 'blue'],  // English color
          ['Lucy', whomCounter.Lucy, 'gold'],
          ['Justin', whomCounter.Justin, 'grey' ],
       ]);

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('chart-container2'));
  chart.draw(data, options);
}


function getRadioCheckedVal(radioName) {
  var oRadio = document.forms[0].elements[radioName];
  for(var i = 0; i < oRadio.length; i++)
  {
    if(oRadio[i].checked) {return oRadio[i].value; }
  }
}
