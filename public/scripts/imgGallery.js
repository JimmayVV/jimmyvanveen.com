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


// Function to copy the contents of the image URL displayed in a text input
function copy(node)
{
  // Get the input element containing the URL
  var input = node.previousElementSibling;
  // Select the string
  input.select();
  // Try to copy it
  try
  {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  }
  catch (err)
  {
    console.log('Oops, unable to copy');
  }
}