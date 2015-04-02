var History = function() {
  var self = this,
      noop = function() {};

  self._historyStore = { 
        remember: function() {},
        persist: function() {}
      };

  self._event_data = {};

  self.record = function(id, body) {
    self._event_data[id] = body;

    self._historyStore.persist(self._event_data);
  };

  self.last_by_id = function(id) {
    return self._event_data[id];
  };

  self.forEach = function(func) {
    var history = self._event_data;
    for (var id in history) {
      func(id, history[id]);
    }
  };

  return self;
};

var exports = module.exports = {
  empty: function() { return new History(); },
  from: function(persistence) {
    var history = new History();

    history._historyStore = persistence;

    history._event_data = persistence.remember();

    return history;
  }
};
