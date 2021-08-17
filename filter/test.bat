@echo off


set hour=%time:~0,2%
if "%hour:~0,1%" == " " set hour=0%hour:~1,1%
echo hour=%hour%
set min=%time:~3,2%
if "%min:~0,1%" == " " set min=0%min:~1,1%
echo min=%min%
set secs=%time:~6,2%

if "%secs:~0,1%" == " " set secs=0%secs:~1,1%
echo secs=%secs%

set day=%date:~0,2%
set day=%date:~7,2%
set month=%date:~4,2%
set year=%date:~-4%

echo day=%day%
echo month=%month%
echo year=%year%

pause