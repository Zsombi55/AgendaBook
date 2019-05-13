// console.log("Yesss!");

var editingPersonsId;
var allPeople = [];

var APIURL = {
	CREATE: "...",
	READ: "...",
	// ADD: "data/add.json"
	ADD: "users/add",
	UPDATE: "users/update",
	DELETE: "users/delete"
};

var APIMETHOD = {
	CREATE: "POST",
	READ: "GET",
	// ADD: "GET"
	ADD: "POST",
	UPDATE: "PUT",
	DELETE: "DELETE"
};

// r = response, response type
fetch("data/people.json").then(function(r){
	return r.json();
}).then(function(people){ // = the succesfully returned "r".
	console.log("all people: ", people);
	allPeople = people;
	display(people);
	/* return [people[0].givenName, people[0].familyName, people[0].phoneNumber];
}).then(function(p){ //= the succesfully returned "people[0].givenName".
	console.log("Cine o fi P? ", p); */
});

function display(people){
	var list = people.map(function(person){
		return `
			<tr data-id="${person.id}">
				<td>${person.familyName}</td>
				<td>${person.givenName}</td>
				<td>${person.phoneNumber}</td>
				<td>
					<a href="#" class="delete">&#10006;</a>
					<a href="#" class="edit">&#9998;</a>
				</td>
			</tr>
		`;
	});
	
	document.querySelector("#agenda tbody").innerHTML = list.join("");
}

function savePerson(){
	console.log("Save person.");

	// var givenName = document.getElementsByName("givenName")[0].value;
	var familyName = document.querySelector("[name=familyName]").value;
	var givenName = document.querySelector("[name=givenName]").value;
	var phoneNumber = document.querySelector("[name=phoneNumber]").value;
	console.warn("save person data: ", familyName + " " + givenName + " " + phoneNumber);

	if(editingPersonsId) {
		submitEditedPerson(editingPersonsId, familyName, givenName, phoneNumber);
	} else {
		submitNewPerson(familyName, givenName, phoneNumber);
	}
}

function submitNewPerson(familyName, givenName, phoneNumber) {
	console.warn("save new person: ", familyName + " " + givenName + " " + phoneNumber);
	
	var body = null;
	const method = APIMETHOD.ADD;

	if(method === "POST"){
		body = JSON.stringify({ familyName, givenName, phoneNumber });
	}

	fetch(APIURL.ADD, { method, body, headers: {"Content-Type": "application/json"}
	}).then(function(response){
		return response.json();
	}).then(function(status){
		if(status.success){
			console.warn("Saved.", status);
			inlineAddPerson(status.id, familyName, givenName, phoneNumber);
		} else {
			console.warn("Not saved!", status);
		}
	});
}

function submitEditedPerson(id, familyName, givenName, phoneNumber) {
	console.warn("Save edited person: ", id + " " + familyName + " " + givenName + " " + phoneNumber);
	
	var body = null;
	const method = APIMETHOD.UPDATE;

	if(method === "PUT"){
		body = JSON.stringify({ id, familyName, givenName, phoneNumber });
	}

	fetch(APIURL.UPDATE, { method, body, headers: {"Content-Type": "application/json"}
	}).then(function(response){
		return response.json();
	}).then(function(status){
		if(status.success){
			console.warn("Saved.", status);
			inlineEditPerson(id, familyName, givenName, phoneNumber);
		} else {
			console.warn("Not saved!", status);
		}
	});
}

function inlineAddPerson(id, familyName, givenName, phoneNumber) {
	console.log("data: ", familyName + " " + givenName + " " + phoneNumber);

	allPeople.push({
		id,
		familyName: familyName,
		givenName: givenName,
		phoneNumber: phoneNumber
	});
	display(allPeople);

	document.querySelector("[name=familyName]").value = "";
	document.querySelector("[name=givenName]").value = "";
	document.querySelector("[name=phoneNumber]").value = "";
}

function inlineEditPerson(id, familyName, givenName, phoneNumber) {
	console.log("Edited Data: ", id + " " + familyName + " " + givenName + " " + phoneNumber);

	window.location.reload(); // reload the page and put the new data from memory to file.
	
	display(allPeople);

	editingPersonsId = "";

	document.querySelector("[name=familyName]").value = "";
	document.querySelector("[name=givenName]").value = "";
	document.querySelector("[name=phoneNumber]").value = "";
}

function inlineDeletePerson(id) {
	console.warn("Refresh page!", id);

	allPeople = allPeople.filter(function(person){
		return person.id != id;
	});
	display(allPeople);
}

function deletePerson(id) {
	var body = null;
	
	if(APIMETHOD.DELETE === "DELETE"){
		// body = JSON.stringify({ id: id });
		body = JSON.stringify({ id });
	}

	fetch(APIURL.DELETE, {
		method: APIMETHOD.DELETE,
		body: body,
		headers: {"Content-Type": "application/json"}
	}).then(function(response){
		return response.json();
	}).then(function(status){
		if(status.success){
			console.warn("Removed.", status);
			inlineDeletePerson(id);
		} else {
			console.warn("Not removed!", status);
		}
	});
}

const editPerson = function(id) {
	var person = allPeople.find(function(p){
		return p.id == id;
	});
	console.warn("Found: ", person);

	document.querySelector("[name=familyName]").value = person.familyName;
	document.querySelector("[name=givenName]").value = person.givenName;
	document.querySelector("[name=phoneNumber]").value = person.phoneNumber;
	editingPersonsId = id;
};

// Event listener.
function initEvents() {
	const tbody = document.querySelector("#agenda tbody");

	tbody.addEventListener("click", function(e) {
		if (e.target.className == "delete") {
			const tr = e.target.parentNode.parentNode;
			const id = tr.getAttribute("data-id");
			
			console.warn("Parent?", e.target.parentNode.parentNode);
			console.warn("Parent?", id);

			deletePerson(id);
		} else if(e.target.className == "edit") {
			const tr = e.target.parentNode.parentNode;
			const id = tr.getAttribute("data-id");

			console.warn("edit", id);

			editPerson(id);
		}
	});
}

initEvents();