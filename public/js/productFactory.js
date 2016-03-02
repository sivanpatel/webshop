webShop.factory('productFactory', ['$http', function($http) {
  
  return $http.get('products.json');

}]);
