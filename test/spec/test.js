Parse.initialize("YgfGDeGWOa7NNprcxhMJPHhZaKTYzxywReo8ayth", "8SVlwGI2DE9XYG1T7TQCKjrewGB7qF0X2qhsSBGb");
/*global describe, it */
'use strict';
(function () {
    describe('NinjaChatr App', function () {
        it('should confirm that jQuery is avaliable', function () {
        	expect(jQuery() !== undefined).to.equal(true);
        });

        it('should store a user input into the variable message upon a submission', function(){
        	$('.message-field').val('This is a Message')
        	$('.submit-btn').click()
        	expect(message).to.equal('This is a Message')
        })
    });
})();
