import Ember from 'ember';
import Firebase from 'firebase';
import config from '../config/environment';

export function initialize(container, application) {
  application.register('auth:main', auth, {singleton: true});
  application.inject('controller', 'auth', 'auth:main');
  application.inject('route', 'auth', 'auth:main');
}

export default {
  name: 'Auth',
  initialize: initialize
};

var auth = Ember.Object.extend({
  ref: new Firebase(config.firebase),

  addFirebaseCallback: function() {
    var session = this;
    var ref = this.get('ref');

    ref.onAuth(function(authData) {
      if (authData) {
        session.set("isAuthenticated", true);
        session.set('user', authData.twitter.username);
      } else {
        session.set("isAuthenticated", false);
      }
    });
  }.on("init"),

  login: function() {
    var session = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      session.get('ref').authWithOAuthPopup('twitter', function(error, user) {
        if (user) {
          resolve(user);
        } else {
          reject(error);
        }
      });
    });
  },

  logout: function() {
    var session = this;
    var ref = this.get('ref');

    ref.unauth();
    session.set("isAuthenticated", false);
  },

  currentUser: function() {
    return this.get("ref").getAuth();
  }.property("isAuthenticated ")

});
