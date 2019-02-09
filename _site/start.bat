echo off
title CustomCraftEditor SERVER1
cls

cd /D %~dp0>nul
bundle exec jekyll serve
pause>nul