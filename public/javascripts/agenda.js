// console.log("Yesss!");

var allPeople = [];

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
			<tr>
				<td>${person.familyName}</td>
				<td>${person.givenName}</td>
				<td>${person.phoneNumber}</td>
				<td></td>
			</tr>
		`;
	});
	
	console.log(list);
	
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
	/* fetch("data/add.json", {
		method: "POST",
		body: JSON.stringify({
			familyName: familyName,
			givenName: givenName,
			phoneNumber: phoneNumber
		})
	}); */
	var body = null;
	fetch("data/add.json", {
		method: "GET",
		body: body
	}).then(function(response){
		return response.json();
	}).then(function(status){
		if(status.success){
			console.warn("Saved.", status);
			inlineAddPerson(familyName, givenName, phoneNumber);
		} else {
			console.warn("Not saved!", status);
		}
	});
};

function inlineAddPerson(familyName, givenName, phoneNumber) {
	console.log("data: ", familyName + " " + givenName + " " + phoneNumber);

	allPeople.push({
		familyName: familyName,
		givenName: givenName,
		phoneNumber: phoneNumber
	});
	display(allPeople);
}