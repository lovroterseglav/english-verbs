#!/bin/sh
date > commit-time.txt
git add commit-time.txt
git commit --amend --no-edit -C HEAD --no-verify commit-time.txt