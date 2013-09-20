Parse.initialize("YgfGDeGWOa7NNprcxhMJPHhZaKTYzxywReo8ayth", "8SVlwGI2DE9XYG1T7TQCKjrewGB7qF0X2qhsSBGb");

var ChatClass = Parse.Object.extend("Chat");

var ChatCollectionClass = Parse.Collection.extend({
	model: ChatClass
});

var ChatCollectionClassPrivate = Parse.Collection.extend({
	model: ChatClass
});

var chatCollectionPrivate = new ChatCollectionClassPrivate();
var chatCollection = new ChatCollectionClass();
 
$(function(){

	chatCollectionPrivate.fetch({
		success: function(collection) {
				collection.each(function(message){
				addToContentField(message);
			});
		}
	});

	chatCollection.fetch({
		success: function(collection) {
				collection.each(function(message){
				addToContentField(message);
			});
		}
	});
	$('.submit-btn').click(function(){
		var message = $('.message-field');
		var name = $('.name-field');
		messageValidate(message, name);
	});
});

function messageValidate (message, name) {
	if(message.val() === "") {
		message.addClass('error').attr('placeholder', 'Ninja Name');
	} 
	if(name.val() === "") {
		name.addClass('error').attr('placeholder', 'Be a ninja, and type something in!');
	} 
	else {
		prepMessage(message, name);
	}
}


function prepMessage (message, name) {
	var chatMessage = new ChatClass();	
	var fileUploadControl = $("#profilePhotoFileUpload")[0];
	// if there's a file, upload it first,
	// and THEN save the message
	if (fileUploadControl.files.length > 0) {
  		var file = fileUploadControl.files[0];
  		var namer = "photo.jpg";
  		console.log("Yay")
 
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

// save the message
function saveMessage(message) {
	message.set('message', $('.message-field').val());
	message.set('name', $('.name-field').val());
	
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
	$('.message-field').val('');
	var profilePhoto = message.get("photo");
	if (message.get('photo')) {
		console.log('PHOTO IS',message.get("photo").url());
		$('.messageList').append('<img src="'+message.get("photo").url()+'" />');
	}
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

