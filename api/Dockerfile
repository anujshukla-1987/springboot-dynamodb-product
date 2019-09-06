FROM openjdk:8
VOLUME /tmp
ADD target/spring-boot-crud-jar-exec.jar api.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","api.jar"]