@echo off
GOTO :MAIN
REM seamonkey420's wiki template generator script
REM creates text files of wiki source for systems or bases
REM Initial build: 7/18/17
REM Version 8.0, 8/17/2018
REM Star, Planet, Base and Ship templates
REM Modified based on fandom mods sugggestions. 
REM Mobile tables implemented for star system, planet table
REM also updated flora and fauna tables for mobiles. 
REM Format updates per fandom admins. 
REM Updated for NEXT version w/updated system and planet templates
REM -----------------------------------------------------

:REGION_Riwala
	SET HUB=EHUB
	SET Num=[[region]] (HUB1)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Omskio Instability
	SET HUB=EHUB
	SET Num=[[region]] (HUB2)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Marcki
	SET HUB=EHUB
	SET Num=[[region]] (HUB3)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Anolamga Spur
	SET HUB=EHUB
	SET Num=[[region]] (HUB4)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Sea of Zonyayp
	SET HUB=EHUB
	SET Num=[[region]] (HUB5)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Rayuyar Band
	SET HUB=EHUB
	SET Num=[[region]] (HUB6)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Umaton Instability
	SET HUB=EHUB
	SET Num=[[region]] (HUB7)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Exramb Adjunct
	SET HUB=EHUB
	SET Num=[[region]] (HUB8)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Ologowe Fringe
	SET HUB=EHUB
	SET Num=[[region]] (HUB9)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Yatrifex
	SET HUB=EHUB
	SET Num=[[region]] (HUB10)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Yeiada Sector
	SET HUB=EHUB
	SET Num=[[region]] (HUB11)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
		
:REGION_Iptrevs Fringe
	SET HUB=EHUB
	SET Num=[[region]] (HUB12)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Yamiraith Sector
	SET HUB=EHUB
	SET Num=[[region]] (HUB13)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Wedragi Spur
	SET HUB=EHUB
	SET Num=[[region]] (HUB14)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Rezhensk
	SET HUB=EHUB
	SET Num=[[region]] (HUB15)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Sobert Cloud
	SET HUB=EHUB
	SET Num=[[region]] (HUB16)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Umtats Anomaly
	SET HUB=EHUB
	SET Num=[[region]] (HUB17)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Tavill
	SET HUB=EHUB
	SET Num=[[region]] (HUB18)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Qangew Expanse
	SET HUB=EHUB
	SET Num=[[region]] (HUB19)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Nijhwal Boundary
	SET HUB=EHUB
	SET Num=[[region]] (HUB20)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Usband Cluster
	SET HUB=EHUB
	SET Num=[[region]] (HUB21)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE

:REGION_Ejongaa Anomaly
	SET HUB=EHUB
	SET Num=[[region]] (HUB22)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Zahrel Expanse
	SET HUB=EHUB
	SET Num=[[region]] (HUB23)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_The Arm of Fupand
	SET HUB=EHUB
	SET Num=[[region]] (HUB24)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Cuculta
	SET HUB=EHUB
	SET Num=[[region]] (HUB25)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Etmarao
	SET HUB=EHUB
	SET Num=[[region]] (HUB26)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:REGION_Otreie Void
	SET HUB=EHUB
	SET Num=[[region]] (HUB27)
	SET wikiTypeGalaxy=Eissentam
	GOTO END_CASE
	
:DEFAULT_CASE
	SET HUB=GHub
	SET Num=Huburb
	SET wikiTypeGalaxy=Euclid
	GOTO END_CASE
:END_CASE
  VER > NUL # reset ERRORLEVEL
  if %wikiType% == 1 GOTO STARSYSTEMcont # return from CALL
  if %wikiType% == 2 GOTO PLANETcont # return from CALL
  if %wikiType% == 3 GOTO BASEcont # return from CALL
  if %wikiType% == 4 GOTO SHIPcont # return from CALL
  if %wikiType% == 5 GOTO TOOLcont # return from CALL
  if %wikiType% == 6 GOTO FAUNAcont # return from CALL

:MAIN
ECHO _________________________________________
ECHO Seamonkey420's NMS Wiki Entry Generator
ECHO  -NOW USING MOBILE FRIENDLY TABLES!!-
ECHO.                                         
ECHO Choose Wiki Page to Create
ECHO.                                         
ECHO 1 Star System
ECHO 2 Planet
ECHO 3 Base
ECHO 4 Starship
ECHO 5 Multi-tool
ECHO 6 Creature
ECHO.
ECHO 9 Exit Menu
ECHO _________________________________________
ECHO.
SET /P wikiType=Enter Wiki Page Type: 

REM Still working on other templates!!
if %wikiType% == 1 GOTO STARSYSTEM
if %wikiType% == 2 GOTO PLANET
if %wikiType% == 3 GOTO BASE
if %wikiType% == 4 GOTO SHIP
if %wikiType% == 5 GOTO TOOL
if %wikiType% == 6 GOTO FAUNA
if %wikiType% == 9 GOTO EXITMENU
CLS


:STARSYSTEM
ECHO.
ECHO This script will ask you several questions about your system
ECHO and then create sourcetext for a wiki page over at:
ECHO https://nomanssky.fandom.com/
ECHO.
ECHO NOTE: Photos will need to be uploaded at wiki and linked in source. 
ECHO.
pause
setlocal ENABLEDELAYEDEXPANSION
cls
ECHO -----------------------------------------------------------
ECHO.
ECHO --STAR SYSTEM TEMPLATE SCRIPT--
SET /P "wikiTypeGalaxy=Enter Galaxy (Euclid, Hilbert, Calypso, Budullangr, Eissentam): "
SET /P "wikiTypeSystemName=Enter System Name (excluding brackets; HUB1-D993 Somesystem Name): "
SET /P "wikiTypeOriginalSystem=Enter Original System Name (if known): "
SET /P "wikiTypeRegion=Enter Galactic Region: "
SET /P "wikiTypeSystemColor=Enter System Star Color(Yellow, Red, Blue, Green)): "
SET /P wikiTypeDistancetoCenter=Enter Distance to Center: 
SET /P "wikiTypePlanets=Enter # of Planets (0 for none): "
SET /P "wikiTypeMoons=Enter # of Moons (0 for none): "
SET /P wikiTypeFaction=Enter Faction (ie Gek, Korvax, Vy'keen): 
SET /P "wikiTypeDiscoveredlink=Enter Discover name/id: "
SET /P "wikiTypeDiscovered=Enter Discover name/id: "
SET /P "wikiGameMode=Game Mode Played (normal creative survival permadeath): "

2>NUL CALL :REGION_%wikiTypeRegion%
IF ERRORLEVEL 1 CALL :DEFAULT_CASE

:STARSYSTEMcont
REM Checking system name code for bad characters
ECHO .!wikiTypeSystemName!.
ECHO strip quotes: .!wikiTypeSystemName:"=!.


REM Source Template for Systems
ECHO {{Version^|Frontiers}}> %wikiTypeSystemName%.txt
ECHO {{GHub Eissentam}}>> %wikiTypeSystemName%.txt
ECHO {{System infobox>>%wikiTypeSystemName%.txt
ECHO ^| name = %wikiTypeSystemName%>> %wikiTypeSystemName%.txt
ECHO ^| image = insert galactic map photo here>> %wikiTypeSystemName%.txt
ECHO ^| region = %wikiTypeRegion%>> %wikiTypeSystemName%.txt
ECHO ^| galaxy = %wikiTypeGalaxy% >> %wikiTypeSystemName%.txt
ECHO ^| color = %wikiTypeSystemColor%>> %wikiTypeSystemName%.txt
ECHO ^| class = %wikiTypeSystemClass%>> %wikiTypeSystemName%.txt
ECHO ^| distance = %wikiTypeDistancetoCenter%>> %wikiTypeSystemName%.txt
ECHO ^| planet = %wikiTypePlanets% >> %wikiTypeSystemName%.txt
ECHO ^| moon = %wikiTypeMoons% >> %wikiTypeSystemName%.txt
ECHO ^| faction = %wikiTypeFaction%>> %wikiTypeSystemName%.txt
ECHO ^| mode = %wikiGameMode%>> %wikiTypeSystemName%.txt
ECHO ^| discoveredlink = %wikiTypeDiscoveredlink%>> %wikiTypeSystemName%.txt
ECHO ^| discovered = %wikiTypeDiscovered%>> %wikiTypeSystemName%.txt
ECHO ^| release = Frontiers>> %wikiTypeSystemName%.txt
ECHO }}>> %wikiTypeSystemName%.txt
ECHO.>> %wikiTypeSystemName%.txt

ECHO '''!wikiTypeSystemName!''' is a star system.>> %wikiTypeSystemName%.txt
ECHO {{Toc limit^|3}}>> %wikiTypeSystemName%.txt
ECHO ==Summary== >> %wikiTypeSystemName%.txt
ECHO '''!wikiTypeSystemName!''' is a [[star system]] in the [[%wikiTypeRegion%]].>> %wikiTypeSystemName%.txt
ECHO.>> %wikiTypeSystemName%.txt

ECHO ==Alias names== >> %wikiTypeSystemName%.txt
ECHO {{aliasc^|text=Original^|name=%wikiTypeOriginalSystem%}}>> %wikiTypeSystemName%.txt
ECHO {{aliasc^|text=Current^|name=!wikiTypeSystemName!}}>> %wikiTypeSystemName%.txt
ECHO.>> %wikiTypeSystemName%.txt

* Discovered and uploaded by PC/PS4/Xbox explorer ''DiscovererName'' on Month Date, Year
* Explored and documented by (if GHGS put: [[Galactic Hub Geological Surveyors|GHGS]] Researcher {{profile|WikiName}} on Month Date, 2021
ECHO ==Discovered== >> %wikiTypeSystemName%.txt
ECHO * Discovered and uploaded by PC/PS4/Xbox explorer ''if %wikiTypeDiscoveredlink%==NULL (%wikiTypeDiscovered%) else (%wikiTypeDiscoveredlink%)'' on Month Date, Year
ECHO (Month, Day, Year, (optionally) Time) by %wikiTypeDiscoveredBy% on %wikiTypePlayedOn%>> %wikiTypeSystemName%.txt
ECHO.>> %wikiTypeSystemName%.txt

ECHO ==Planets ^& Moons== >> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO {^| class="wikitable" width="90%%">> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^!width=125 style="background-color:#384640;"^|>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^!width=150 style="background-color:#384640;"^|Planet Name>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^!width=150 style="background-color:#384640;"^|Type>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^!style="background-color:#384640;"^|Extreme^<br^> Weather>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^!style="background-color:#384640;"^|Aggressive^<br^> Sentinels>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|colspan=5 style="background-color:white;"^|>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

REM Creates rows for total number of planets and moons. Quick math before creating
set /a wikiTypeTotalBodies=%wikiTypePlanets% + %wikiTypeMoons%
for /l %%x in (1, 1, %wikiTypeTotalBodies%) do (
ECHO ^|width=125 style="background-color:#384640;"^|[[INSERT PLANET MOON IMAGE^|125px]]>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^| [[PLANET NAME]]>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^|PLANET TYPE>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|style="background-color:#384640; text-align:center"^|YES NO>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|style="background-color:#384640; text-align:center"^|YES NO>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|width=125 style="background-color:#384640; text-align:center"^|INSERT RESOURCES>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|width=150 style="background-color:#384640;"^|'''100%% Zoology Bonus:''' ZoologyBonusAmount {{Nanites}}>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|colspan=3 style="background-color:#384640; text-align:left"^|INSERT NOTES>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|colspan=5 style="background-color:white;"^| >> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedStarSystem.txt
)
ECHO ^|}>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ==Starships==>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO INSERT SHIP GALLERY HERE>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ==Location Information==>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ===Coordinates===>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^<sub^>''NOTE:'' Coordinates correspond to the location of entire regions, not specific systems. In other words, for all the coordinates in the Galactic Hub, there are only 11 effective outputs. Therefore, coordinates are useful for Portal travel, but not particularly useful on Pilgrim Star Path when inside the Hub.^</sub^> >> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO {{coords^|0000^|0000^|0000^|0000^|}}>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ===Portal Glyphs===>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO {{Gl^|hexadecimal glyph for portal}} >> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ===Navigation Images===>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ===Locating !wikiTypeSystemName!===>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ==Space station==>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ===Multitool Technology Merchant===>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO {^| class="wikitable">> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^! style="background-color:#384640^;"^|Modules for Sale  ^^!^^! style="background-color:#384640^;"^|Price ([[Nanite Clusters]])>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedStarSystem.txt
REM -----Shortcut to making 14 row tables!! go FOR commands!
for /L %%i in (1,1,14) do (
ECHO ^| style="background-color:#384640^;"^| [[MODULENAME]] ^(MODULECLASS^)^|^| style="background-color:#1A211E^; text-align:center"^|PRICE>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedStarSystem.txt
)
ECHO ^|}>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ===Starship Technology Merchant===>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO {^| class="wikitable">> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^! style="background-color:#384640^;"^|Modules for Sale  ^^!^^! style="background-color:#384640^;"^|Price ([[Nanite Clusters]])>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedStarSystem.txt
REM -----Shortcut to making 18 row tables!! go FOR commands!
for /l %%i in (1, 1, 18) do (
ECHO ^| style="background-color:#384640^;"^| [[MODULENAME]] ^(MODULECLASS^)^|^| style="background-color:#1A211E^; text-align:center"^|PRICE>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedStarSystem.txt
)
ECHO ^|}>> %userprofile%\Desktop\GeneratedStarSystem.txt


ECHO ===Exosuit Technology Merchant===>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO {^| class="wikitable">> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^^! style="background-color:#384640^;"^|Modules for Sale  ^^!^^! style="background-color:#384640^;"^|Price ([[Nanite Clusters]])>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedStarSystem.txt

REM Shortcut to making 16 row tables!! go FOR commands!
for /l %%i in (1, 1, 16) do (
ECHO ^| style="background-color:#384640^;"^| [[MODULENAME]] ^(MODULECLASS^)^|^| style="background-color:#1A211E^; text-align:center"^|PRICE>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedStarSystem.txt
)
ECHO ^|}>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ==Galactic Trade Terminals (Noteworthy Items)==>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ==Additional Info==>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ==Gallery==>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt


ECHO ==External Links==>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO {{Hub External Links}}>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO.>> %userprofile%\Desktop\GeneratedStarSystem.txt

ECHO ==Categories== >> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO [[Category:!wikiTypeSystemName!]]>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO [[Category:%wikiTypeRegion%]]>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO [[Category:Galactic Hub Project]]>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO [[Category:Star systems]]>> %userprofile%\Desktop\GeneratedStarSystem.txt
ECHO [[Category:NEXT]]>> %userprofile%\Desktop\GeneratedStarSystem.txt
endlocal

start "" notepad.exe "%userprofile%\Desktop\GeneratedStarSystem.txt"
CLS
GOTO MAIN


:PLANET
ECHO This script will ask you several questions about a planet
ECHO and then create sourcetext for a wiki page over at:
ECHO https://nomanssky.fandom.com
ECHO.
ECHO NOTE: Photos will need to be uploaded at wiki and linked in source. 
ECHO.
pause
setlocal ENABLEDELAYEDEXPANSION
cls
ECHO -----------------------------------------------------------
ECHO.
ECHO --PLANET TEMPLATE SCRIPT--

SET /P "wikiTypePlanetGalaxy=Enter Galaxy (Euclid, Hilbert, Calypso, Budullangr, Eissentam): "
SET /P "wikiTypePlanetName=Enter Planet Name: "
SET /P "wikiTypePlanetDesc=Enter Brief Planet Description: (or leave blank): "
SET /P "wikiTypeSystemName=Enter Star System Name (excluding brackets, ie HUB4-52 Something): "
SET /P "wikiTypeRegion=Enter Galactic Region: "
SET /P "wikiTypeWeather=Weather Type(from options/start screen - discoveries): "
SET /P "wikiTypeSentinels=Sentinel Level(from options/start screen > discoveries): "
SET /P "wikiTypeFlora=Flora Type(from options/start screen > discoveries): "
SET /P "wikiTypeFauna=Fauna Type(from options/start screen > discoveries): "
SET /P "wikiTypeFaunaNumber=Number of fauna to create table of (ie 0 1 4): "
SET /P "wikiTypeFloraNumber=Number of flora to create table of (ie 0 1 4): "
SET /P "wikiTypeZoology=All Species Discovered (Y if true N if not): "
SET /P "wikiTypeMaxTemp=Max Temps on Planet: "
SET /P "wikiTypeMinTemp=Min Temps on Planet: "
SET /P "wikiTypeStorm=Storm Temps on Planet: "
SET /P "wikiTypeRad=Radioactivity (Rad): "
SET /P "wikiTypeTox=Toxicity (Tox): "
SET /P "wikiTypeDiscoveredBy=Enter discoverer name/id: "
SET /P "wikiTypeMode=Game Mode (normal survival permadeath creative)?: "
SET /P "wikiTypePlayedOn=Enter PC PS4 XBox: "

2>NUL CALL :REGION_%wikiTypeRegion%
IF ERRORLEVEL 1 CALL :DEFAULT_CASE

:PLANETcont
REM Checking planet  and system name code for bad characters
ECHO .!wikiTypePlanetName!.
ECHO strip quotes: .!wikiTypePlanetName:"=!.
ECHO .!wikiTypeSystemName!.
ECHO strip quotes: .!wikiTypeSystemName:"=!.

ECHO {{Version^|NEXT}}> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO {{Banner GHP}}>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO {{Planet infobox>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| name = !wikiTypePlanetName!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| image = INSERT PLANET IMAGE HER>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| system = !wikiTypeSystemName!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| region = !wikiTypeRegion!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| galaxy = !wikiTypePlanetGalaxy!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| type = !wikiTypePlanetDesc!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| atmosphere = (ie Hazy or Clear, etc)>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| terrain = (ie Rocky or Waterworld, etc)>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| weather = !wikiTypeWeather!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| resources = INSERT RESOURCES eg [[Iridiium^|Ir]][[Cymatygen^|Cy]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| sentinel = !wikiTypeSentinels!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| flora = !wikiTypeFlora!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| fauna = !wikiTypeFauna!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| discovered = !wikiTypeDiscoveredBy!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| mode = !wikiTypeMode!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| platform = !wikiTypePlayedOn!>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| release = NEXT>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO }} >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO. >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO '''!wikiTypePlanetName!''' is a [[planet]] in the [[!wikiTypeSystemName!]] system>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ==Summary==>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO. >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO INSERT PLANET SUMMARY HERE. INFO ABOUT, NAME INSPIRATION, LANDMARKS/PORTALS, ETC >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO. >> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ==Resources==>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * "Form" refers to, for example: crystal form, resource deposit form, Pedestal Form ^(Vortex Cube^), "Stem" Form ^(Gravitino Balls^), etc* "Form" refers to, for example: crystal form, resource deposit form, Pedestal Form ^(Vortex Cube^), “Stem” Form ^(Gravitino Balls^), etc>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * "Rarity" refers to how often the resource appears on the planet, and is just an estimate ^(there's no in-game value to measure it by^).>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * "Standard resources like [[Carbon]], [[Condensed Carbon]], [[Sodium]], etc. may be included or omitted at the editor's discretion.>> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO {^| class="wikitable">> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^! style="background-color:#1A211E;"^|Image ^^!^^! style="background-color:#384640;"^|Resource ^^!^^! style="background-color:#384640;"^|Form ^^!^^! style="background-color:#384640;"^|Rarity>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| style="background-color:#384640;"^| [[File:IMAGEFILE^|125px]] ^|^| style="background-color:#1A211E; text-align:center"^|RESOURCE ^|^| style="background-color:#1A211E; text-align:center"^|FORM ^|^| style="background-color:#1A211E; text-align:center"^|RARITY>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|}>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO.>> %userprofile%\Desktop\GeneratedPlanet.txt


ECHO ==Life== >> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ===Fauna=== >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO {^| class="wikitable" width="90%%" >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!width=125 style="background-color:#384640;"^| >> %userprofile%\Desktop\GeneratedPlanet.txt 
ECHO ^^!width=150 style="background-color:#384640;"^|Name >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!width=150 style="background-color:#384640;"^|Temperament >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Height >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Weight >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|colspan=5 style="background-color:white;"^| >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt

REM Creates rows for total number of fauna input
for /l %%x in (1, 1, %wikiTypeFaunaNumber%) do (
ECHO ^|width=125 style="background-color:#384640;"^|[[FAUNA IMAGE^|125px]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^|SPECIESNAME>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^|TEMPERAMENT>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|HEIGHT>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|WEIGHT>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|colspan=2 style="background-color:#384640; text-align:center"^|Discover>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|colspan=1 style="background-color:#384640; text-align:center"^|'''Genus''': [[GENUS]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|colspan=3 style="background-color:#384640; text-align:center"^|'''NOTES''' : NOTES>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt
)
ECHO ^|}>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO.>> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ====Zoology Scan Completion==== >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO '''%wikiTypePlayedOn%''': %wikiTypeZoology% >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO.>> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ==Flora==>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO {^| class="wikitable" width="90%%">> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!width=125 style="background-color:#384640;"^|>> %userprofile%\Desktop\GeneratedPlanet.txt 
ECHO ^^!style="background-color:#384640;"^|Name>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Age>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Root Structure>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Nutrient Source>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Notes^<br^>& Resources >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Discovered By>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|colspan=5 style="background-color:white;"^|>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|->> %userprofile%\Desktop\GeneratedPlanet.txt

REM Creates rows for total number flora 
for /l %%x in (1, 1, %wikiTypeFloraNumber%) do (
ECHO ^|width=125 style="background-color:#384640;"^|[[FLORA IMAGE^|125px]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|SpeciesName>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|SpeciesAge>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|RootStructure>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|NutrientSource>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|NotesAndElements>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|Discoverer>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt
)
ECHO ^|}>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO.>> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ==Atmosphere ^& Climate== >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * Maximum Temperature:%wikiTypeMaxTemp% >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * Minimum Temperature: %wikiTypeMinTemp% >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * Storm Temperature: %wikiTypeStorm% >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * Radioactivity (Rads): %wikiTypeRad%  >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO * Toxicity (Tox): %wikiTypeTox% >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO. >> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ==Notable Locations ^& Waypoints== >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO {^| class="wikitable" width="90%%">> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^^!style="background-color:#1A211E;"^|Image ^^!^^! style="background-color:#384640;"^|Name  ^^!^^! style="background-color:#384640;"^|Description ^^!^^! style="background-color:#384640;"^|Latitude/Longitude >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^| style="background-color:#384640;"^| [[File:IMAGEFILE^|125px]] ^|^| style="background-color:#1A211E; text-align:center"^|NAME ^|^| style="background-color:#1A211E; text-align:center"^|DESCRIPTION ^|^| style="background-color:#1A211E; text-align:center"^|LATITUDE / LONGITUDE(fromVisor)>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|- >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO ^|}>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO.>> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ==Gallery== >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO INSERT PLANET PHOTO GALLERY HERE >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO. >> %userprofile%\Desktop\GeneratedPlanet.txt

ECHO ==Categories== >> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO [[Category:Planets]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO [[Category:!wikiTypeSystemName!]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO [[Category:!wikiTypeRegion!]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO [[Category:Galactic Hub Project]]>> %userprofile%\Desktop\GeneratedPlanet.txt
ECHO [[Category:NEXT]]>> %userprofile%\Desktop\GeneratedPlanet.txt

endlocal

start "" notepad.exe "%userprofile%\Desktop\GeneratedPlanet.txt"
CLS
GOTO MAIN



:BASE
ECHO.
ECHO This script will ask you several questions about your base
ECHO and then create sourcetext for a wiki page over at:
ECHO https://nomanssky.fandom.com
ECHO.
ECHO NOTE: Photos will need to be uploaded at wiki and linked in source. 
ECHO.
pause
setlocal ENABLEDELAYEDEXPANSION
cls
ECHO -----------------------------------------------------------
ECHO.
ECHO --BASE TEMPLATE SCRIPT--

SET /P "wikiTypeBaseName=Enter Base Name: "
SET /P "wikiTypeBasePlanet=Enter Planet Name Where Base Located: "
SET /P "wikiTypeSystemName=Enter System Name: "
SET /P "wikiTypeBaseRegion=Enter Galactic Region: "
SET /P wikiTypeResources=Enter # of Resources to create table of (rows): 
SET /P wikiTypeFarm=Farm at Base (YES/NO)?: 
SET /P "wikiTypeNipNip=NipNip Available? (YES/NO): "
SET /P wikiTypeRaceTrack=Racetrack (YES/NO)?: 
SET /P wikiTypeTerminal=Terminal (YES/NO)?: 
SET /P wikiTypeLandingPadNum=Number of Landing pads (ie, 0 1 2 3 4)?: 
SET /P wikiTypeGeoBay=Geobay Type (Colossus Roamer Nomad or none): 
SET /P "wikiTypeBuilder=Enter builder name/id: "
SET /P wikiTypeMode=Game Mode (normal survival permadeath creative)?: 
SET /P wikiTypePlayedOn=Enter PC PS4 XBox: 

2>NUL CALL :REGION_%wikiTypeRegion%
IF ERRORLEVEL 1 CALL :DEFAULT_CASE

:BASEcont
REM Checking system name code for bad characters
REM Replacing text to meet wiki standards for landing pads
ECHO .!wikiTypeBaseName!.
ECHO strip quotes: .!wikiTypeBaseName:"=!.
ECHO .!wikiTypeSystemName!.
ECHO strip quotes: .!wikiTypeSystemName:"=!.

if "%wikiTypeLandingPadNum%" == "0" (
set wikiTypeLanding=NO
goto MOVEON
)
if "%wikiTypeLandingPadNum%" == "1" (
set wikiTypeLanding=YES
goto MOVEON
)

if "%wikiTypeLandingPadNum%" GEQ "2" (
set /a wikiTypeLanding=%wikiTypeLandingPadNum%
goto MOVEON
)


:MOVEON
ECHO {{Version^|NEXT}}> %userprofile%\Desktop\GeneratedBase.txt
ECHO {{GHub}}>> %userprofile%\Desktop\GeneratedBase.txt
ECHO {{Base infobox> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| image = INSERT BASE THUMBNAIL HERE>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| galaxy = Euclid>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| region = !wikiTypeBaseRegion!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| system = !wikiTypeSystemName!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| planet = !wikiTypeBasePlanet!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| builder = !wikiTypeBuilder!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| platform = !wikiTypePlayedOn!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| mode = !wikiTypeMode!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| farm = !wikiTypeFarm!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| geobay = !wikiTypeGeoBay!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| landingpad = %wikiTypeLanding%>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| nipnip = !wikiTypeNipNip!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| racetrack = !wikiTypeRaceTrack!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| terminal = !wikiTypeTerminal!>> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^| release= NEXT>> %userprofile%\Desktop\GeneratedBase.txt
ECHO }} >> %userprofile%\Desktop\GeneratedBase.txt
ECHO. >> %userprofile%\Desktop\GeneratedBase.txt

ECHO ==Summary ^& Map== >> %userprofile%\Desktop\GeneratedBase.txt
ECHO !wikiTypeBaseName! is a [[Player base]] located on [[!wikiTypeBasePlanet!]] in the [[!wikiTypeSystemName!]] system, DESCRIBE BASE LOCATION FROM SPACE STATION  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO ADD FURTHER BASE INFO  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO.  >> %userprofile%\Desktop\GeneratedBase.txt

ECHO ===Base Map===  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO [[INSERT BASE MAP IMAGE HERE]]  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO INSERT LEGEND OR KEY TO MAP-if one is created  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO.  >> %userprofile%\Desktop\GeneratedBase.txt

ECHO ==Farmable Resources==  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO INSERT FARMABLE RESOURCES SUMMARY OR TEXT  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO.  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO {^| class="wikitable"  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^^! RESOURCE ^^!^^! QUANTITY ^^!^^! LOCATION  >> %userprofile%\Desktop\GeneratedBase.txt
REM Creates rows for total number of planets and moons
for /l %%x in (1, 1, %wikiTypeResources%) do (
ECHO ^|-   >> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^|RESOURCE NAME ^|^|scope="col" style="text-align:center"^|'''QUANTITY''' ^|^|LOCATION ON MAP ('''1'''^)  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO ^|-  >> %userprofile%\Desktop\GeneratedBase.txt
)
ECHO ^|}  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO.  >> %userprofile%\Desktop\GeneratedBase.txt

ECHO ==Racetrack==  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO Description if there is one otherwise: None  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO.  >> %userprofile%\Desktop\GeneratedBase.txt

ECHO ==Lore==  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO INSERT CREATED BASE LORE  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO.  >> %userprofile%\Desktop\GeneratedBase.txt

ECHO ==Gallery==  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO INSERT BASE PHOTO GALLERY HERE  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO.  >> %userprofile%\Desktop\GeneratedBase.txt

ECHO ==Categories==  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO. >> %userprofile%\Desktop\GeneratedBase.txt
ECHO [[Category:Base]]  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO [[Category:!wikiTypeBaseRegion!]]  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO [[Category:!wikiTypeBaseName!]]  >> %userprofile%\Desktop\GeneratedBase.txt
ECHO [[Category:!wikiTypeSystemName!]]  >> %userprofile%\Desktop\GeneratedBase.txt

endlocal
start "" notepad.exe "%userprofile%\Desktop\GeneratedBase.txt"
CLS
GOTO MAIN

:SHIP
ECHO.
ECHO This script will ask you several questions about your star ship
ECHO and then create sourcetext for a wiki page over at:
ECHO https://nomanssky.fandom.com
ECHO.
ECHO NOTE: Photos will need to be uploaded at wiki and linked in source. 
ECHO.
pause
setlocal ENABLEDELAYEDEXPANSION
cls
ECHO -----------------------------------------------------------
ECHO.
ECHO --SHIP TEMPLATE SCRIPT--
SET /P "version=Enter current version: "
SET /P "wikiTypeShipName=Enter Original ship name: "
SET /P "wikiTypeRegion=Enter Galactic region where ship was found/purchased: "
SET /P "wikiTypeSystemName=Enter System name where ship Was found/purchased: "
SET /P "wikiTypePlanet=Enter Planet name where ship was found/purchased: "
SET /P "wikiTypeCoordinates=Coordinates of star system, include :'s (ie 0000:0DB0:0035:0150): "
SET /P "wikiTypeType=Ship Type (Hauler Shuttle Fighter Explorer): "
SET /P "wikiTypeClass=Ship Class (S A B C): "
SET /P "wikiTypeInventorySize=Size of inventory slots (Small Medium Large): "
SET /P "wikiTypeSlots=Number of Inventory Slots (ie 10 19 28 48): "
SET /P "wikiTypeDamage=Damage: "
SET /P "wikiTypeShield=Shield: "
SET /P "wikiTypeWarp=Warp: "
SET /P "wikiTypePilot=Name of trader who ship was purchased from: "
SET /P "wikiTypeCost=Ship cost in unites: "
SET /P "wikiTypeDiscoveredlink=Discovered by wiki name (will automatically convert to profile link): "
SET /P "wikiTypeDiscovered=Discovered by name or userid (templates supported): "
SET LS=Living Ship

2>NUL CALL :REGION_%wikiTypeRegion%
IF ERRORLEVEL 1 CALL :DEFAULT_CASE

:SHIPcont
REM Checking system name code for bad characters
ECHO .!wikiTypeBasePlanet!.
ECHO strip quotes: .!wikiTypePlanet:"=!.
ECHO .!wikiTypeSystemName!.
ECHO strip quotes: .!wikiTypeSystemName:"=!.

ECHO {{Version^|!version!}}> !wikiTypeShipName!.txt
if %HUB%==GHub (ECHO {{GHub}}) ELSE (if %HUB%==EHUB (ECHO {{GHub Eissentam}}) ELSE (if %HUB%==CHUB (ECHO {{GHub Calypso}})))>> !wikiTypeShipName!.txt
ECHO {{Starship infobox>> "!wikiTypeShipName!.txt"
ECHO ^| name = !wikiTypeShipName!>> "!wikiTypeShipName!.txt"
ECHO ^| image = INSERT FRONT VIEW IMAGE>> "!wikiTypeShipName!.txt"
ECHO ^| galaxy = !wikiTypeGalaxy!>> "!wikiTypeShipName!.txt"
ECHO ^| region = !wikiTypeRegion!>> "!wikiTypeShipName!.txt"
ECHO ^| system = !wikiTypeSystemName!>> "!wikiTypeShipName!.txt"
ECHO ^| planet = !wikiTypePlanet!>> "!wikiTypeShipName!.txt"
ECHO ^| axes = >> "!wikiTypeShipName!.txt"
ECHO ^| portalglyphs = >> "!wikiTypeShipName!.txt"
ECHO ^| coordinates = !wikiTypeCoordinates!>> "!wikiTypeShipName!.txt"
ECHO ^| type = !wikiTypeType!>> "!wikiTypeShipName!.txt"
ECHO ^| subtype = >> "!wikiTypeShipName!.txt"
ECHO ^| exotic = >> "!wikiTypeShipName!.txt"
ECHO ^| class = !wikiTypeClass!>> "!wikiTypeShipName!.txt"
ECHO ^| inventory = !wikiTypeInventorySize!>> "!wikiTypeShipName!.txt"
ECHO ^| slots = !wikiTypeSlots!>> "!wikiTypeShipName!.txt"
ECHO ^| damage = !wikiTypeDamage!>> "!wikiTypeShipName!.txt"
ECHO ^| shield = !wikiTypeShield!>> "!wikiTypeShipName!.txt"
ECHO ^| warp = !wikiTypeWarp!>> "!wikiTypeShipName!.txt"
ECHO ^| pilot = !wikiTypePilot!>> "!wikiTypeShipName!.txt"
ECHO ^| cost = !wikiTypeCost!>> "!wikiTypeShipName!.txt"
ECHO ^| civilized = >> "!wikiTypeShipName!.txt"
ECHO ^| researchteam = >> "!wikiTypeShipName!.txt"
ECHO ^| discoveredlink = !wikiTypeDiscoveredlink!>> "!wikiTypeShipName!.txt"
ECHO ^| discovered = !wikiTypeDiscovered!>> "!wikiTypeShipName!.txt"
ECHO ^| release = !version!>> "!wikiTypeShipName!.txt"
ECHO }} >> "!wikiTypeShipName!.txt"
ECHO '''!wikiTypeShipName!''' is a starship.>> "!wikiTypeShipName!.txt"
ECHO. >> "!wikiTypeShipName!.txt"

ECHO ==Summary== >> "!wikiTypeShipName!.txt"
ECHO '''!wikiTypeShipName!''' is a [[Starship Catalogue - !wikiTypeType!^|!wikiTypeType!]]-type [[starship]] in the [[No Man's Sky]] [[universe]].>> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Exotic (ECHO This starship always spawns in S-class.) ELSE (if "!wikiTypeType!"=="Living Ship" (ECHO This starship always spawns in S-class.) ELSE (ECHO This starship has a 0/1/2^% chance to spawn in S-class.))>> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"

ECHO ==Appearance==>> "!wikiTypeShipName!.txt"
ECHO Describe Appearance>> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"

ECHO ==Stats==>> "!wikiTypeShipName!.txt"
if "!wikiTypeType!"=="Living Ship" ECHO {{LivingShipStats}}>> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Exotic ECHO {{ExoticShipStats}}>> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Shuttle ECHO {{ShuttleShipStats}}>> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Fighter ECHO {{FighterShipStats}}>> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Hauler ECHO {{HaulerShipStats}}>> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Explorer ECHO {{ExplorerShipStats}}>> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"

ECHO ==Location== >> "!wikiTypeShipName!.txt"
ECHO This starship was discovered in the [[!wikiTypeSystemName!]] [[star system]] in the [[!wikiTypeRegion!]] %Num% of the [[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]. >> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"
ECHO It can be found at either the [[Space Station]] or any [[Trade Outpost]]s available in the star system. >> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"

ECHO ==Additional information== >> "!wikiTypeShipName!.txt"
ECHO Featured in the [[Galactic Hub Eissentam Starship Catalog - !wikiTypeType!]] album and documented by the [[Galactic Hub Ship Hunters]]. >> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"

ECHO ==Gallery== >> "!wikiTypeShipName!.txt"
ECHO ^<gallery^> >> "!wikiTypeShipName!.txt"
ECHO file.jpg^|Rear view of ship >> "!wikiTypeShipName!.txt"
ECHO file.jpg^|Inventory screen >> "!wikiTypeShipName!.txt"
ECHO file.jpg^|NPC Ship Pilot >> "!wikiTypeShipName!.txt"
ECHO file.jpg^|Analysis Visor Scan >> "!wikiTypeShipName!.txt"
ECHO file.jpg^|System Page >> "!wikiTypeShipName!.txt"
ECHO ^</gallery^> >> "!wikiTypeShipName!.txt"
ECHO.>> "!wikiTypeShipName!.txt"

ECHO ==Reference links== >> "!wikiTypeShipName!.txt"
if "!wikiTypeType!"=="Living Ship" ECHO * [[Living Ship (Starship)#Part Names^|Living Ship Parts Catalogue]] >> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Exotic ECHO * [https://www.reddit.com/r/NMSCoordinateExchange/comments/k2srjr/exotic_parts_naming_conventions_and_part_combo/ Exotic Parts Catalogue] >> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Explorer ECHO * [[Explorer Parts Catalogue]] >> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Fighter ECHO * [[Fighter Parts Catalogue]] >> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Hauler ECHO * [[Hauler Parts Catalogue]] >> "!wikiTypeShipName!.txt"
if !wikiTypeType!==Shuttle ECHO * [[Shuttle Parts Catalogue]] >> "!wikiTypeShipName!.txt"
ECHO * [[Starship#Starship_Archetypes^|Inventory/Tech slot tables]] >> "!wikiTypeShipName!.txt"
ECHO * [[Economy#Economy_Strength^|Economy wealth]] >> "!wikiTypeShipName!.txt"
ECHO * [[Price Catalogue - Starship]] >> "!wikiTypeShipName!.txt"


endlocal
rem start "" "C:\Program Files\Notepad++\notepad++.exe" "%wikiTypeShipName%.txt"
CLS
GOTO MAIN

:FAUNA
ECHO.
ECHO This script will ask you several questions about a fauna/animal
ECHO and then create sourcetext for a wiki page over at:
ECHO https://nomanssky.fandom.com
ECHO.
ECHO NOTE: Photos will need to be uploaded at wiki and linked in source. 
ECHO.
pause
setlocal ENABLEDELAYEDEXPANSION
cls
ECHO -----------------------------------------------------------
ECHO.
ECHO --FAUNA TEMPLATE SCRIPT--
SET /P "wikiTypeGenus=Enter Genus/Name of fauna: "
SET /P "wikiTypePlanet=Enter Planet where fauna was found: "
SET /P "wikiTypeSystemName=Enter Star System where fauna Was found: "
SET /P "wikiTypeRegion=Enter Galactic Region where fauna Was found: "
SET /P "wikiTypeRarity=Enter fauna rarity (common uncommon rare): "
SET /P "wikiTypeHeight=Enter fauna height (ie 2.4m): "
SET /P "wikiTypeWeight=Enter fauna weight (ie 129kg): "
SET /P "wikiTypeGender=Enter fauna gender: "
SET /P "wikiTypeTemperament=Enter fauna temperament: "
SET /P "wikiTypeDiet=Enter fauna diet: "
SET /P "wikiTypeDiscovered=Discovered by name or userid (ie seamonkey420): "

2>NUL CALL :REGION_%wikiTypeRegion%
IF ERRORLEVEL 1 CALL :DEFAULT_CASE

:FAUNAcont
REM Checking code for bad characters
ECHO .!wikiTypeGenus!.
ECHO strip quotes: .!wikiTypeGenus:"=!.
ECHO .!wikiTypeSystemName!.
ECHO strip quotes: .!wikiTypeSystemName:"=!.
ECHO .!wikiTypePlanet!.
ECHO strip quotes: .!wikiTypePlanet:"=!.

ECHO {{Version^|NEXT}}> %userprofile%\Desktop\GeneratedFauna.txt
ECHO {{GHub}}>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO {{Creature infobox>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| image = INSERT FAUNA IMAGE>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| planet = !wikiTypePlanet!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| genus = !wikiTypeGenus!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| height = !wikiTypeHeight!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| diet = !wikiTypeDiet!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| weight = !wikiTypeWeight!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| gender = !wikiTypeGender!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| temperament = !wikiTypeTemperament!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| rarity= !wikiTypeRarity!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| discovered = !wikiTypeDiscoverd!>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO ^| release = NEXT>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO }}>> %userprofile%\Desktop\GeneratedFauna.txt
 
ECHO ==Summary==>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO INSERT DESCRIPTION HERE>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO.>> %userprofile%\Desktop\GeneratedFauna.txt

ECHO ==Gallery ^& Videos==>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO INSERT GALLERY HERE>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO.>> %userprofile%\Desktop\GeneratedFauna.txt

ECHO ==Categories==>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO [[Category: Species]]>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO [[Category: !wikiTypeSystemName!]]>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO [[Category: !wikiTypeRegion!]]>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO [[Category: Galactic Hub Project]]>> %userprofile%\Desktop\GeneratedFauna.txt
ECHO [[Category: NEXT]]>> %userprofile%\Desktop\GeneratedFauna.txt

endlocal
start "" notepad.exe "%userprofile%\Desktop\GeneratedFauna.txt"
CLS
GOTO MAIN


:EXITMENU
ECHO Thanks for using^^! seamonkey420
ECHO "Knowledge is power, spread the power"
TIMEOUT 5
pause
