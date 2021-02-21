# sol2swagger2

Convert Solidity files and Interface ABI to Swagger specifications

- Fork of sol-swagger

## Install

```
npm i -g sol-swagger2
```

# Instructions

```
sol2swagger SomeFile.sol
```


```
sol2swagger SomeFile.sol >> out.json
```

This allows piping to another program or echoing to a file.

```
sol2swagger SomeFile.sol -s
```


### Generate your spec and working mock API

```
sol2swagger SomeFile.sol -s -g
```


## Help

```
-s, --server           Serves swagger inside Swagger UI webserver
-p, --port [PORT]      Specifies the port to serve Swagger UI
-f, --file [FILENAME]  Specify where to write the generated swagger file
-h, --help             This menu
-g, --generate         Run the API Generator tool
```
