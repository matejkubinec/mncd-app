be-dev:
	dotnet watch run --project src/MNCD.Web

fe-dev:
	cd src/MNCD.Web/UI && npm run dev
