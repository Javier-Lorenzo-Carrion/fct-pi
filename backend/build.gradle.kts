plugins {
    java
    id("org.springframework.boot") version "3.1.3"
}
apply(plugin = "io.spring.dependency-management")

group = "com.lorenzoconsulting"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.liquibase:liquibase-core:4.23.2")
    runtimeOnly("org.postgresql:postgresql")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.assertj:assertj-core:3.11.1")
    testImplementation("org.mockito:mockito-core:3.+")

    implementation("org.apache.pdfbox:pdfbox:2.0.30")
    implementation("be.quodlibet.boxable:boxable:1.7.0")
}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}