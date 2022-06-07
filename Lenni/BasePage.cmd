@echo off
GOTO MAIN
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

ECHO ==Planets ^& Moons== >> .\GeneratedStarSystem.txt
ECHO {^| class="wikitable" width="90%%">> .\GeneratedStarSystem.txt
ECHO ^|->> .\GeneratedStarSystem.txt
ECHO ^^!width=125 style="background-color:#384640;"^|>> .\GeneratedStarSystem.txt
ECHO ^^!width=150 style="background-color:#384640;"^|Planet Name>> .\GeneratedStarSystem.txt
ECHO ^^!width=150 style="background-color:#384640;"^|Type>> .\GeneratedStarSystem.txt
ECHO ^^!style="background-color:#384640;"^|Extreme^<br^> Weather>> .\GeneratedStarSystem.txt
ECHO ^^!style="background-color:#384640;"^|Aggressive^<br^> Sentinels>> .\GeneratedStarSystem.txt
ECHO ^|->> .\GeneratedStarSystem.txt
ECHO ^|colspan=5 style="background-color:white;"^|>> .\GeneratedStarSystem.txt
ECHO ^|->> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

REM Creates rows for total number of planets and moons. Quick math before creating
set /a wikiTypeTotalBodies=%wikiTypePlanets% + %wikiTypeMoons%
for /l %%x in (1, 1, %wikiTypeTotalBodies%) do (
ECHO ^|width=125 style="background-color:#384640;"^|[[INSERT PLANET MOON IMAGE^|125px]]>> .\GeneratedStarSystem.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^| [[PLANET NAME]]>> .\GeneratedStarSystem.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^|PLANET TYPE>> .\GeneratedStarSystem.txt
ECHO ^|style="background-color:#384640; text-align:center"^|YES NO>> .\GeneratedStarSystem.txt
ECHO ^|style="background-color:#384640; text-align:center"^|YES NO>> .\GeneratedStarSystem.txt
ECHO ^|->> .\GeneratedStarSystem.txt
ECHO ^|width=125 style="background-color:#384640; text-align:center"^|INSERT RESOURCES>> .\GeneratedStarSystem.txt
ECHO ^|width=150 style="background-color:#384640;"^|'''100%% Zoology Bonus:''' ZoologyBonusAmount {{Nanites}}>> .\GeneratedStarSystem.txt
ECHO ^|colspan=3 style="background-color:#384640; text-align:left"^|INSERT NOTES>> .\GeneratedStarSystem.txt
ECHO ^|->> .\GeneratedStarSystem.txt
ECHO ^|colspan=5 style="background-color:white;"^| >> .\GeneratedStarSystem.txt
ECHO ^|- >> .\GeneratedStarSystem.txt
)
ECHO ^|}>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ==Starships==>> .\GeneratedStarSystem.txt
ECHO INSERT SHIP GALLERY HERE>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ==Location Information==>> .\GeneratedStarSystem.txt
ECHO ===Coordinates===>> .\GeneratedStarSystem.txt
ECHO ^<sub^>''NOTE:'' Coordinates correspond to the location of entire regions, not specific systems. In other words, for all the coordinates in the Galactic Hub, there are only 11 effective outputs. Therefore, coordinates are useful for Portal travel, but not particularly useful on Pilgrim Star Path when inside the Hub.^</sub^> >> .\GeneratedStarSystem.txt
ECHO {{coords^|0000^|0000^|0000^|0000^|}}>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ===Portal Glyphs===>> .\GeneratedStarSystem.txt
ECHO {{Gl^|hexadecimal glyph for portal}} >> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt
ECHO ===Navigation Images===>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt
ECHO ===Locating !wikiTypeSystemName!===>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ==Space station==>> .\GeneratedStarSystem.txt

ECHO ===Multitool Technology Merchant===>> .\GeneratedStarSystem.txt
ECHO {^| class="wikitable">> .\GeneratedStarSystem.txt
ECHO ^^! style="background-color:#384640^;"^|Modules for Sale  ^^!^^! style="background-color:#384640^;"^|Price ([[Nanite Clusters]])>> .\GeneratedStarSystem.txt
ECHO ^|- >> .\GeneratedStarSystem.txt
REM -----Shortcut to making 14 row tables!! go FOR commands!
for /L %%i in (1,1,14) do (
ECHO ^| style="background-color:#384640^;"^| [[MODULENAME]] ^(MODULECLASS^)^|^| style="background-color:#1A211E^; text-align:center"^|PRICE>> .\GeneratedStarSystem.txt
ECHO ^|- >> .\GeneratedStarSystem.txt
)
ECHO ^|}>> .\GeneratedStarSystem.txt

ECHO ===Starship Technology Merchant===>> .\GeneratedStarSystem.txt
ECHO {^| class="wikitable">> .\GeneratedStarSystem.txt
ECHO ^^! style="background-color:#384640^;"^|Modules for Sale  ^^!^^! style="background-color:#384640^;"^|Price ([[Nanite Clusters]])>> .\GeneratedStarSystem.txt
ECHO ^|- >> .\GeneratedStarSystem.txt
REM -----Shortcut to making 18 row tables!! go FOR commands!
for /l %%i in (1, 1, 18) do (
ECHO ^| style="background-color:#384640^;"^| [[MODULENAME]] ^(MODULECLASS^)^|^| style="background-color:#1A211E^; text-align:center"^|PRICE>> .\GeneratedStarSystem.txt
ECHO ^|- >> .\GeneratedStarSystem.txt
)
ECHO ^|}>> .\GeneratedStarSystem.txt


ECHO ===Exosuit Technology Merchant===>> .\GeneratedStarSystem.txt
ECHO {^| class="wikitable">> .\GeneratedStarSystem.txt
ECHO ^^! style="background-color:#384640^;"^|Modules for Sale  ^^!^^! style="background-color:#384640^;"^|Price ([[Nanite Clusters]])>> .\GeneratedStarSystem.txt
ECHO ^|- >> .\GeneratedStarSystem.txt

REM Shortcut to making 16 row tables!! go FOR commands!
for /l %%i in (1, 1, 16) do (
ECHO ^| style="background-color:#384640^;"^| [[MODULENAME]] ^(MODULECLASS^)^|^| style="background-color:#1A211E^; text-align:center"^|PRICE>> .\GeneratedStarSystem.txt
ECHO ^|- >> .\GeneratedStarSystem.txt
)
ECHO ^|}>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ==Galactic Trade Terminals (Noteworthy Items)==>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ==Additional Info==>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ==Gallery==>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt


ECHO ==External Links==>> .\GeneratedStarSystem.txt
ECHO {{Hub External Links}}>> .\GeneratedStarSystem.txt
ECHO.>> .\GeneratedStarSystem.txt

ECHO ==Categories== >> .\GeneratedStarSystem.txt
ECHO [[Category:!wikiTypeSystemName!]]>> .\GeneratedStarSystem.txt
ECHO [[Category:%wikiTypeRegion%]]>> .\GeneratedStarSystem.txt
ECHO [[Category:Galactic Hub Project]]>> .\GeneratedStarSystem.txt
ECHO [[Category:Star systems]]>> .\GeneratedStarSystem.txt
ECHO [[Category:NEXT]]>> .\GeneratedStarSystem.txt
endlocal

rem start "" notepad.exe ".\GeneratedStarSystem.txt"
GOTO EXITMENU



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

ECHO {{Version^|NEXT}}> .\GeneratedPlanet.txt
ECHO {{Banner GHP}}>> .\GeneratedPlanet.txt
ECHO {{Planet infobox>> .\GeneratedPlanet.txt
ECHO ^| name = !wikiTypePlanetName!>> .\GeneratedPlanet.txt
ECHO ^| image = INSERT PLANET IMAGE HER>> .\GeneratedPlanet.txt
ECHO ^| system = !wikiTypeSystemName!>> .\GeneratedPlanet.txt
ECHO ^| region = !wikiTypeRegion!>> .\GeneratedPlanet.txt
ECHO ^| galaxy = !wikiTypePlanetGalaxy!>> .\GeneratedPlanet.txt
ECHO ^| type = !wikiTypePlanetDesc!>> .\GeneratedPlanet.txt
ECHO ^| atmosphere = (ie Hazy or Clear, etc)>> .\GeneratedPlanet.txt
ECHO ^| terrain = (ie Rocky or Waterworld, etc)>> .\GeneratedPlanet.txt
ECHO ^| weather = !wikiTypeWeather!>> .\GeneratedPlanet.txt
ECHO ^| resources = INSERT RESOURCES eg [[Iridiium^|Ir]][[Cymatygen^|Cy]]>> .\GeneratedPlanet.txt
ECHO ^| sentinel = !wikiTypeSentinels!>> .\GeneratedPlanet.txt
ECHO ^| flora = !wikiTypeFlora!>> .\GeneratedPlanet.txt
ECHO ^| fauna = !wikiTypeFauna!>> .\GeneratedPlanet.txt
ECHO ^| discovered = !wikiTypeDiscoveredBy!>> .\GeneratedPlanet.txt
ECHO ^| mode = !wikiTypeMode!>> .\GeneratedPlanet.txt
ECHO ^| platform = !wikiTypePlayedOn!>> .\GeneratedPlanet.txt
ECHO ^| release = NEXT>> .\GeneratedPlanet.txt
ECHO }} >> .\GeneratedPlanet.txt
ECHO. >> .\GeneratedPlanet.txt
ECHO '''!wikiTypePlanetName!''' is a [[planet]] in the [[!wikiTypeSystemName!]] system>> .\GeneratedPlanet.txt
ECHO ==Summary==>> .\GeneratedPlanet.txt
ECHO. >> .\GeneratedPlanet.txt
ECHO INSERT PLANET SUMMARY HERE. INFO ABOUT, NAME INSPIRATION, LANDMARKS/PORTALS, ETC >> .\GeneratedPlanet.txt
ECHO. >> .\GeneratedPlanet.txt

ECHO ==Resources==>> .\GeneratedPlanet.txt
ECHO * "Form" refers to, for example: crystal form, resource deposit form, Pedestal Form ^(Vortex Cube^), "Stem" Form ^(Gravitino Balls^), etc* "Form" refers to, for example: crystal form, resource deposit form, Pedestal Form ^(Vortex Cube^), “Stem” Form ^(Gravitino Balls^), etc>> .\GeneratedPlanet.txt
ECHO * "Rarity" refers to how often the resource appears on the planet, and is just an estimate ^(there's no in-game value to measure it by^).>> .\GeneratedPlanet.txt
ECHO * "Standard resources like [[Carbon]], [[Condensed Carbon]], [[Sodium]], etc. may be included or omitted at the editor's discretion.>> .\GeneratedPlanet.txt

ECHO {^| class="wikitable">> .\GeneratedPlanet.txt
ECHO ^^! style="background-color:#1A211E;"^|Image ^^!^^! style="background-color:#384640;"^|Resource ^^!^^! style="background-color:#384640;"^|Form ^^!^^! style="background-color:#384640;"^|Rarity>> .\GeneratedPlanet.txt
ECHO ^|->> .\GeneratedPlanet.txt
ECHO ^| style="background-color:#384640;"^| [[File:IMAGEFILE^|125px]] ^|^| style="background-color:#1A211E; text-align:center"^|RESOURCE ^|^| style="background-color:#1A211E; text-align:center"^|FORM ^|^| style="background-color:#1A211E; text-align:center"^|RARITY>> .\GeneratedPlanet.txt
ECHO ^|->> .\GeneratedPlanet.txt
ECHO ^|}>> .\GeneratedPlanet.txt
ECHO.>> .\GeneratedPlanet.txt


ECHO ==Life== >> .\GeneratedPlanet.txt

ECHO ===Fauna=== >> .\GeneratedPlanet.txt
ECHO {^| class="wikitable" width="90%%" >> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt
ECHO ^^!width=125 style="background-color:#384640;"^| >> .\GeneratedPlanet.txt 
ECHO ^^!width=150 style="background-color:#384640;"^|Name >> .\GeneratedPlanet.txt
ECHO ^^!width=150 style="background-color:#384640;"^|Temperament >> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Height >> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Weight >> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt
ECHO ^|colspan=5 style="background-color:white;"^| >> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt

REM Creates rows for total number of fauna input
for /l %%x in (1, 1, %wikiTypeFaunaNumber%) do (
ECHO ^|width=125 style="background-color:#384640;"^|[[FAUNA IMAGE^|125px]]>> .\GeneratedPlanet.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^|SPECIESNAME>> .\GeneratedPlanet.txt
ECHO ^|width=150 style="background-color:#384640; text-align:center"^|TEMPERAMENT>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|HEIGHT>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|WEIGHT>> .\GeneratedPlanet.txt
ECHO ^|->> .\GeneratedPlanet.txt
ECHO ^|colspan=2 style="background-color:#384640; text-align:center"^|Discover>> .\GeneratedPlanet.txt
ECHO ^|colspan=1 style="background-color:#384640; text-align:center"^|'''Genus''': [[GENUS]]>> .\GeneratedPlanet.txt
ECHO ^|colspan=3 style="background-color:#384640; text-align:center"^|'''NOTES''' : NOTES>> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt
)
ECHO ^|}>> .\GeneratedPlanet.txt
ECHO.>> .\GeneratedPlanet.txt

ECHO ====Zoology Scan Completion==== >> .\GeneratedPlanet.txt
ECHO '''%wikiTypePlayedOn%''': %wikiTypeZoology% >> .\GeneratedPlanet.txt
ECHO.>> .\GeneratedPlanet.txt

ECHO ==Flora==>> .\GeneratedPlanet.txt
ECHO {^| class="wikitable" width="90%%">> .\GeneratedPlanet.txt
ECHO ^|->> .\GeneratedPlanet.txt
ECHO ^^!width=125 style="background-color:#384640;"^|>> .\GeneratedPlanet.txt 
ECHO ^^!style="background-color:#384640;"^|Name>> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Age>> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Root Structure>> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Nutrient Source>> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Notes^<br^>& Resources >> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#384640;"^|Discovered By>> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt
ECHO ^|colspan=5 style="background-color:white;"^|>> .\GeneratedPlanet.txt
ECHO ^|->> .\GeneratedPlanet.txt

REM Creates rows for total number flora 
for /l %%x in (1, 1, %wikiTypeFloraNumber%) do (
ECHO ^|width=125 style="background-color:#384640;"^|[[FLORA IMAGE^|125px]]>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|SpeciesName>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|SpeciesAge>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|RootStructure>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|NutrientSource>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|NotesAndElements>> .\GeneratedPlanet.txt
ECHO ^|style="background-color:#384640; text-align:center"^|Discoverer>> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt
)
ECHO ^|}>> .\GeneratedPlanet.txt
ECHO.>> .\GeneratedPlanet.txt

ECHO ==Atmosphere ^& Climate== >> .\GeneratedPlanet.txt
ECHO * Maximum Temperature:%wikiTypeMaxTemp% >> .\GeneratedPlanet.txt
ECHO * Minimum Temperature: %wikiTypeMinTemp% >> .\GeneratedPlanet.txt
ECHO * Storm Temperature: %wikiTypeStorm% >> .\GeneratedPlanet.txt
ECHO * Radioactivity (Rads): %wikiTypeRad%  >> .\GeneratedPlanet.txt
ECHO * Toxicity (Tox): %wikiTypeTox% >> .\GeneratedPlanet.txt
ECHO. >> .\GeneratedPlanet.txt

ECHO ==Notable Locations ^& Waypoints== >> .\GeneratedPlanet.txt
ECHO {^| class="wikitable" width="90%%">> .\GeneratedPlanet.txt
ECHO ^^!style="background-color:#1A211E;"^|Image ^^!^^! style="background-color:#384640;"^|Name  ^^!^^! style="background-color:#384640;"^|Description ^^!^^! style="background-color:#384640;"^|Latitude/Longitude >> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt
ECHO ^| style="background-color:#384640;"^| [[File:IMAGEFILE^|125px]] ^|^| style="background-color:#1A211E; text-align:center"^|NAME ^|^| style="background-color:#1A211E; text-align:center"^|DESCRIPTION ^|^| style="background-color:#1A211E; text-align:center"^|LATITUDE / LONGITUDE(fromVisor)>> .\GeneratedPlanet.txt
ECHO ^|- >> .\GeneratedPlanet.txt
ECHO ^|}>> .\GeneratedPlanet.txt
ECHO.>> .\GeneratedPlanet.txt

ECHO ==Gallery== >> .\GeneratedPlanet.txt
ECHO INSERT PLANET PHOTO GALLERY HERE >> .\GeneratedPlanet.txt
ECHO. >> .\GeneratedPlanet.txt

ECHO ==Categories== >> .\GeneratedPlanet.txt
ECHO [[Category:Planets]]>> .\GeneratedPlanet.txt
ECHO [[Category:!wikiTypeSystemName!]]>> .\GeneratedPlanet.txt
ECHO [[Category:!wikiTypeRegion!]]>> .\GeneratedPlanet.txt
ECHO [[Category:Galactic Hub Project]]>> .\GeneratedPlanet.txt
ECHO [[Category:NEXT]]>> .\GeneratedPlanet.txt

endlocal

rem start "" notepad.exe ".\GeneratedPlanet.txt"
GOTO EXITMENU



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

SET /P Version=Enter current Version (Prisms, Frontiers, Outlaws...): 
SET /P civstub=Enter civ macro (GHub; GHub Eissentam; GHub Calypso): 
SET /P wikiTypeBaseName=Enter Base Name: 
SET /P wikiTypeImage=Enter Main Picture Name with file extension: 
SET /P wikiTypeBaseRegion=Enter Galactic Region: 
SET /P wikiTypeSystemName=Enter System Name: 
SET /P wikiTypeBasePlanet=Enter Planet Name Where Base Located: 
SET /P wikiTypeBaseMoon=Enter Moon Name Where Base Located OR leave empty: 
SET /P wikiTypeBaseAxes=Planetary Coordinates of the Base (+xx.xx, -xx.xx)?: 
SET /P wikiTypeGlyphs=Glyphs?: 
SET /P wikiTypeBaseType=What type is the base (Residential, Farm, Embassy, Headquarters...)?: 
SET /P wikiTypeFarm=Farm at Base (Yes/No)?:
SET /P wikiTypeGeoBay=Geobay?: 
SET /P wikiTypeArena=Arena?: 
SET /P wikiTypeLandingPad=Landing pads?: 
SET /P wikiTypeRaceTrack=Racetrack (Yes/No)?: 
SET /P wikiTypeTerminal=Trade Terminal (Yes/No)?: 
SET /P wikiTypeBuilderLink=Enter builder wiki name (leave blank if doesn't exist): 
SET /P wikiTypeBuilder=Enter builder name (leave blank if you have already given a wiki name): 
SET /P wikiTypeMode=Game Mode (Normal Survival Permadeath Creative)?: 
SET /P wikiTypePlayedOn=Enter PC; PS; XB: 
SET /P wikiTypeCensusPlayer=Census: Player name as it appears ingame: 
SET /P wikiTypeCensusReddit=Census: Reddit name of player: 
SET /P wikiTypeCensusDiscord=Census: Discord name of player: 
SET /P wikiTypeCensusFriend=Census: Friend Code of player: 
SET /P wikiTypeCensusArrival=Census: Arrival date of player (use format YYYY/MM/DD): 
SET /P wikiTypeCensusRenewal=Census: Year of renewal: 

SET /P BaseLayout=Enter Base Layout Info (linebreaks are not supported):	
SET /P BaseFeatures=Enter Base Features (linebreaks are not supported): 
SET /P AdditionalInformation=Enter Additional Information (linebreaks are not supported): 
REM 2>NUL CALL :REGION_%wikiTypeRegion%
REM IF ERRORLEVEL 1 CALL :DEFAULT_CASE

:BASEcont
REM Checking system name code for bad characters
ECHO .!wikiTypeBaseName!.
ECHO strip quotes: .!wikiTypeBaseName:"=!.
ECHO .!wikiTypeSystemName!.
ECHO strip quotes: .!wikiTypeSystemName:"=!.

if "%civstub%" == "GHub" SET wikiTypeGalaxy=Euclid & SET Civilized=Galactic Hub Project
if "%civstub%" == "GHub Eissentam" SET wikiTypeGalaxy=Eissentam & SET Civilized=Galactic Hub Eissentam
if "%civstub%" == "GHub Calypso" SET wikiTypeGalaxy=Calypso & SET Civilized=Galactic Hub Calypso

:MOVEON
ECHO {{Version^|!Version!}}>> .\!wikiTypeBaseName!.txt
ECHO {{!civstub!}}>> .\!wikiTypeBaseName!.txt
ECHO {{Base infobox>> .\!wikiTypeBaseName!.txt
ECHO ^| name = !wikiTypeBaseName!>> .\!wikiTypeBaseName!.txt
ECHO ^| image = !wikiTypeImage!>> .\!wikiTypeBaseName!.txt
ECHO ^| civilized = !Civilized!>> .\!wikiTypeBaseName!.txt
ECHO ^| builder = !wikiTypeBuilder!>> .\!wikiTypeBaseName!.txt
ECHO ^| builderlink = !wikiTypeBuilderLink!>> .\!wikiTypeBaseName!.txt
ECHO ^| galaxy = !wikiTypeGalaxy!>> .\!wikiTypeBaseName!.txt
ECHO ^| region = !wikiTypeBaseRegion!>> .\!wikiTypeBaseName!.txt
ECHO ^| system = !wikiTypeSystemName!>> .\!wikiTypeBaseName!.txt
ECHO ^| planet = !wikiTypeBasePlanet!>> .\!wikiTypeBaseName!.txt
ECHO ^| moon = !wikiTypeBaseMoon!>> .\!wikiTypeBaseName!.txt
ECHO ^| axes = !wikiTypeBaseAxes!>> .\!wikiTypeBaseName!.txt
ECHO ^| coordinates = {{Glyphs2Coords^|!wikiTypeGlyphs!}}>> .\!wikiTypeBaseName!.txt
ECHO ^| portalglyphs = {{Gl/Small^|!wikiTypeGlyphs!}}>> .\!wikiTypeBaseName!.txt
ECHO ^| type = !wikiTypeBaseType!>> .\!wikiTypeBaseName!.txt
ECHO ^| mode = !wikiTypeMode!>> .\!wikiTypeBaseName!.txt
ECHO ^| platform = !wikiTypePlayedOn!>> .\!wikiTypeBaseName!.txt
ECHO ^| release= !Version!>> .\!wikiTypeBaseName!.txt
ECHO ^| farm = !wikiTypeFarm!>> .\!wikiTypeBaseName!.txt
ECHO ^| geobay = !wikiTypeGeoBay!>> .\!wikiTypeBaseName!.txt
ECHO ^| arena = !wikiTypeArena!>> .\!wikiTypeBaseName!.txt
ECHO ^| landingpad = !wikiTypeLandingPad!>> .\!wikiTypeBaseName!.txt
ECHO ^| racetrack = !wikiTypeRaceTrack!>> .\!wikiTypeBaseName!.txt
ECHO ^| terminal = !wikiTypeTerminal!>> .\!wikiTypeBaseName!.txt
ECHO ^| censusplayer = !wikiTypeCensusPlayer!>> .\!wikiTypeBaseName!.txt
ECHO ^| censusreddit = !wikiTypeCensusReddit!>> .\!wikiTypeBaseName!.txt
ECHO ^| censusdiscord = !wikiTypeCensusDiscord!>> .\!wikiTypeBaseName!.txt
ECHO ^| censusfriend = !wikiTypeCensusFriend!>> .\!wikiTypeBaseName!.txt
ECHO ^| censusarrival = !wikiTypeCensusArrival!>> .\!wikiTypeBaseName!.txt
ECHO ^| censusrenewal = !wikiTypeCensusRenewal!>> .\!wikiTypeBaseName!.txt
ECHO ^| censusshow = Y>> .\!wikiTypeBaseName!.txt
ECHO }} >> .\!wikiTypeBaseName!.txt
ECHO '''!wikiTypeBaseName!''' is a player base. >> .\!wikiTypeBaseName!.txt
ECHO. >> .\!wikiTypeBaseName!.txt

ECHO ==Summary== >> .\!wikiTypeBaseName!.txt
ECHO '''!wikiTypeBaseName!''' is a [[Habitable Base^|player base]] located on [[!wikiTypeBasePlanet!]] in the [[!wikiTypeSystemName!]] system.	>> .\!wikiTypeBaseName!.txt
ECHO.  >> .\!wikiTypeBaseName!.txt

ECHO ===Layout===  >> .\!wikiTypeBaseName!.txt
ECHO !BaseLayout!  >> .\!wikiTypeBaseName!.txt
ECHO.  >> .\!wikiTypeBaseName!.txt

ECHO ==Features==  >> .\!wikiTypeBaseName!.txt
ECHO !BaseFeatures!	>> .\!wikiTypeBaseName!.txt
ECHO.  >> .\!wikiTypeBaseName!.txt

ECHO ==Additional information==  >> .\!wikiTypeBaseName!.txt
ECHO !AdditionalInformation!  >> .\!wikiTypeBaseName!.txt
ECHO.  >> .\!wikiTypeBaseName!.txt

ECHO ==Gallery==  >> .\!wikiTypeBaseName!.txt
ECHO ^<gallery^>	 >> .\!wikiTypeBaseName!.txt
ECHO ^</gallery^>	 >> .\!wikiTypeBaseName!.txt

endlocal
REM start ".\!wikiTypeBaseName!.txt"
GOTO EXITMENU


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
if %HUB%==GHUB if %Num%==Huburb ECHO This starship was discovered in the [[!wikiTypeSystemName!]] [[star system]] in the [[!wikiTypeRegion!]] [[region]], %Num% of the [[Galactic Hub]]. >> "!wikiTypeShipName!.txt"
if %HUB%==GHUB if NOT %Num%==Huburb ECHO This starship was discovered in the [[!wikiTypeSystemName!]] [[star system]] in the [[!wikiTypeRegion!]] %Num% of the [[Galactic Hub]]. >> "!wikiTypeShipName!.txt"
if %HUB%==CHUB ECHO This starship was discovered in the [[!wikiTypeSystemName!]] [[star system]] in the [[!wikiTypeRegion!]] %Num% of the [[Galactic Hub Calypso]], in the [[Calypso]] [[galaxy]]. >> "!wikiTypeShipName!.txt"
if %HUB%==EHUB ECHO This starship was discovered in the [[!wikiTypeSystemName!]] [[Star system]] in the [[!wikiTypeRegion!]] [[region]] %Num% of the [[Galactic Hub Eissentam]], in the [[Eissentam]] [[galaxy]]. >> "!wikiTypeShipName!.txt"
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
if !wikiTypeType!==Freighter (ECHO * [[Freighter#Varieties^|Freighter Inventory Table]]) ELSE (ECHO * [[Starship#Starship_Archetypes^|Inventory/Tech slot tables]]) >> "!wikiTypeShipName!.txt"
ECHO * [[Economy#Economy_Strength^|Economy wealth]] >> "!wikiTypeShipName!.txt"
ECHO * [[Price Catalogue - Starship]] >> "!wikiTypeShipName!.txt"


endlocal
rem start "" "C:\Program Files\Notepad++\notepad++.exe" "%wikiTypeShipName%.txt"
GOTO EXITMENU


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

ECHO {{Version^|NEXT}}> .\GeneratedFauna.txt
ECHO {{GHub}}>> .\GeneratedFauna.txt
ECHO {{Creature infobox>> .\GeneratedFauna.txt
ECHO ^| image = INSERT FAUNA IMAGE>> .\GeneratedFauna.txt
ECHO ^| planet = !wikiTypePlanet!>> .\GeneratedFauna.txt
ECHO ^| genus = !wikiTypeGenus!>> .\GeneratedFauna.txt
ECHO ^| height = !wikiTypeHeight!>> .\GeneratedFauna.txt
ECHO ^| diet = !wikiTypeDiet!>> .\GeneratedFauna.txt
ECHO ^| weight = !wikiTypeWeight!>> .\GeneratedFauna.txt
ECHO ^| gender = !wikiTypeGender!>> .\GeneratedFauna.txt
ECHO ^| temperament = !wikiTypeTemperament!>> .\GeneratedFauna.txt
ECHO ^| rarity= !wikiTypeRarity!>> .\GeneratedFauna.txt
ECHO ^| discovered = !wikiTypeDiscoverd!>> .\GeneratedFauna.txt
ECHO ^| release = NEXT>> .\GeneratedFauna.txt
ECHO }}>> .\GeneratedFauna.txt
 
ECHO ==Summary==>> .\GeneratedFauna.txt
ECHO INSERT DESCRIPTION HERE>> .\GeneratedFauna.txt
ECHO.>> .\GeneratedFauna.txt

ECHO ==Gallery ^& Videos==>> .\GeneratedFauna.txt
ECHO INSERT GALLERY HERE>> .\GeneratedFauna.txt
ECHO.>> .\GeneratedFauna.txt

ECHO ==Categories==>> .\GeneratedFauna.txt
ECHO [[Category: Species]]>> .\GeneratedFauna.txt
ECHO [[Category: !wikiTypeSystemName!]]>> .\GeneratedFauna.txt
ECHO [[Category: !wikiTypeRegion!]]>> .\GeneratedFauna.txt
ECHO [[Category: Galactic Hub Project]]>> .\GeneratedFauna.txt
ECHO [[Category: NEXT]]>> .\GeneratedFauna.txt

endlocal
rem start "" notepad.exe ".\GeneratedFauna.txt"

:EXITMENU
ECHO Thanks for using^^! seamonkey420
ECHO "Knowledge is power, spread the power"
TIMEOUT 5
pause
