Parse.initialize("YgfGDeGWOa7NNprcxhMJPHhZaKTYzxywReo8ayth", "8SVlwGI2DE9XYG1T7TQCKjrewGB7qF0X2qhsSBGb");

var ChatClass = Parse.Object.extend("Chat");

var ChatCollectionClass = Parse.Collection.extend({
	model: ChatClass
});

var chatCollection = new ChatCollectionClass();
 
$(function(){

	
	chatCollection.fetch({
		success: function(collection) {
				collection.each(function(message){
				addToContentField(message);
				
			});
		}
	});

	$('.login-btn').click(function() {
		var name = $('.name-field');
		if(name.val() === "") {
			name.addClass('error').attr('placeholder', 'Ninja Name');
		} 
		logIn(name);
		// getNames(message);
	});

	$('.submit-btn').click(function(){
		var message = $('.message-field');
		messageValidate(message);
	});

});

// create modal with username login
// check 1: check to see if user entered matches collection of users in parse
// check 2: display usernames on left of chat
// check 3: show current users logged in with red highlight


function messageValidate (message) {
	
	if(message.val() === "") {
		message.addClass('error').attr('placeholder', 'Be a ninja, and type something in!');
	} 
	else {
		prepMessage(message);
	}
}


function prepMessage (message) {
	var chatMessage = new ChatClass();	
	var fileUploadControl = $("#profilePhotoFileUpload")[0];
	// if there's a file, upload it first,
	// and THEN save the message
	if (fileUploadControl.files.length > 0) {
  		var file = fileUploadControl.files[0];
  		var namer = "photo.jpg";
 
	  	var parseFile = new Parse.File(namer, file);
	  	parseFile.save().then(function(){
			chatMessage.set("photo", parseFile);
	  		saveMessage(chatMessage)
	  	})
	// if there's no file, just save it straight away 
	} else {
		saveMessage(chatMessage)
	}
}

function logIn(message) {
	var chatLogin = new ChatClass();	
	message.set('name', $('.name-field').val());
	message.set('loggedin', true);

	message.save(null, {
		success: function() {
			var li = $('<li>' + message.get('name') + '</li>');
			$('.nameList').append(li);
		},
		error: function() {
			alert(error.description);
		}
	});
}

// save the message
function saveMessage(message) {
	message.set('message', $('.message-field').val());

	
	message.save(null, {
		success: function(){
			addToContentField(message);
		},
		error: function(error){
			alert("A Parse error has occured..., " + error.description);
		}
	});
}

// Message in addToContentField is now using "chatMessage instance" as argument
// To get values from chatmessage instance use the "message.get"
 
function addToContentField (message) {
	var li = $('<li><b>' + message.get('name')+' says: </b>' + message.get('message')+'</li>');
	$('.messageList').append(li);
	// only clears out the message field, not name field
	$('.message-field').val('');
	var profilePhoto = message.get("photo");
	if (message.get('photo')) {
		console.log('PHOTO IS',message.get("photo").url());
		$('.messageList').append('<img src="'+message.get("photo").url()+'" />');
	}
}

function getNames (message) {
	var all = $('<li class="usernames">'+message.get('name')+ '</li>');
	// var name = $('nameList');
	$('.nameList').append(all); 
	console.log($('.nameList li')[2]);

	// $('.nameList').forEach(function (name) {
	// 	// if (message.get('name') == name) { 
	// 		console.log(name);
	// 	});
		// else { $('.nameList').append(all); }
}


function getNames2 (message) {
	var all = $('<li class="usernames">'+message.get('name')+ '</li>');
	$('.nameList').append(all); 
	console.log($('.nameList li')[2]);
}

setInterval(function() {
	$('.messageList').html('');

	chatCollection.fetch({
		success: function(collection) {
				collection.each(function(message){
				addToContentField(message);
			});
		}
	});
}, 3000000);

