## Optimization Algorithm Implementations

### Installation
To run the program, you need to have `bun` in your system. If you don't have it, you can follow the instructions [here](https://bun.sh/docs/installation).

Install the dependencies by running the following command:

```bash
bun install
```

### Testing
To test the program, you can use the following command, which will run the tests against the dataset in the `test/data` directory:

```bash
bun test
```

Now, there are two algorithms implemented in this project: `Nearest Neighbour` and `Cheapest Insertion`. You can run the tests for each algorithm by running the following commands:

```bash
bun test:nna
bun test:cia
```