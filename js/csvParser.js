// Used to generate a table that contains shifts from the imported CSV file
var data2DArr = [];

function parseCSV(str) {
	var data = [];
	var rows = str.split("<br />");

	rows.forEach(function(row) {
		data.push(row.split(','));
	});

	return data;
}

function genDataTableHTML(str) {
	data2DArr = parseCSV(str);
	var table = "";
	var rowStr = "<tr>";

	//loops through all rows
	for (var i = 0; i < data2DArr.length; i++) {
		//build <tr> tags
		rowStr = "<tr>";
		var colStr = "";
		//build <td> tags
		for (var j = 0; j < data2DArr[i].length; j++) {
			colStr += "<td class='csvData'>"+ data2DArr[i][j] +"</td>\n";
		}//j

		rowStr += colStr + "</tr>\n";
		table += rowStr;
	}//i

	table += "\n";
	return table;
}

function writeToElement(id, html) {
	document.getElementById(id).innerHTML = html;
}
