import type { Register } from 'claude-code'

// Runs in sh so $REX_BLOCK is read from the host env. Exit 3 = not in Rex.
// $1 cwd, $2 session id, $3 kind (fork|branch), $4 args (prompt or name).
const SCRIPT = `
[ -n "$REX_BLOCK" ] || exit 3
if [ -z "$4" ]; then
  exec rex run -s "$REX_BLOCK" -c "$1" --label "$3" -- claude --resume "$2" --fork-session
elif [ "$3" = fork ]; then
  exec rex run -s "$REX_BLOCK" -c "$1" --label "$3" -- claude --resume "$2" --fork-session "$4"
else
  exec rex run -s "$REX_BLOCK" -c "$1" --label "$3" -- claude --resume "$2" --fork-session --name "$4"
fi
`

export const register: Register = on => {
  for (const command of ['fork', 'branch'] as const) {
    on('command.run', { command }, async ($, e, next) => {
      const [id, cwd] = await Promise.all([$.session.id(), $.session.cwd()])
      const ran = await $.process.run(['sh', '-c', SCRIPT, 'sh', cwd, id, command, e.args.trim()])
      if (ran.exitCode === 3) return next(e) // not in Rex: built-in command
      if (ran.exitCode !== 0) {
        return { text: `rex-fork: rex failed (${ran.exitCode}): ${ran.stderr.trim()}` }
      }
      return { text: 'Forked to new Rex tab.' }
    }).catch(($, e, next) => next(e))
  }
}
