#!/bin/sh
COMMIT_EDITMSG=$1
TYPE=$2 # one of message, template, merge, squash, commit
REF=$3 # optional, when TYPE is commit

COMMIT_REGEX='^((implement|fix|enhance).+\((DOS\-[0-9]+(, DOS\-[0-9]+)*|\/)\)|update (DOS\-[0-9]+|\/):.+)$'
BRANCH_REF=$(git rev-parse --abbrev-ref HEAD)

case "$TYPE,$REF" in
  merge,)
    # Remove "Conflicts" lines from merges (from prepare-commit-msg.sample)
    /usr/bin/perl -i.bak -ne 's/^/# /, s/^# #/#/ if /^Conflicts/ .. /#/; print' "$1" ;;
  ,|message,|template,)
    if ! cat $COMMIT_EDITMSG | head -n1 | egrep "$COMMIT_REGEX"; then
      echo "branch is not matching pattern $COMMIT_REGEX, skipping prefix" >&2
      sleep 1
      exit 1
    fi
    ;;
  *) ;;
esac
