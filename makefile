be-dev:
	dotnet watch run --project src/MNCD.Web

fe-dev: fe-dep
	cd src/MNCD.Web/UI && npm run dev

fe-dep:
	cd src/MNCD.Web/UI && npm i
