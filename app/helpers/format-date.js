import Ember from 'ember';

export function formatDate(date) {
  return moment(date.toString()).fromNow();
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);
