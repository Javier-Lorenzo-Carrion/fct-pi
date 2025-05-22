FROM gradle:8.4-jdk21-jammy as builder

COPY . /home/gradle/project

WORKDIR /home/gradle/project

RUN gradle bootJar -x test --no-daemon

FROM amazoncorretto:21-alpine3.19

COPY --from=builder /home/gradle/project/build/libs/fct-pi-1.0-SNAPSHOT.jar /opt/fct-pi.jar

WORKDIR /opt

ENTRYPOINT ["java", "-jar", "fct-pi.jar"]