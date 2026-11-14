# rex-fork

Claude Code mod. `/fork` and `/branch` open the forked conversation in a new tab of the Rex terminal.

In a Rex terminal, the mod runs `rex run` with `claude --resume <session-id> --fork-session` in the same directory:

- `/fork` opens a new tab. `/fork <text>` sends the text as the first prompt.
- `/branch` opens a new tab. `/branch <name>` names the new session.
- Outside Rex (`REX_SESSION` not set), the built-in commands run as usual.
- If `rex` fails, the mod shows the error as the command output.

The mod replaces the built-in `/fork` (background agent) and `/branch` (same-terminal branch) in Rex.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install rex-fork --marketplace damianmarek/claude-rex-fork
```

From a shell:

```
claude plugin install rex-fork --marketplace damianmarek/claude-rex-fork
```

## Requirements

- Rex terminal with the `rex` CLI on the login-shell PATH.
- `claude` on the login-shell PATH.

## License

MIT
