
[![Latest version](https://deno.land/badge/denolandx/version)](https://deno.land/x/denolandx)

**denolandx** is a cli tool for finding more info on deno.land/x modules

## usage

to run:

```sh
deno run --allow-net 'https://deno.land/x/denolandx/cli.ts' <module name>
```

example:

```
deno run --allow-net=deno.land 'https://deno.land/x/denolandx/cli.ts' deno
-------------------
deno
        A modern runtime for JavaScript and TypeScript.
...
...
```

## install

Requires [deno](https://deno.land/manual/getting_started/installation)

```
deno install -n denolandx --allow-net https://deno.land/x/denolandx/cli.ts
```

## license

Copyright 2023 **denobytes**.\
See [LICENCE](LICENSE) file to get more infomation.

