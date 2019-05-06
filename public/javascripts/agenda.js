// console.log("Yesss!");

var allPeople = [];

var APIURL = {
	// ADD: "data/add.json"
	ADD: "users/add",
	DELETE: "users/delete"
};

var APIMETHOD = {
	// ADD: "GET"
	ADD: "POST",
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

	submitNewPerson(familyName, givenName, phoneNumber);
}

function submitNewPerson(familyName, givenName, phoneNumber) {
	console.warn("save new person: ", familyName + " " + givenName + " " + phoneNumber);
	
	var body = null;
	
	if(APIMETHOD.ADD === "POST"){
		body = JSON.stringify({
			familyName: familyName,
			givenName: givenName,
			phoneNumber: phoneNumber
		});
	}

	fetch(APIURL.ADD, {
		method: APIMETHOD.ADD,
		body: body,
		headers: {"Content-Type": "application/json"}
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

function inlineAddPerson(id, familyName, givenName, phoneNumber) {
	console.log("data: ", familyName + " " + givenName + " " + phoneNumber);

	allPeople.push({
		id,
		familyName: familyName,
		givenName: givenName,
		phoneNumber: phoneNumber
	});
	display(allPeople);
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
		}
	});
}

initEvents();