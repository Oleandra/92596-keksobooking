'use strict';

window.filters =(function () {
  
function containsAll(source,target)
{   
    var result = source.filter(function(item){ return target.indexOf(item) > -1});   
    return (result.length == target.length);  
}  
var filterHousingType = function (user, filters){
  if(user.offer.type == filters.housingType || filters.housingType == 'any') {
    return true;
  }
  return false;
};
 
var filterRooms  = function (user, filters){
  if(user.offer.rooms == filters.housingRoomNumber || filters.housingRoomNumber == 'any') {
      return true;
  }
  return false;
};

var filterGuests = function (user, filters){
 if(user.offer.guests == filters.housingGuestsNumber || filters.housingGuestsNumber == 'any') {
      return true;
  }
  return false;
};
  

var filterHousingPrice = function(user, filters){
 var min, max =0;
    if (filters.housingPrice == 'low')
    {
        min = 0;
        max = 10000;
    }else if (filters.housingPrice == 'middle'){
      min = 10000;
      max = 50000;
    }
    else if (filters.housingPrice == 'high'){
      min = 50000;
      max = Number.MAX_VALUE;
    }

    if((user.offer.price <= max && user.offer.price >= min) || filters.housingPrice == 'any') {
      return true;
    }
    return false;
};
var filterFeatures = function(user, filters){
  if(containsAll(user.offer.features, filters.features) || filters.features.length == 0) {
      return true;
  }
  return false
}


var applyFilters = function(users, filters){
  return users.filter(function(user){
      return filterHousingType(user, filters) 
      && filterHousingType(user, filters) 
      && filterRooms(user, filters)
      && filterGuests(user, filters)
      && filterHousingPrice(user, filters)
      && filterFeatures(user, filters)
    });
}

return {
applyFilters: applyFilters
}

})();
  