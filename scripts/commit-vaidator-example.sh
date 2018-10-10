#!/bin/sh
COMMIT_EDITMSG=$1
TYPE=$2 # one of message, template, merge, squash, commit
REF=$3 # optional, when TYPE is commit

COMMIT_REGEX='^(implement|fix).+\(DOS\-[0-9]+\)$'
BRANCH_REF=$(git rev-parse --abbrev-ref HEAD)
cat "$COMMIT_EDITMSG"
case "$TYPE,$REF" in
  merge,)
    # Remove "Conflicts" lines from merges (from prepare-commit-msg.sample)
    /usr/bin/perl -i.bak -ne 's/^/# /, s/^# #/#/ if /^Conflicts/ .. /#/; print' "$1" ;;
  ,|message,|template,)
    if ! echo "$BRANCH_REF" | egrep "$COMMIT_REGEX"; then
      echo "branch is not matching pattern $COMMIT_REGEX, skipping prefix" >&2
      sleep 1
      exit 1
    fi
    # Prepend branch ref if not already having a reference
    if ! grep -iqE "\[$COMMIT_REGEX\]" "$COMMIT_EDITMSG"; then
      printf "[$BRANCH_REF] $(cat $COMMIT_EDITMSG)" > $COMMIT_EDITMSG
    fi
    ;;
  *) ;;
esac
