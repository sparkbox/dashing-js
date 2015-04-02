var should = require('should'),
    History = require('../lib/history');

describe('History', function() {
  it('is a thing', function() {
    should.exist(History); 
  });

  it('provides access to last record by id', function() {
    var history = History.empty();

    history.record('buzzwords', {
      all_the_things: [ 1,2,3 ]
    });

    history.last_by_id('buzzwords')
      .should.eql( {
        all_the_things: [ 1,2,3]
      });
  });

  it('can iterate latest event data',function() {
    var history = History.empty();

    history.record('buzzwords', { a: 1 });
    history.record('builds', { time: 1.2 });

    var found = { };
    history.forEach( function(id, event) {
      found[id] = event;
    });

    found.should.eql( {
      'buzzwords': { a: 1},
      'builds': { time: 1.2 }
    });
  });

  it('persists recorded events', function() {
    var history = History.empty();
    var happened = false;

    history._historyStore = {
      persist: function(id, data) { happened = true; }
    }

    history.record('interesting', { data: true });
    happened.should.be.ok;
  });
});
