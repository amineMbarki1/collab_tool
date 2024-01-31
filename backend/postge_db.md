

## Spring data source
```yaml 
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/collabtool
    username: amine
    password: amine
  jpa:
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
logging:
  level:
    root: info
```


## Connect to db 
```$ psql -U your_username```

```$ psql -U your_username -h your_host -p your_port```

### show tables
```\dt```

### select db
```\c db_name```

###
sudo systemctl start docker

```
sudo systemctl start docker
sudo docker exece  /bin/bash
```
