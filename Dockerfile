# Use Maven + JDK image to build
FROM maven:3.9.1-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom and source
COPY pom.xml .
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests

# Use a minimal JDK image to run the app
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built jar from the previous stage
COPY --from=build /app/target/hotel-reservation-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
