Parse.initialize("YgfGDeGWOa7NNprcxhMJPHhZaKTYzxywReo8ayth", "8SVlwGI2DE9XYG1T7TQCKjrewGB7qF0X2qhsSBGb");

var ChatClass = Parse.Object.extend("Chat");

var ChatCollection = Parse.Collection.extend({
	model: ChatClass
});

var chatCollection = new ChatCollection();

$(function(){

	$('.submit-btn').click(function(){
		var chatmsg = new ChatClass;
		var messaging = $('.message-field').val();
		saveChat(chatmsg, messaging);
		addToChatCollection(chatmsg);
	});

});

function saveChat (message, messaging) {
	if (validation(messaging)) {
		message.set("text", messaging);
		message.save(null, {
			success: function() {	
				addToChat(message);
			},
			error: function() {
				console.log(error.description);
			}
		});
	}
};

function addToChat(message) {
	li = $('<li class="messageList">'+message.get('text')+'</li>');
	$('.content-field').append(li);
}

function validation(messaging) {
	if(messaging == '') {
		$('.message-field').css('background', 'red');
	} else {
		messaging; 
		return true;
	};
}

//message is carried over from saveChat as defined in .submit-btn function
function addToChatCollection(message) {
	chatCollection.add(message);
}

