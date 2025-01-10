# MNCD APP

![Analysis Session Page Example](./images/application.png)

Web application used for analysis of communities in multi layer networks,
written in dotnet core and react. Algorithms for community detection are used
from the [mncd](https://www.github.com/matejkubinec/mncd) library.

## Requirements

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node LTS](https://nodejs.org/en/download)

## Running

1. Install packages

```sh
make fe-dep
```

2. Run frontend

```sh
make fe-dev
```

3. Run backend (In another terminal)

```sh
make be-dev
```
