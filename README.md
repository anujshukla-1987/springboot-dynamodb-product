# springboot-dynamodb-product

### About Application
This is a basic crud operation web project with springboot and angularJs as frontend and DynamoDB as persistance NoSql database.

### Features
* Spring Boot Application
* Crud operations powered by Spring Data JPA
* Batch Process powered by Spring Batch
* Secured API using Spring Security
* Local DynamoDB integration
* Angular Frontend powered with NGINX

### Running Application via Docker compose

In the root of the project Run below command

```bash
docker-compose up --build
```


##### Local DynamoDB Setup

In default settings you will see application running on port 8081 and below url will land you to home page
[http://localhost:8081/products.html](http://localhost:8081/products.html)

### API Endpoints for Postman
http://localhost:8080/api/products (To Get all products) GET

http://localhost:8080/api/products/{id} (To Get a product) GET

http://localhost:8080/api/products/delete/{id} (To delete a product) DELETE

http://localhost:8080/api/products/add (To add a product) POST

http://localhost:8080/api/products/update/{id} (To update a product) PUT

http://localhost:8080/api/products/reserve/{id} (To reserve a product) PUT


All the GET calls are secured with user role so use  **username:user & password:password**

All the PUT, POST and DELETE calls are secured with admin role so use **username:admin & password:password**
