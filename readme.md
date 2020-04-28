# MNCD APP

![Analysis Session Page Example](./images/analysis-session.png)

Web application used for analysis of communities in multi layer networks,
written in dotnet core and react. Algorithms for community detection are used
from the [mncd](https://www.github.com/matejkubinec/mncd) library.

## Requirements

- Dotnet Core 3.1 SDK
- Node

## Running

1. Install npm packages

```
# Move to client app folder
cd src/MNCD.Web/ClientApp

# Install packages
npm install
```

2. Run the dotnet core app
```
# Move to web directory
cd src/MNCD.Web

# Run the app
dotnet run
```