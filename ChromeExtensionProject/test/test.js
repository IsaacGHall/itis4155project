

//moved from /scripts to /test

var expect = require('chai').expect;

describe('#createUser()', function() {

  context('Testing if create user funtion gets usernames/passwords properly', function() {
    it('should expect first/last/password', function() {
    var firstName = 'Alex';
    var lastName = 'Smith';
    var password = 'Password';

    expect(firstName).to.equal('Alex');
    expect(lastName).to.equal('Smith');
    expect(password).to.equal('Password');
    })
    })
  })

