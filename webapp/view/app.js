var app = angular.module('app',[]);

app.controller('ProductCRUDCtrl', ['$scope','ProductCRUDService', function ($scope,ProductCRUDService) {
	  
    $scope.updateProduct = function () {
        ProductCRUDService.updateProduct($scope.product)
          .then(function success(response){
              $scope.message = 'Product updated successfully!';
              $scope.errorMessage = '';
          },
          function error(response){
              $scope.errorMessage = 'Error updating Product!';
              $scope.message = '';
          });
    }
    
    $scope.getProduct = function (id) {
        ProductCRUDService.getProduct(id)
          .then(function success(response){
              $scope.product = response.data;             
              $scope.message='';
              $scope.errorMessage = '';
          },
          function error (response ){
              $scope.message = '';
              if (response.status === 404){
                  $scope.errorMessage = 'Product not found!';
              }
              else {
                  $scope.errorMessage = "Error getting product!";
              }
          });
    }
    
    $scope.addProduct = function (product) {
        if (product != null && product.productName && product.location && product.price) {
            ProductCRUDService.addProduct(product.productName, product.location, product.price, product.reserved)
              .then (function success(response){
                  $scope.message = 'New Product added!';
                  $scope.errorMessage = '';
              },
              function error(response){
                  $scope.errorMessage = 'Error adding product!';
                  $scope.message = '';
            });
        }
        else {
            $scope.errorMessage = 'Please enter product info!';
            $scope.message = '';
        }
    }
    
    $scope.deleteProduct = function (id) {
        ProductCRUDService.deleteProduct(id)
          .then (function success(response){
              $scope.message = 'Product deleted!';
              $scope.product = null;
              $scope.errorMessage='';
          },
          function error(response){
              $scope.errorMessage = 'Error deleting Product!';
              $scope.message='';
          })
    }
    
    $scope.reserveProduct = function (id) {
        ProductCRUDService.reserveProduct(id)
          .then (function success(response){
              $scope.message = 'Product reserved for 30 minutes!';
              $scope.product = response.data;
              $scope.errorMessage='';
          },
          function error(response){
              $scope.errorMessage = 'Error reserving product';
              $scope.message='';
          })
    }
    
    $scope.getAllProducts = function () {
        ProductCRUDService.getAllProducts()
          .then(function success(response){
              $scope.products = response.data;
              $scope.message='';
              $scope.errorMessage = '';
          },
          function error (response ){
              $scope.message='';
              $scope.errorMessage = 'Error retrieving Products!';
          });
    }

}]);

app.service('ProductCRUDService',['$http', function ($http) {	
	
	$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization"};
	$http.defaults.headers.common['Authorization'] = 'Basic YWRtaW46cGFzc3dvcmQ='
	
    this.getProduct = function getProduct(id){
        return $http({
          method: 'GET',
          headers: {
        	   'Content-Type': undefined
        	 },
          url: 'http://localhost:8080/api/products/'+ id
        });
	}
    
    this.reserveProduct = function getProduct(id){
        return $http({
          method: 'PUT',
          url: 'http://localhost:8080/api/products/reserve/'+ id
        });
	}
	
    this.addProduct = function addProduct(productName, location, price, reserved){
    	if(reserved === undefined) {
    		reserved = false;
    	}
        return $http({
          method: 'POST',
          url: 'http://localhost:8080/api/products/add',
          data: {productName:productName, location:location, price:price, reserved:reserved}
        });
    }
	
    this.deleteProduct = function deleteProduct(id){
        return $http({
          method: 'DELETE',
          url: 'http://localhost:8080/api/products/delete/'+id
        })
    }
	
    this.updateProduct = function updateProduct(product){
        return $http({
          method: 'PUT',
          url: 'http://localhost:8080/api/products/update/'+ product.id,
          data: {productName:product.productName, location:product.location, reserved:product.reserved, price:product.price}
        })
    }
	
    this.getAllProducts = function getAllProducts(){
        return $http({
          method: 'GET',
          url: 'http://localhost:8080/api/products'
        });
    }

}]);