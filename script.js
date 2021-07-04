
displayNotes();
var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(){
	
	let notesObj;
	let addNote = document.getElementById('addtext');
	let title = document.getElementById('title');
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	//Add date
	let now = new Date();
	let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`;
	
	
	//pushing into local storage
	let tempObj = { text: addNote.value, 
		time: dateTime, 
		title: title.value
	};
	
	notesObj.push(tempObj);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	addNote.value = '';
	title.value ='';
	
	displayNotes();
});


// funtion to display data stored in the local storage
function displayNotes(){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	let html = '';
	
	notesObj.forEach(function(element,index){
		html += `
				<div class="card my-2 mx-2 bg-dark text-white cardNote" style="width: 20rem;">
					<div class="card-body">
						<h7>${element.time}</h7>
						<h5>${element.title}</h5>
						<p class="card-text">${element.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
						<button id="${index}" onclick=deleteNote(this.id) class="btn btn-danger">DELETE</button>
					</div>
				</div>
			`;
	});
	
	let a = document.getElementById('notes');
	
	if(notesObj.length != 0){
		a.innerHTML = html;
	}
	else{
		a.innerHTML = '<h4 style="text-align: center; color: grey;">Nothing to display</h3>';
	}
	
}


//function to delete a note
function deleteNote(index){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	notesObj.splice(index,1);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	displayNotes();
}

