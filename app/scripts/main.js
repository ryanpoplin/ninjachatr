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
	chatMessage.set('time', moment().format("MMM, Do h:mm A"))
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
	var timeStamp = message.get('time')
	var li = $('<li> <h3>' +message.get('message')+'</h3> '+ timeStamp +'</li>');
	li.addClass('text-bubble')
	$('.messageList').append(li);
}

 setInterval(function(){
      console.log("Time")
  		
  		chatCollection.fetch({
			success: function(collection) {
				$('.messageList').html('')
				collection.each(function(message){
				addToContentField(message);
				});
			}
		});
    },3000);
