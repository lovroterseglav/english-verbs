#!/bin/sh

while IFS= read -r -d $'\0' ARG; do
    if test "$ARG" == '--no-verify'; then
        exit 0
    fi
done < /proc/$PPID/cmdline

exec ./commit-time.sh
