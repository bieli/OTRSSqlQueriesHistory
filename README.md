OTRSSqlQueriesHistory
=====

This is OTRS 3 package witch extends AdminSelectBox module for storing SQL queries history.
OTRS administrators can show and reusing SQL queries from queries history log.
Solution using webbrowser local storage mechanism on client side - no need additional table in OTRS database.


![ScreenShot](https://github.com/bieli/OTRSSqlQueriesHistory/raw/master/src/OTRSSqlQueriesHistory.png)


How to install package in OTRS 3 ?
----------------------------------

from console:
/opt/otrs/$ perl bin/otrs.PackageManager.pl -a install -p ./OTRSSqlQueriesHistory.opm

from admin panel:
http://OTRS-LOCATION/otrs/index.pl?Action=AdminPackageManager


TODO - Develpment Notes
-----------------------
 + usable prototype [OK]
 + add src directory do package with needed files [OK]
 * add config and version 0.0.1 for package [OK]
 * build package in first version [OK]
 * debug + console.log JS - faster init method for JS in AdminSelectBox [OK]
 * response in OTRS IdeaScale thread about history of SQL queries [OK]
 * add package to OPAR
 * promote package on OTRS forum
 * try contribute this future into OTRS 3.0 and OTRS 3.1 developers branches
 * collects results + fix bugs from live users

