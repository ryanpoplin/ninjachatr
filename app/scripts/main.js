// Parse.initialize("YgfGDeGWOa7NNprcxhMJPHhZaKTYzxywReo8ayth", "8SVlwGI2DE9XYG1T7TQCKjrewGB7qF0X2qhsSBGb");

Parse.initialize("9RIJYpUHiaqiqChMTheAmqvGtQkENCSktUtOBHcD", "jkLZciAB09Zfa9YFhq0Hhl8hEQHSsyYAm7wqnoig");

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
	$('.submit-btn').click(function(){
		messageValidate($('.message-field').val());
	});
});

function messageValidate (message) {
	if(message === "") {
		$('.message-field').addClass('error').attr('placeholder', 'Be a ninja, and type something in!');
	} else {
		saveMessage(message);
	}
}

function saveMessage (message) {
	var chatMessage = new ChatClass();
	chatMessage.set('message', message);
	chatMessage.save(null, {
		success: function(){
			addToContentField(chatMessage);
		},
		error: function(error){
			alert("A Parse error has occured..., " + error.description);
		}
	});
}
 
function addToContentField (message) {
	var li = $('<li>'+message.get('message')+'</li>');
	$('.message-list').append(li);
}

