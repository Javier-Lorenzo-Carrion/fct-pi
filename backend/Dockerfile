FROM amazoncorretto:21-alpine3.19

COPY build/libs/fct-pi-1.0-SNAPSHOT.jar /opt/fct-pi.jar

WORKDIR /opt

ENTRYPOINT ["java", "-jar", "fct-pi.jar"]