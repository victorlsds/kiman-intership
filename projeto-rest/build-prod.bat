@echo off
SET DIR_KIMAN_AT=kiman-at
SET DIR_DIST=dist
SET DIR_WAR=war
SET DIR_BUILD_WAR=build-war

FOR /F %%G IN ('git describe --tags --long') DO SET BUILD_VERSION=%%G

@REM Removendo pastas
rd /S /Q %DIR_DIST%
rd /S /Q %DIR_BUILD_WAR%

@REM Criando pastas
mkdir %DIR_KIMAN_AT%
mkdir %DIR_BUILD_WAR%

@REM Compilando projeto
call npm run build --build=%BUILD_VERSION%

@REM Copiando arquivos para a pasta build
xcopy %DIR_DIST%\*.* %DIR_KIMAN_AT% /Y
xcopy %DIR_WAR%\*.* %DIR_KIMAN_AT% /Y

cd %DIR_KIMAN_AT%

zip -r ../%DIR_BUILD_WAR%/%DIR_KIMAN_AT%.war *

cd..

rd /S /Q %DIR_KIMAN_AT%

PAUSE
