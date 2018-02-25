//Steven Yen, 2018
//front-end sript collecting and passing user request to back-end.

$(function(){
	
//Request 1: GET all books stored in library
	$('#req1-button').on('click',function(){
		$.ajax({
			url: '/allItems',
			method: 'GET',
			contentType: 'application/json', //type of data recieved from server.
			success: function(res){
				console.log("strigyfy res:");
				console.log(JSON.stringify(res)); //looks good
				var resObj = res.itemList; //need to get 1 of 1 item b/c format
				console.log(resObj); //converted to an array of objects
				//console.log(resObj[0].id_); //outputs the id sucessfully
				var htmltext ="<h3>Request #1: Get all books in library</h3><ul>";
				for(i=0;i<resObj.length;i++){
					htmltext+="<li>Book Title: ";
					htmltext+=resObj[i].id_;
					htmltext+="<ul><li>Year: ";
					htmltext+=resObj[i].created_at_;
					htmltext+="<li>Notes: ";
					htmltext+=resObj[i].text_;
					htmltext+="<li>Author: ";
					htmltext+=resObj[i].author_;
					htmltext+="<li>Status/Notes: ";
					htmltext+=resObj[i].notes_;
					htmltext+="</ul>";
				}
				
				var resultsEl = $('#resultsDiv');
				//resultsEl.html(""); //not necessary, .html already replaces
				resultsEl.html(htmltext);
				
			}
		});
	});

//Request 2: Update the status/notes field of a book
	$('#req2-form').on('submit',function(event){
		event.preventDefault(); //prevent hard refresh when button clicked.
		
		var bookTitle = $('#req2-input-title').val();
		var bookNotes = $('#req2-input-notes').val();
	
		$.ajax({
			url: '/updateNotes',
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({title_:bookTitle, notes_:bookNotes}), //data sent to server as JSON string
			success: function(res){
				//console.log("sucessfully deleted book!");
			}
		});	
	});

//Request 3: Delete a book from the library
	$('#req3-form').on('submit',function(event){
		event.preventDefault(); //prevent hard refresh when button clicked.
		
		var bookTitle = $('#req3-input-title').val();
	
		$.ajax({
			url: '/deleteItem',
			method: 'DELETE',
			contentType: 'application/json',
			data: JSON.stringify({title_:bookTitle}), //data sent to server as JSON string
			success: function(res){
				//console.log("sucessfully deleted book!");
			}
		});	
	});

//Request 4: Add a new book to the library
	$('#req4-form').on('submit',function(event){
		event.preventDefault(); //prevent hard refresh when button clicked.
		
		var newTitle = $('#req4-input-title').val();
		var newAuthor = $('#req4-input-author').val();
		var newType = $('#req4-input-type').val();
		var newYear = $('#req4-input-year').val();
		var newNotes =  $('#req4-input-notes').val();
	
		//console.log("user input ="+userInput);
		
		$.ajax({
			url: '/addNew',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({author_:newAuthor, title_:newTitle, type_:newType, year_:newYear, notes_:newNotes}), //data sent to server as JSON string
			success: function(res){
				//console.log("sucessfully add new book!");
			}
		});	
	});

});





