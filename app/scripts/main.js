Parse.initialize("YgfGDeGWOa7NNprcxhMJPHhZaKTYzxywReo8ayth", "8SVlwGI2DE9XYG1T7TQCKjrewGB7qF0X2qhsSBGb");

var ChatClass = Parse.Object.extend("Chat");

var ChatCollection = Parse.Collection.extend({
	model: ChatClass
});

var chat = new ChatCollection();

$(function(){

	// function();

	$('.submit-btn').click(function(){
		var message = $('.message-field').val();
		// function();
	});

});

function addMessage () {
	// collection add...
}
