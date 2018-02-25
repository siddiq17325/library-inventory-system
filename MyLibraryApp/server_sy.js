//Steven Yen
//Back-end server that recieves request and responds.
	
//setting up the server using express library
var express = require('express');
var app = express();

var PORT = process.env.PORT || 8123;

app.use(express.static(__dirname));
////Setting up the server

var bodyParser = require('body-parser'); //needed by requests 1...
app.use(bodyParser.json());//this allow us to use obyd parser in request

//Below for MySQL
var mysql = require('mysql');

var mysqlCntr = mysql.createConnection({
	host: "localhost",
	user: "user1",
	password: "1234"
});

queryStr = 'use publications; ';

mysqlCntr.connect(function(err){
	if(err) throw err;
	console.log("sucessfully connected to mysql!");
});

//Q specify database
	queryStr = 'use publications; ';	
	mysqlCntr.query(queryStr, function(err, result){
		if(err) throw err;
		console.log("Success: Result: "+result);
		});


//Request 1: Get All Books
	app.get('/allItems',function(req, res){
		var itemList = new Array();

		//Q get all items from database
		queryStr = 'select * from classics; ';	
		mysqlCntr.query(queryStr, function(err, result){
			if(err) throw err;
			console.log("Success: Result: "+result);
		
			result.forEach((entry)=> {
				console.log(entry.title+", by "+entry.author+ ", published "+entry.year);
				//console.log('${entry.title} by ${entry.author}, published ${entry.year}');
				var newItem = { id_: entry.title, created_at_: entry.year, text_: entry.notes, author_:entry.author, notes_:entry.notes };
				itemList.push(newItem);
			});

			res.send({itemList});
		});		
	});

//Request 4: Add new book
	app.post('/addNew',function(req,res){
		
		//Q add item to database
		newBookAuthor = req.body.author_;
		newBookTitle = req.body.title_;
		newBookType = req.body.type_;
		newBookYear = req.body.year_;
		newBookNotes = req.body.notes_;
		queryStr = 'insert into classics(author, title, type, year, notes) values(';
		queryStr +=  ('\''+ newBookAuthor + '\',');
		queryStr +=  ('\''+ newBookTitle + '\',');
		queryStr +=  ('\''+ newBookType + '\',');
		queryStr +=  ('\''+ newBookYear + '\',');
		queryStr +=  ('\''+ newBookNotes + '\');');
		console.log("query string: "+queryStr);
		mysqlCntr.query(queryStr, function(err, result){
			if(err) throw err;
			console.log("Success: Result: "+result);
		});

		console.log("new book added --backend!");
		//this req.body gets us the 'data' field of the header recieved by server.
		
	});

//Request 3: Delete a book
	app.delete('/deleteItem',function(req,res){
			
	//Q delete item from db
		TitleOfBookToDelete = req.body.title_;
		queryStr = 'delete from classics where title = \'';
		queryStr += (TitleOfBookToDelete+'\';');
		console.log(queryStr);
		mysqlCntr.query(queryStr, function(err, result){
			if(err) throw err;
			console.log("Success: Result: "+result);
		});

		console.log("Backend: book deleted!!");
	
	});

//Request 2: Update status/notes field of a book
	app.put('/updateNotes',function(req,res){
			
		//Q update notes field of a book
		bookToUpdate = req.body.title_;
		newNotes = req.body.notes_;
		queryStr = 'update classics set notes = \'';
		queryStr += (newNotes+'\' where title = \''+bookToUpdate+'\';');
		mysqlCntr.query(queryStr, function(err, result){
			if(err) throw err;
			console.log("Success: Result: "+result);
		});

		console.log("Backend: book status updated!!");
	
	});

app.listen(PORT,function(){
	console.log('Server listening on '+ PORT);
	
});

















