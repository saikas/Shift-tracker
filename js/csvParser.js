// Used to generate a table that contains shifts from the imported CSV file

var filename = null;
var fileContent = "";

function generateTable(tableID) {

	// var Arr2D[][] = 
	// csvStrTo2DStrArray(csvStr);

	setFilenameFromURL();
	loadCSVFile(filename);

}

function csvStrTo2DStrArray(str) {
	// console.log("csvToArr:\n"+str);

	
}

function setFilenameFromURL() {
	var url = "" + window.location.href;
	url = new URL(url);
	filename = url.searchParams.get("name");
}

function loadCSVFile(filename) {
	var input = document.createElement("input");
	input.files[0] = filename;

	if (file) {
		console.log("in");

		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function (evt) {
			fileContent = evt.target.result;
			console.log("file content:\n" + fileContent);
		}
		reader.onerror = function (evt) {
			alert("Error reading file");
		}
	}
}
