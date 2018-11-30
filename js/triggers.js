// Author: Alexander S.

function activateDownloadTitle() {
	var el = document.getElementById("expTitle");
	el.style.visibility = "visible";
	el.classList.remove("hidden");
}

function activateDownloadBtn() {
	var btn = document.getElementById("exportBtn");
	btn.style.visibility = "visible";
	btn.classList.remove("hidden");
}

function deActivateDownloadTitle() {
	var el = document.getElementById("expTitle");
	el.style.visibility = "hidden";
	el.classList.add("hidden");
}

function deActivateDownloadBtn() {
	var btn = document.getElementById("exportBtn");
	btn.style.visibility = "hidden";
	btn.classList.add("hidden");
}

function activateRedoBtn() {
	var btn = document.getElementById("redoBtn");
	btn.disabled = false;
}

function deActivateRedoBtn() {
	var btn = document.getElementById("redoBtn");
	btn.disabled = true;
}

function activateUpdateBtn() {
	var btn = document.getElementById("updateBtn");
	btn.disabled = false;
}

function deActivateUpdateBtn() {
	var btn = document.getElementById("updateBtn");
	btn.disabled = true;
}

function activateUndoBtn() {
	var btn = document.getElementById("undoBtn");
	btn.disabled = false;
}

function deActivateUndoBtn() {
	var btn = document.getElementById("undoBtn");
	btn.disabled = true;
}

function activatePreviewBtn() {
	var btn = document.getElementById("previewBtn");
	btn.disabled = false;
}

function deActivatePreviewBtn() {
	var btn = document.getElementById("previewBtn");
	btn.disabled = true;
}
