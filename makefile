dev:
	dotnet watch run --project src/MNCD.Web

dep:
	dotnet restore ./src/MNCD.sln
	cd src/MNCD.Web/UI && npm i

docker-build:
	docker build -t mncd-app .

docker-run:
	docker run --rm -p 8080:8080 mncd-app
