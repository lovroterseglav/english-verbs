#!/bin/sh
date > commit-time.txt
git add commit-time.txt
git commit --amend --no-edit --no-verify commit-time.txt