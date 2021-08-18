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

set x=18.32670440926469
set y=99.72352016840343

set z=%secs%
set /a num=%random% %%3
echo sta001,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta002,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta003,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta004,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta005,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta006,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta007,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta008,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta009,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
set /a num=%random% %%3
echo sta010,%year%-%month%-%day%,%hour%,%min%,%x%,%y%,%z%,%num% >> "new_output.txt"
