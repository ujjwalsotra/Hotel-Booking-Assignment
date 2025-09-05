# Use official OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set environment variables
ENV JAVA_OPTS=""

# Copy the built jar into the container
ARG JAR_FILE=target/hotel-reservation-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app.jar"]
