#!/bin/sh

# To enable it run, to disable delete the symlink
# $ ln -s post-commit-hook.sh .git/hooks/post-commit

while IFS= read -r -d $'\0' ARG; do
    if test "$ARG" == '--no-verify'; then
        exit 0
    fi
done < /proc/$PPID/cmdline

exec ./commit-time.sh
