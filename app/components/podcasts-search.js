import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  filterText: '',
  selectedLabels: [],
  labelNames: Ember.computed('labels', function(){
    return this.get('labels').map(function(label){
      return label.get('name');
    });
  }),
  isSearching: Ember.computed('filterText', 'selectedLabels.[]', function() {
    return this.get('filterText') !== "" || this.get('selectedLabels').length !== 0;
  }),
  filteredResults: Ember.computed('filterText', 'selectedLabels.[]', function() {
    let filter = this.get('filterText');
    let labels = this.get('selectedLabels');
    return this.get('tracks').filter(function(item) {
      if(labels.length != 0){
        if(_.intersection(item.labels, labels).length == labels.length){
          return item.title.toLowerCase().indexOf(filter) !== -1;
        }else {
          return false;
        }
      }
      return item.title.toLowerCase().indexOf(filter) !== -1;
    });
  }),
  actions: {
    clearSearch() {
      this.set('filterText', '');
    },
    selectLabel(label) {
      this.get('selectedLabels').addObject(label);
    }
  }
});
