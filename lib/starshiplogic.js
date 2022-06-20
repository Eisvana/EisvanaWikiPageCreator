{{trim|{{#switch: {{lc:{{{region|}}} }}<!--Assigning galaxies and region numbers based on user input-->
| riwala = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB1)}} 
| omskio instability = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB2)}}
| marcki = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB3)}}
| anolamga spur = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB4)}}
| sea of zonyayp = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB5)}}
| rayuyar band = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB6)}}
| umaton instability = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB7)}}
| exramb adjunct = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB8)}}
| ologowe fringe = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB9)}}
| yatrifex = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB10)}}
| yeiada sector = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB11)}}
| iptrevs fringe = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB12)}}
| yamiraith sector = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB13)}}
| wedragi spur = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB14)}}
| rezhensk = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB15)}}
| sobert cloud = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB16)}}
| umtats anomaly = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB17)}}
| tavill = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB18)}}
| qangew expanse = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB19)}}
| nijhwal boundary = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB20)}}
| usband cluster = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB21)}}
| ejongaa anomaly = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB22)}}
| zahrel expanse = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB23)}}
| the arm of fupand = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB24)}}
| cuculta = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB25)}}
| etmarao = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB26)}}
| otreie void = {{#vardefine:HUB|EHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB27)}}
| the arm of vezitinen = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB1)}}
| canthian = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB2)}}
| dexterf sector = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB3)}}
| the arm of katteus = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB4)}}
| nugsdor adjunct = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB5)}}
| uefert nebula = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB6)}}
| widraik = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB7)}}
| airnaka conflux = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB8)}}
| sivess instability = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB9)}}
| savenix instability = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB10)}}
| nonlopsi instability = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|<nowiki>[[region]]</nowiki> (HUB11)}}
| #default = {{#vardefine:HUB|GHUB}} {{#vardefine:Num|Huburb}}
}}
{{#switch: {{lc:{{{economy}}} }}<!--Assigning economy tiers based on user input-->
| declining
| destitute
| failing
| fledgling
| low Supply
| struggling
| unsuccessfu
| unpromising = {{#vardefine:EconTier|T1}}
| adequate
| balanced
| comfortable
| developing
| medium Supply
| promising 
| satisfactory
| sustainable = {{#vardefine:EconTier|T2}}
| advanced
| affluent
| booming
| flourishing
| high Supply
| opulent
| prosperous
| wealthy = {{#vardefine:EconTier|T3}}
| #default = {{#vardefine:EconTier|unknown}}<!--flagging Economy name as invalid-->
}}
{{#switch: {{lc:{{{subtype}}} }}<!--Assigning capital status to freighters based on user input-->
| venator
| imperial
| resurgent
| sentinel
| battleship
| dreadnought = {{#vardefine:Cap|yes}}
| #default = {{#vardefine:Cap|no}}
}}
{{#switch: {{lc:{{{type}}} }}<!--look if entered type is valid-->
| exotic
| explorer
| fighter
| hauler
| shuttle
| freighter
| living ship = {{#vardefine:KnownType|yes}}
| #default = {{#vardefine:KnownType|no}}<!--flagging type as invalid-->
}}
{{#switch: {{lc:{{{inventory}}} }}<!--look if entered inventory size is valid-->
| small
| medium
| large = {{#vardefine: InvKnown|yes}}
| #default = {{#vardefine: InvKnown|no}}<!--flagging inventory size as invalid-->
}}