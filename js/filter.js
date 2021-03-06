'use strict';

window.filters = (function () {

  var containsAll = function (source, target) {
    var result = source.filter(function (item) {
      return target.indexOf(item) > -1;
    });
    return (result.length === target.length);
  };

  var filterHousingType = function (user, filters) {
    return (user.offer.type === filters.housingType || filters.housingType === 'any');
  };

  var filterRooms = function (user, filters) {
    return (user.offer.rooms === parseInt(filters.housingRoomNumber, 10) || filters.housingRoomNumber === 'any');
  };

  var filterGuests = function (user, filters) {
    return (user.offer.guests === parseInt(filters.housingGuestsNumber, 10) || filters.housingGuestsNumber === 'any');
  };

  var filterHousingPrice = function (user, filters) {
    var min = 0;
    var max = 0;
    if (filters.housingPrice === 'low') {
      min = 0;
      max = 10000;
    } else if (filters.housingPrice === 'middle') {
      min = 10000;
      max = 50000;
    } else if (filters.housingPrice === 'high') {
      min = 50000;
      max = Number.MAX_VALUE;
    }

    return ((user.offer.price <= max && user.offer.price >= min) || filters.housingPrice === 'any');
  };
  var filterFeatures = function (user, filters) {
    return (containsAll(user.offer.features, filters.features) || filters.features.length === 0);
  };

  var applyFilters = function (users, filters) {
    return users.filter(function (user) {
      return filterHousingType(user, filters) &&
      filterHousingType(user, filters) &&
      filterRooms(user, filters) &&
      filterGuests(user, filters) &&
      filterHousingPrice(user, filters) &&
      filterFeatures(user, filters);
    });
  };

  return {
    applyFilters: applyFilters
  };

})();
