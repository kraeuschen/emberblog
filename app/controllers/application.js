import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['posts/edit'],
  actions: {
    login: function() {
      var controller = this;
      controller.get("auth").login().then(function() {
        // Persist your users details.
        return controller.transitionToRoute('posts');
      }, function() {
        // User rejected authentication request
      });
    },
    logout: function() {
      var controller = this;
      controller.get('auth').logout();
      controller.set('controllers.posts/edit.isEditing', false);
      controller.transitionToRoute('posts');
    }
  }
});
