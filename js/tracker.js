// Author: Alexander S.

var shiftArr = [];
var CsvStrArr = [];
var redoArr = [];
var redoCsvArr = [];

var filename = null;
var fileContent = "";
var csv = "";

var printTitles = true;
var defaultDate = true;
var timeSlots = "";

var start = 5.0;
var end = 23.0;
var intervalsPerHour = 60;

var payMin = 15.0;
var payRange = 10.0;


function init() {

	backgroundLooper(10);

	document.getElementById("shiftDate").disabled = true;
	document.getElementById("fileImp").addEventListener('change', loadFile, false);

	timeSlots = genTimeSlots(start, end, intervalsPerHour);

	var el = document.getElementById("startTimeDropDown");
	el.innerHTML = timeSlots;
	el = document.getElementById("endTimeDropDown")
	el.innerHTML = timeSlots;

	genPay(document.getElementById("pay"), payMin, payRange);

	deActivateUndoBtn();
	deActivateRedoBtn();
	deActivateUpdateBtn();
	deActivatePreviewBtn();

	deActivateDownloadTitle();
	deActivateDownloadBtn();
}

function genTimeSlots(minTime, maxTime, intervalsPerHour) {
	var str = "", tmp = "";
	var numIntervals = (maxTime - minTime) * intervalsPerHour;
	var hours = minTime;
	var minutes = 0;

	for(var i=0; i <= numIntervals; i++) {
		if(i % intervalsPerHour == 0 && i != 0) {
			hours++;
			minutes = 0;
		}
		str += "<option value=\""+ math.add(minTime, (i/intervalsPerHour)) +"\">"+ pad(hours) +":"+ pad(minutes) +"</option>";
		minutes++;
	}
	return str;
}

function toggleDateType(radioBtn) {
	if(radioBtn.id == "currDate" && radioBtn.checked == true)
		defaultDate = true;

	if(radioBtn.id == "custDate" && radioBtn.checked == true)
		defaultDate = false;
}

function pad(d) {
	return (d < 10) ? '0' + d.toString() : d.toString();
}

function genPay(el, minPay, range) {
	var pay = minPay;
	for(var i = 0; i <= range; i++) {
		var str = "<option value=\"" +pay+ "\">$" +pay+ "</option>";
		el.innerHTML += str;
		pay++;
	}
}

function genData() {
	var data = [];
	var e;
	var Start_Float = 0;
	var End_Float = 0;
	var totalTime = 0, hours = 0, mins = 0;

	if(defaultDate) {
		var d = new Date();
		data.Date = ""+ d.getFullYear() +"-"+ (d.getMonth()+1) +"-"+ d.getDate();
	}
	else {
		e = document.getElementById("shiftDate");
		data.Date = document.getElementById('shiftDate').value;
	}

	e = document.getElementById("startTimeDropDown");
	data.Start_Time = e.options[e.selectedIndex].innerHTML;
	Start_Float = parseFloat(e.options[e.selectedIndex].value);

	e = document.getElementById("endTimeDropDown");
	data.End_Time = e.options[e.selectedIndex].innerHTML;
	End_Float = parseFloat(e.options[e.selectedIndex].value);

	//invalid input: can't clock-out before clock-in
	if(End_Float <= Start_Float) {
		var w = window.open('','','width=380,height=50');
		w.document.write('<h1>Error!</h1>\nPunch-Out time MUST be AFTER Punch-In time!');
		w.focus();
		setTimeout(function() {w.close();}, 5000);
		return null;
	}

	e = document.getElementById("pay");
	data.Rate = e.options[e.selectedIndex].value;
	
	totalTime = parseFloat(End_Float - Start_Float);
	hours = Math.floor(totalTime);	
	mins = Math.round( ((totalTime - hours)*60) );
	if(mins == 60) {
		mins = 0;
		hours++;
	}
	data.Length = "" + pad(hours) + "Hr" + pad(mins) + "min";
	data.Length_Float = totalTime.toFixed(4);

	data.Total = (totalTime * data.Rate).toFixed(2);


	return data;
}

function downloadCSV() {
	if(filename == null) {
		filename = getFilename();
	}
	var link = document.createElement('a');
	link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
	link.setAttribute('download', filename);
	link.style.display = 'none';
	link.click();
}


function getFilename() {
	var filename = '';
	while(filename == null || filename.substr(filename.lastIndexOf('.') + 1) != "csv") {
		filename = prompt("Please enter filename:", "WorkHours.csv");
	}
	return filename;
}


function displayShifts(arr) {
	var w = window.open('','','width=700,height=500');
	var shifts = "";
	CsvStrArr.forEach(function(str) {
		shifts += str + "<br>";
	});
	w.document.write("<h2>Current Shifts:</h2>" + shifts);
	w.focus();
	setTimeout(function() {w.close();}, 2500);
}

// Add Btn
function addShift() {

	var shift = genData();

	if(shift == null){
		console.log("Invalid Shift");
		return;
	}
	else {
		var csvLine = convertArrayOfObjectsToCSV(new Array(shift), 0);
		shiftArr.push(shift);
		CsvStrArr.push(csvLine);
	}

	displayShifts(CsvStrArr);
	console.log("shift added");
	
	activateUndoBtn();
	activateUpdateBtn();
	deActivateRedoBtn();

	deActivateDownloadBtn();
	deActivateDownloadTitle();
}


// Redo Btn
function redoShift() {
	if(redoArr.length >= 1) {
		recover();
		if(redoArr.length == 0) {
			deActivateRedoBtn();
		}
	}
		
	displayShifts(CsvStrArr);
	console.log("shift redone");
		
	activateUpdateBtn();
	activateUndoBtn();

	deActivateDownloadBtn();
	deActivateDownloadTitle();
}

// Undo Btn
function removeShift() {
	
	if(shiftArr.length >= 1) {
		remove();
		if(shiftArr.length == 0) {
			deActivateUndoBtn();
		}
	}
	
	displayShifts(CsvStrArr);
	console.log("shift removed");
	
	activateRedoBtn();
	activateUpdateBtn();

	deActivateDownloadBtn();
	deActivateDownloadTitle();
}

function remove() {
	redoArr.push(shiftArr.pop());
	redoCsvArr.push(CsvStrArr.pop());
}

function recover() {
	shiftArr.push(redoArr.pop());
	CsvStrArr.push(redoCsvArr.pop());
}

function update() {
	activateDownloadBtn();
	activateDownloadTitle();

	clearBackupArrays();
	
	deActivateUpdateBtn();
	deActivateUndoBtn();
	deActivateRedoBtn();
}

function clearBackupArrays() {
	redoArr = [];
	redoCsvArr = [];
}

function finalize() {
	csv = fileContent + convertArrayOfObjectsToCSV(shiftArr, printTitles);	
}

function toggleElement(id, radio) {
	var el = document.getElementById(id);
	if(radio.id == "currDate") {
		el.disabled = true;
	}
	if(radio.id == "custDate") {
		el.disabled = false;
	}
}

function printFileContent() {
	var w = window.open('','','width=700,height=650');
	var previewStr = fileContent;
	previewStr = previewStr.split("\n").join("<br />");
	w.document.write("<h1>File Preview:</h1>" + previewStr);
	w.focus();
}

function loadFile(evt) {

	var file = document.getElementById("fileImp").files[0];
	shiftArr = [];
	redoArr = [];
	CsvStrArr = [];
	redoCsvArr = [];

	deActivateUndoBtn();
	deActivateRedoBtn();
	deActivateUpdateBtn();

	if (file) {
		filename = file.name;
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			fileContent = evt.target.result;
			console.log("file content:\n" + fileContent);
		}
		reader.onerror = function (evt) {
			alert("Error reading file");
		}

		printTitles = false;
		activatePreviewBtn();
	}
}

function convertArrayOfObjectsToCSV(arr, addTitles) {
	var result, ctr, keys;
	
	var columnDelimiter = ',';
	var lineDelimiter = '\n';
	result = '';

	if(arr.length > 0) {
		keys = Object.keys(arr[0]);
	}
	else {
		return result;
	}

	if(addTitles) {
		result += keys.join(columnDelimiter);
		result += lineDelimiter;
	}

	arr.forEach(function(shift) {
		ctr = 0;
		keys.forEach(function(key) {
			if (ctr > 0) {
				result += columnDelimiter;
			}
			result += shift[key];
			ctr++;
		});
		result += lineDelimiter;
	});

	return result;
}
