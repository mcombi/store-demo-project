docker run -d --name=ordersdb -p 5432:5432 -e POSTGRES_USER=ordersuser -e POSTGRES_PASSWORD=orderspassword -e POSTGRES_DB=ordersdb  postgres:14