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
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
    implementation("org.liquibase:liquibase-core:4.23.2")
    runtimeOnly("org.postgresql:postgresql")

    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.assertj:assertj-core:3.11.1")
    testImplementation("org.mockito:mockito-core:3.+")

    implementation("org.apache.pdfbox:pdfbox:2.0.30")
    implementation("com.github.dhorions:boxable:1.7.0")
}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}