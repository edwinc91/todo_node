var app = angular.module('TodoApp', []);

app.controller('CreateController', ['$http', '$scope', function($http, $scope){
  var controller = this;
  $http.get('items').success(function(data){
    controller.todos = data;
  });

  this.create = function(){
    $http.post('/items', {
      todo_value: this.value
    }).success(function(data){
      console.log(data);
      controller.todos = data;
    });
  };

  this.delete = function(id){
    $http.delete('/items/' + id).success(function(data){
      console.log(data);
      controller.todos = data;
    });
  };
}]);
