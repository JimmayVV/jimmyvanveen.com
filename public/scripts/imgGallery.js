var app = angular.module('imageGallery', []);

var imageController = function($scope, $http)
{
  $scope.images = {};
  
  // Now get the JSON 
  $http.get('/images/json')
  .then(
    function successCallback(data)
    {
      $scope.images = data.data.images;
      console.log(data.data.images);
    },
    function errorCallback(data)
    {
      console.log('Error: ' + data);
    }
  );
};

app.controller('imageCtrl', imageController);