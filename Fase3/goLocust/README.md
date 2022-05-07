## Cli Commands

Estructura de los comandos: 

```bash
    TrafficGenerator: [COMMAND] [OPTION VALUE]
```

Commands:

```bash
sethost: set the host IP/domainname WITHOUT http/https NOR last 
```

```bash
showhost: prints the current host url (formatted)
```

```bash
rungame: starts the traffic generation to the server
```

```bash
--help: displays the command help
```

Options:
```bash
--gamesid 1,2...5   [specify the IDs of the games]
```

```bash
--players 1...Inf   [specify the max number of players per game]
```

```bash
--rungames 1...Inf   [specify the total of requests to be placed]
```

```bash
--concurrence 1...Inf   [specify the number simultaneous requests]
```

```bash
--timeout 1...Inf   [specify the max waiting time before terminating the task]
```

```bash
--help: displays the command help
```