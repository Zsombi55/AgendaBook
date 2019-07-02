var editingPersonsId;
//var allPeople = [];

var APIURL = {
	CREATE: "...",
	READ: "users", // 'data/people.json'
	// ADD: "data/add.json"
	ADD: "users/add", // TODO use CREATE
	UPDATE: "users/update",
	DELETE: "users/delete"
};

var APIMETHOD = {
	CREATE: "POST",
	READ: "GET",
	// ADD: "GET"
	ADD: "POST", // TODO use CREATE
	UPDATE: "PUT",
	DELETE: "DELETE"
};

// JS functions packed in a json object -> like a class in OOP languages, eg. C#.
const People = {
	list: [],	// old allPeople list object variable.

	display: function(people){
		var list = people.map(function(person){
			return `
				<tr data-id="${person.id}">
					<td>${person.familyName}</td>
					<td>${person.givenName}</td>
					<td>${person.phoneNumber}</td>
					<td>
						<a href="#" class="delete" tabindex="-1">&#10006;</a>
						<a href="#" class="edit" tabindex="-1">&#9998;</a>
					</td>
				</tr>
			`;
		});
		
		document.querySelector("#agenda tbody").innerHTML = list.join("");
	},

	save: function(){
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
	},

	inlineAdd: function(id, familyName, givenName, phoneNumber) {
		//allPeople.push({
		this.push({	// this -> const People.
			id,
			familyName: familyName,
			givenName: givenName,
			phoneNumber: phoneNumber
		});
		//People.display(allPeople);
		this.display(this.list);
	
		document.querySelector("[name=familyName]").value = "";
		document.querySelector("[name=givenName]").value = "";
		document.querySelector("[name=phoneNumber]").value = "";
	},

	inlineDelete: function(id) {	// A generalised function usable on any "parent" variable object.
		console.warn("Refresh page!", id);
	
		this.list = this.list.filter(function(element){	// element -> person.
			return element.id != id;
		});
		this.display(this.list);
	},

	search: function(value) {	/*	If the array only ever has 1 value the parrentheses can be left out.	*/
		value = value.toLowerCase().trim();
		const filtered = this.list.filter(person => {
			return person.familyName.toLowerCase().includes(value) ||
				person.givenName.toLowerCase().includes(value) ||
				person.phoneNumber.toLowerCase().includes(value);
		});
		this.display(filtered);
	}
};

// r = response, response type
// fetch("data/people.json").then(function(r){	// from people.json
fetch(APIURL.READ).then(function(r){
	return r.json();
}).then(function(people){ // = the succesfully returned "r".
	console.log("all people: ", people);
	People.list = people;
	People.display(people);	// calling the json packed function.
});

/* function display(people){
	var list = people.map(function(person){
		return `
			<tr data-id="${person.id}">
				<td>${person.familyName}</td>
				<td>${person.givenName}</td>
				<td>${person.phoneNumber}</td>
				<td>
					<a href="#" class="delete" tabindex="-1">&#10006;</a>
					<a href="#" class="edit" tabindex="-1">&#9998;</a>
				</td>
			</tr>
		`;
	});
	
	document.querySelector("#agenda tbody").innerHTML = list.join("");
} */

/* function savePerson(){
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
} */

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
			People.inlineAdd(status.id, familyName, givenName, phoneNumber);
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

/* function inlineAddPerson(id, familyName, givenName, phoneNumber) {
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
} */

function inlineEditPerson(id, familyName, givenName, phoneNumber) {
	console.log("Edited Data: ", id + " " + familyName + " " + givenName + " " + phoneNumber);

	window.location.reload(); // reload the page and put the new data from memory to file.
	
	People.display(allPeople);

	editingPersonsId = "";

	document.querySelector("[name=familyName]").value = "";
	document.querySelector("[name=givenName]").value = "";
	document.querySelector("[name=phoneNumber]").value = "";
}

/* function inlineDeletePerson(id) {
	console.warn("Refresh page!", id);

	allPeople = allPeople.filter(function(person){
		return person.id != id;
	});
	People.display(allPeople);
} */

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
			People.inlineDelete(id);
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

/* const searchPerson = value => {	/*	If the array only ever has 1 value the parrentheses can be left out.	*/
	// console.warn(searchBox);

/*	value = value.toLowerCase().trim();
	const filtered = allPeople.filter(person => {
		return person.familyName.toLowerCase().includes(value) ||
			person.givenName.toLowerCase().includes(value) ||
			person.phoneNumber.toLowerCase().includes(value);
	});
	People.display(filtered);
}; */

// Delete, Edit & Search - Event listeners.
function initEvents() {
	const tbody = document.querySelector("#agenda tbody");
	const searchBox = document.querySelector("#search");

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

	/* searchBox.addEventListener("input", function doThing() {
		console.warn("Someone wrote: " + this.value + " !");
	}); */
	
	searchBox.addEventListener("input", (e) => {
		console.warn("Search input: " + e.target.value);
		searchPerson(e.target.value);
	});
}

initEvents();