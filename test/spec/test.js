/*global describe, it */
'use strict';
(function () {
    describe('NinjaChatr App', function () {

        it('should confirm jQuery is avaliable', function () {
        	expect(jQuery() !== undefined || null).to.equal(true);
        });

        it('should confirm ChatClass is avaliable', function(){
        	expect(ChatClass !== undefined || null).to.equal(true);
        });

        it('should confirm ChatCollectionClass is avaliable', function(){
        	expect(ChatCollectionClass !== undefined || null).to.equal(true);
        });

        it('should confirm chatCollection is avaliable', function(){
        	expect(chatCollection !== undefined || null).to.equal(true);
        });

        describe('NinjaChatr App Parse', function(){

            this.timeout(15000);
 
            it('should save a new message and that message should be returned from Parse', function(done){
            
            var result;
 
            var form = $('.message-field');
            var randomMessage = 'A Test Message #'+ Math.floor(Math.random()*10000000)
            form.val(randomMessage);
 
            $('.submit-btn').click()
    
                    setTimeout((function(){
    
                    var query = new Parse.Query(ChatClass);
                    query.equalTo("message", randomMessage);
                    query.find({
                        success: function(results) {
                            result = results[0];
                            expect(result.get('message')).to.equal(randomMessage);
                            done();
                        },
                        error: function(error) {
                            done(error.description)
                        }
                    });
                 
                }), 2000);
            }); 
                 
        });
    });

})();
