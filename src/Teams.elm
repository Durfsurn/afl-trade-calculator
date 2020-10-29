module Teams exposing (..)


type alias Team =
    { name : String
    , players : List Player
    , picks : List Int
    }


type alias Player =
    { name : String
    , rat : Float
    , pos : String
    , team : String
    , id : String
    }


retiredPlayers : List String
retiredPlayers =
    [ "Bryce Gibbs"
    , "Riley Knight"
    , "Ayce Taylor"
    , "Patrick Wilson"
    , "Jacob Allison"
    , "Allen Christensen"
    , "Matt Eagles"
    , "Corey Lyons"
    , "Sam Skinner"
    , "Toby Wooller"
    , "Hugh Goddard"
    , "Matthew Kreuzer"
    , "Darcy Lang"
    , "Finbar O'Dwyer"
    , "Ben Silvagni"
    , "Kade Simpson"
    , "Tim Broomhead"
    , "Lynden Dunn"
    , "Ben Reid "
    , "Matthew Scharenberg"
    , "Travis Varcoe"
    , "Josh Begley"
    , "Tom Bellchambers"
    , "Noah Gown"
    , "Mitch Hibberd"
    , "Conor McKenna "
    , "Shaun McKernan"
    , "Kobe Mutch"
    , "Isaiah Butters"
    , "Jason Carter"
    , "Hugh Dixon"
    , "Brandon Matera"
    , "Cam McCarthy"
    , "Tom North"
    , "Dillon O'Reilly"
    , "Jarvis Pina"
    , "Gary Ablett"
    , "Jacob Kennerley"
    , "James Parsons"
    , "Blake Schlensog"
    , "Jacob Dawson"
    , "Corey Ellis"
    , "Sam Fletcher"
    , "Pearce Hanley"
    , "Jacob Heron"
    , "George Horlin-Smith"
    , "Jesse Joyce"
    , "Anthony Miles"
    , "Mitch Riordan"
    , "Josh Schoenfeld"
    , "Sam Jacobs"
    , "Heath Shaw"
    , "Tom Sheridan"
    , "James Frawley"
    , "Conor Glass"
    , "Will Golds"
    , "Ricky Henderson"
    , "Darren Minchington"
    , "Paul Puopolo"
    , "Jackson Ross"
    , "Ben Stratton"
    , "Harley Bennell"
    , "Kyle Dunkley"
    , "Corey Wagner"
    , "Josh Wagner"
    , "Paul Ahern"
    , "Joel Crocker"
    , "Majak Daw"
    , "Sam Durdin"
    , "Lachie Hosie"
    , "Ben Jacobs"
    , "Jamie Macmillan"
    , "Tom Murphy"
    , "Jasper Pittard"
    , "Marley Williams"
    , "Mason Wood"
    , "Joe Atley"
    , "Wylie Buzza"
    , "Tobin Cox"
    , "Brad Ebert"
    , "Riley Grundy"
    , "Cam Sutcliffe"
    , "Jack Watts"
    , "Justin Westhoff"
    , "Luke English"
    , "Fraser Turner"
    , "Ryan Abbott"
    , "Logan Austin"
    , "Jack Bell"
    , "Nathan Brown"
    , "Doulton Langlands"
    , "Jack Mayo"
    , "Michael Knoll"
    , "Jack Maibaum"
    , "Harry Reynolds"
    , "Brady Rowles"
    , "Ryley Stoddart"
    , "Hamish Brayshaw"
    , "Mitch O'Neill"
    , "Nic Reid"
    , "Will Schofield"
    , "Anthony Treacy"
    , "Francis Watson"
    , "Tory Dickson"
    , "Alex Rance"
    ]


positionPretty : String -> String
positionPretty s =
    case s of
        "KEY_DEFENDER" ->
            "Key Def"

        "KEY_FORWARD" ->
            "Key Fwd"

        "MEDIUM_DEFENDER" ->
            "Medium Def"

        "MEDIUM_FORWARD" ->
            "Medium Fwd"

        "MIDFIELDER_FORWARD" ->
            "Midfielder Fwd"

        "MIDFIELDER" ->
            "Midfielder"

        "RUCK" ->
            "Ruck"

        _ ->
            s


shortNameToLong : String -> String
shortNameToLong s =
    case s of
        "AC" ->
            "Adelaide Crows"

        "BL" ->
            "Brisbane Lions"

        "CB" ->
            "Carlton Blues"

        "CM" ->
            "Collingwood Magpies"

        "EB" ->
            "Essendon Bombers"

        "FD" ->
            "Fremantle Dockers"

        "GC" ->
            "Geelong Cats"

        "GCS" ->
            "Gold Coast Suns"

        "GWSG" ->
            "Greater Western Sydney Giants"

        "HH" ->
            "Hawthorn Hawks"

        "MD" ->
            "Melbourne Demons"

        "NMK" ->
            "North Melbourne Kangaroos"

        "PAP" ->
            "Port Adelaide Power"

        "RT" ->
            "Richmond Tigers"

        "SKS" ->
            "St Kilda Saints"

        "SS" ->
            "Sydney Swans"

        "WCE" ->
            "West Coast Eagles"

        "WB" ->
            "Western Bulldogs"

        _ ->
            "unidentified team"


teams : List Team
teams =
    [ { name = "Adelaide Crows"
      , players = adelaideCrowsPlayers
      , picks = adelaideCrowsPicks
      }
    , { name = "Brisbane Lions"
      , players = brisbaneLionsPlayers
      , picks = brisbaneLionsPicks
      }
    , { name = "Carlton Blues"
      , players = carltonBluesPlayers
      , picks = carltonBluesPicks
      }
    , { name = "Collingwood Magpies"
      , players = collingwoodMagpiesPlayers
      , picks = collingwoodMagpiesPicks
      }
    , { name = "Essendon Bombers"
      , players = essendonBombersPlayers
      , picks = essendonBombersPicks
      }
    , { name = "Fremantle Dockers"
      , players = fremantleDockersPlayers
      , picks = fremantleDockersPicks
      }
    , { name = "Geelong Cats"
      , players = geelongCatsPlayers
      , picks = geelongCatsPicks
      }
    , { name = "Gold Coast Suns"
      , players = goldCoastSunsPlayers
      , picks = goldCoastSunsPicks
      }
    , { name = "Greater Western Sydney Giants"
      , players = greaterWesternSydneyGiantsPlayers
      , picks = greaterWesternSydneyGiantsPicks
      }
    , { name = "Hawthorn Hawks"
      , players = hawthornHawksPlayers
      , picks = hawthornHawksPicks
      }
    , { name = "Melbourne Demons"
      , players = melbourneDemonsPlayers
      , picks = melbourneDemonsPicks
      }
    , { name = "North Melbourne Kangaroos"
      , players = northMelbourneKangaroosPlayers
      , picks = northMelbourneKangaroosPicks
      }
    , { name = "Port Adelaide Power"
      , players = portAdelaidePowerPlayers
      , picks = portAdelaidePowerPicks
      }
    , { name = "Richmond Tigers"
      , players = richmondTigersPlayers
      , picks = richmondTigersPicks
      }
    , { name = "St Kilda Saints"
      , players = stKildaSaintsPlayers
      , picks = stKildaSaintsPicks
      }
    , { name = "Sydney Swans"
      , players = sydneySwansPlayers
      , picks = sydneySwansPicks
      }
    , { name = "West Coast Eagles"
      , players = westCoastEaglesPlayers
      , picks = westCoastEaglesPicks
      }
    , { name = "Western Bulldogs"
      , players = westernBulldogsPlayers
      , picks = westernBulldogsPicks
      }
    ]


adelaideCrowsPlayers : List Player
adelaideCrowsPlayers =
    [ { id = "CD_I1000908", name = "Myles Poholke", team = "Adelaide Crows", rat = 33.1, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1000932", name = "Tom Doedee", team = "Adelaide Crows", rat = 117.7, pos = "KEY_DEFENDER" }, { id = "CD_I1000998", name = "Lachlan Murphy", team = "Adelaide Crows", rat = 242.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I1004995", name = "Jordon Butts", team = "Adelaide Crows", rat = 9.3, pos = "KEY_DEFENDER" }, { id = "CD_I1005199", name = "Elliott Himmelberg", team = "Adelaide Crows", rat = 132.7, pos = "KEY_FORWARD" }, { id = "CD_I1006136", name = "Lachlan Sholl", team = "Adelaide Crows", rat = 45.9, pos = "MIDFIELDER" }, { id = "CD_I1006203", name = "Chayce Jones", team = "Adelaide Crows", rat = 121.7, pos = "MIDFIELDER" }, { id = "CD_I1008159", name = "Will Hamill", team = "Adelaide Crows", rat = 25.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008185", name = "Ned McHenry", team = "Adelaide Crows", rat = 26.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008543", name = "Harry Schoenberg", team = "Adelaide Crows", rat = 51.6, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1008752", name = "Kieran Strachan", team = "Adelaide Crows", rat = 3.0, pos = "RUCK" }, { id = "CD_I1009201", name = "Fischer McAsey", team = "Adelaide Crows", rat = 31.0, pos = "KEY_DEFENDER" }, { id = "CD_I1011254", name = "Ronin O'Connor", team = "Adelaide Crows", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1011981", name = "Josh Worrell", team = "Adelaide Crows", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1016214", name = "Ayce Taylor", team = "Adelaide Crows", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1018075", name = "Lachlan Gollant", team = "Adelaide Crows", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I250362", name = "David Mackay", team = "Adelaide Crows", rat = 266.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I250417", name = "Bryce Gibbs", team = "Adelaide Crows", rat = 174.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I270938", name = "Tom Lynch", team = "Adelaide Crows", rat = 342.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I270963", name = "Rory Sloane", team = "Adelaide Crows", rat = 459.1, pos = "MIDFIELDER" }, { id = "CD_I280506", name = "Taylor Walker", team = "Adelaide Crows", rat = 318.7, pos = "KEY_FORWARD" }, { id = "CD_I280934", name = "Daniel Talia", team = "Adelaide Crows", rat = 282.9, pos = "KEY_DEFENDER" }, { id = "CD_I290228", name = "Kyle Hartigan", team = "Adelaide Crows", rat = 158.2, pos = "KEY_DEFENDER" }, { id = "CD_I291748", name = "Brodie Smith", team = "Adelaide Crows", rat = 367.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I293193", name = "Luke Brown", team = "Adelaide Crows", rat = 228.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I293222", name = "Rory Laird", team = "Adelaide Crows", rat = 351.3, pos = "MIDFIELDER" }, { id = "CD_I294307", name = "Brad Crouch", team = "Adelaide Crows", rat = 325.3, pos = "MIDFIELDER" }, { id = "CD_I294472", name = "Rory Atkins", team = "Adelaide Crows", rat = 249.7, pos = "MIDFIELDER" }, { id = "CD_I294733", name = "Paul Seedsman", team = "Adelaide Crows", rat = 228.3, pos = "MIDFIELDER" }, { id = "CD_I295103", name = "Riley Knight", team = "Adelaide Crows", rat = 125.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I295964", name = "Patrick Wilson", team = "Adelaide Crows", rat = 3.5, pos = "MIDFIELDER" }, { id = "CD_I297401", name = "Matt Crouch", team = "Adelaide Crows", rat = 355.6, pos = "MIDFIELDER" }, { id = "CD_I297473", name = "Jake Kelly", team = "Adelaide Crows", rat = 225.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I297523", name = "Reilly O'Brien", team = "Adelaide Crows", rat = 391.0, pos = "RUCK" }, { id = "CD_I298417", name = "Ben Davis", team = "Adelaide Crows", rat = 6.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I298470", name = "Shane McAdam", team = "Adelaide Crows", rat = 99.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I990882", name = "Wayne Milera", team = "Adelaide Crows", rat = 204.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I991773", name = "Billy Frampton", team = "Adelaide Crows", rat = 28.3, pos = "KEY_FORWARD" }, { id = "CD_I993796", name = "Ben Crocker", team = "Adelaide Crows", rat = 27.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I993946", name = "Ben Keays", team = "Adelaide Crows", rat = 144.3, pos = "MIDFIELDER" }, { id = "CD_I997206", name = "Andrew McPherson", team = "Adelaide Crows", rat = 62.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I997230", name = "Tyson Stengle", team = "Adelaide Crows", rat = 93.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I998106", name = "Jordan Gallucci", team = "Adelaide Crows", rat = 109.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I999331", name = "Darcy Fogarty", team = "Adelaide Crows", rat = 101.4, pos = "KEY_FORWARD" } ]


brisbaneLionsPlayers : List Player
brisbaneLionsPlayers =
    [ { id = "CD_I1000978", name = "Hugh McCluggage", team = "Brisbane Lions", rat = 393.6, pos = "MIDFIELDER" }, { id = "CD_I1002235", name = "Cam Rayner", team = "Brisbane Lions", rat = 212.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002244", name = "Toby Wooller", team = "Brisbane Lions", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1002312", name = "Zac Bailey", team = "Brisbane Lions", rat = 235.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1002347", name = "Jack Payne", team = "Brisbane Lions", rat = 27.1, pos = "KEY_DEFENDER" }, { id = "CD_I1002351", name = "Connor Ballenden", team = "Brisbane Lions", rat = 7.0, pos = "KEY_FORWARD" }, { id = "CD_I1002401", name = "Brandon Starcevich", team = "Brisbane Lions", rat = 115.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004863", name = "Mitchell Hinge", team = "Brisbane Lions", rat = 31.0, pos = "MIDFIELDER" }, { id = "CD_I1005053", name = "Noah Answerth", team = "Brisbane Lions", rat = 182.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1005521", name = "Oscar McInerney", team = "Brisbane Lions", rat = 284.3, pos = "RUCK" }, { id = "CD_I1006033", name = "Ely Smith", team = "Brisbane Lions", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1006059", name = "Keidean Coleman", team = "Brisbane Lions", rat = 21.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006085", name = "Connor McFadyen", team = "Brisbane Lions", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006100", name = "Thomas Berry", team = "Brisbane Lions", rat = 27.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006150", name = "Tom Joyce", team = "Brisbane Lions", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1009242", name = "Brock Smith", team = "Brisbane Lions", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009385", name = "Deven Robertson", team = "Brisbane Lions", rat = 3.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I1009386", name = "Jaxon Prior", team = "Brisbane Lions", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1013532", name = "Tom Fullarton", team = "Brisbane Lions", rat = 5.1, pos = "KEY_FORWARD" }, { id = "CD_I1013978", name = "James Madden", team = "Brisbane Lions", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I240302", name = "Grant Birchall", team = "Brisbane Lions", rat = 106.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I261224", name = "Dayne Zorko", team = "Brisbane Lions", rat = 441.9, pos = "MIDFIELDER" }, { id = "CD_I271072", name = "Daniel Rich", team = "Brisbane Lions", rat = 380.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I280763", name = "Stefan Martin", team = "Brisbane Lions", rat = 361.1, pos = "RUCK" }, { id = "CD_I280918", name = "Allen Christensen", team = "Brisbane Lions", rat = 164.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I290311", name = "Mitch Robinson", team = "Brisbane Lions", rat = 364.2, pos = "MIDFIELDER" }, { id = "CD_I290326", name = "Matt Eagles", team = "Brisbane Lions", rat = 0.9, pos = "RUCK" }, { id = "CD_I291548", name = "Ryan Lester", team = "Brisbane Lions", rat = 197.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I293479", name = "Cameron Ellis-Yolmen", team = "Brisbane Lions", rat = 216.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I293535", name = "Lachie Neale", team = "Brisbane Lions", rat = 543.8, pos = "MIDFIELDER" }, { id = "CD_I293581", name = "Lincoln McCarthy", team = "Brisbane Lions", rat = 247.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I293716", name = "Jarryd Lyons", team = "Brisbane Lions", rat = 491.4, pos = "MIDFIELDER" }, { id = "CD_I294168", name = "Marcus Adams", team = "Brisbane Lions", rat = 69.2, pos = "KEY_DEFENDER" }, { id = "CD_I296269", name = "Darcy Gardiner", team = "Brisbane Lions", rat = 253.3, pos = "KEY_DEFENDER" }, { id = "CD_I297504", name = "Daniel McStay", team = "Brisbane Lions", rat = 244.6, pos = "KEY_FORWARD" }, { id = "CD_I298437", name = "Callum Ah Chee", team = "Brisbane Lions", rat = 113.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I990609", name = "Charlie Cameron", team = "Brisbane Lions", rat = 335.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I992752", name = "Archie Smith", team = "Brisbane Lions", rat = 31.2, pos = "RUCK" }, { id = "CD_I993828", name = "Rhys Mathieson", team = "Brisbane Lions", rat = 103.6, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I993836", name = "Sam Skinner", team = "Brisbane Lions", rat = -5.7, pos = "KEY_FORWARD" }, { id = "CD_I993953", name = "Eric Hipwood", team = "Brisbane Lions", rat = 231.8, pos = "KEY_FORWARD" }, { id = "CD_I994047", name = "Cedric Cox", team = "Brisbane Lions", rat = 6.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I996059", name = "Harris Andrews", team = "Brisbane Lions", rat = 414.0, pos = "KEY_DEFENDER" }, { id = "CD_I998105", name = "Corey Lyons", team = "Brisbane Lions", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I998128", name = "Alex Witherden", team = "Brisbane Lions", rat = 184.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998133", name = "Jarrod Berry", team = "Brisbane Lions", rat = 336.4, pos = "MIDFIELDER" }, { id = "CD_I998268", name = "Jacob Allison", team = "Brisbane Lions", rat = 9.9, pos = "MIDFIELDER" } ]


carltonBluesPlayers : List Player
carltonBluesPlayers =
    [ { id = "CD_I1000953", name = "Harry McKay", team = "Carlton Blues", rat = 223.2, pos = "KEY_FORWARD" }, { id = "CD_I1001028", name = "Jack Silvagni", team = "Carlton Blues", rat = 162.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1001398", name = "Matthew Kennedy", team = "Carlton Blues", rat = 149.9, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1002256", name = "Paddy Dow", team = "Carlton Blues", rat = 206.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1002259", name = "Lochie O'Brien", team = "Carlton Blues", rat = 100.0, pos = "MIDFIELDER" }, { id = "CD_I1002938", name = "Josh Honey", team = "Carlton Blues", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002942", name = "Sam Ramsay", team = "Carlton Blues", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1004912", name = "Tom De Koning", team = "Carlton Blues", rat = 47.8, pos = "RUCK" }, { id = "CD_I1006094", name = "Sam Walsh", team = "Carlton Blues", rat = 330.3, pos = "MIDFIELDER" }, { id = "CD_I1008154", name = "Matthew Cottrell", team = "Carlton Blues", rat = 22.2, pos = "MIDFIELDER" }, { id = "CD_I1008312", name = "Liam Stocker", team = "Carlton Blues", rat = 15.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009241", name = "Brodie Kemp", team = "Carlton Blues", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1011861", name = "Fraser Phillips", team = "Carlton Blues", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1011924", name = "Finbar O'Dwyer", team = "Carlton Blues", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1011929", name = "Sam Philp", team = "Carlton Blues", rat = 12.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I1011949", name = "Ben Silvagni", team = "Carlton Blues", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1013973", name = "Matthew Owies", team = "Carlton Blues", rat = 3.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I230202", name = "Kade Simpson", team = "Carlton Blues", rat = 269.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I240060", name = "Eddie Betts", team = "Carlton Blues", rat = 300.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I250105", name = "Marc Murphy", team = "Carlton Blues", rat = 323.5, pos = "MIDFIELDER" }, { id = "CD_I261299", name = "Matthew Kreuzer", team = "Carlton Blues", rat = 198.5, pos = "RUCK" }, { id = "CD_I270146", name = "Ed Curnow", team = "Carlton Blues", rat = 383.5, pos = "MIDFIELDER" }, { id = "CD_I281078", name = "Liam Jones", team = "Carlton Blues", rat = 276.7, pos = "KEY_DEFENDER" }, { id = "CD_I281124", name = "Levi Casboult", team = "Carlton Blues", rat = 252.2, pos = "KEY_FORWARD" }, { id = "CD_I291773", name = "Jack Newnes", team = "Carlton Blues", rat = 261.3, pos = "MIDFIELDER" }, { id = "CD_I294624", name = "Lachie Plowman", team = "Carlton Blues", rat = 259.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295518", name = "Sam Docherty", team = "Carlton Blues", rat = 121.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I296190", name = "Jack Martin", team = "Carlton Blues", rat = 221.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I296200", name = "Michael Gibbons", team = "Carlton Blues", rat = 239.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I296439", name = "Darcy Lang", team = "Carlton Blues", rat = 68.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I297255", name = "Mitch McGovern", team = "Carlton Blues", rat = 206.7, pos = "KEY_FORWARD" }, { id = "CD_I297907", name = "Nic Newman", team = "Carlton Blues", rat = 238.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298290", name = "Marc Pittonet", team = "Carlton Blues", rat = 151.0, pos = "RUCK" }, { id = "CD_I298302", name = "Caleb Marchbank", team = "Carlton Blues", rat = 119.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298316", name = "Hugh Goddard", team = "Carlton Blues", rat = 8.8, pos = "KEY_DEFENDER" }, { id = "CD_I990704", name = "Patrick Cripps", team = "Carlton Blues", rat = 490.0, pos = "MIDFIELDER" }, { id = "CD_I993795", name = "David Cuningham", team = "Carlton Blues", rat = 144.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I993832", name = "Jacob Weitering", team = "Carlton Blues", rat = 312.6, pos = "KEY_DEFENDER" }, { id = "CD_I994539", name = "Sam Petrevski-Seton", team = "Carlton Blues", rat = 308.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I996731", name = "Charlie Curnow", team = "Carlton Blues", rat = 149.0, pos = "KEY_FORWARD" }, { id = "CD_I998100", name = "Cameron Polson", team = "Carlton Blues", rat = 52.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998167", name = "Tom Williamson", team = "Carlton Blues", rat = 68.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998215", name = "Will Setterfield", team = "Carlton Blues", rat = 212.1, pos = "MIDFIELDER" }, { id = "CD_I998226", name = "Harrison Macreadie", team = "Carlton Blues", rat = 2.5, pos = "KEY_DEFENDER" }, { id = "CD_I998569", name = "Callum Moore", team = "Carlton Blues", rat = 1.7, pos = "KEY_FORWARD" }, { id = "CD_I999827", name = "Zac Fisher", team = "Carlton Blues", rat = 268.2, pos = "MEDIUM_FORWARD" } ]


collingwoodMagpiesPlayers : List Player
collingwoodMagpiesPlayers =
    [ { id = "CD_I1000072", name = "John Noble", team = "Collingwood Magpies", rat = 92.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1000960", name = "Max Lynch", team = "Collingwood Magpies", rat = 2.2, pos = "KEY_FORWARD" }, { id = "CD_I1001448", name = "Rupert Wills", team = "Collingwood Magpies", rat = 112.2, pos = "MIDFIELDER" }, { id = "CD_I1002240", name = "Jaidyn Stephenson", team = "Collingwood Magpies", rat = 281.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002770", name = "Callum L. Brown", team = "Collingwood Magpies", rat = 297.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I1003029", name = "Brayden Sier", team = "Collingwood Magpies", rat = 155.5, pos = "MIDFIELDER" }, { id = "CD_I1005013", name = "Flynn Appleby", team = "Collingwood Magpies", rat = 1.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I1005054", name = "Josh Daicos", team = "Collingwood Magpies", rat = 177.0, pos = "MIDFIELDER" }, { id = "CD_I1005107", name = "Nathan Murphy", team = "Collingwood Magpies", rat = 10.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008089", name = "Isaac Quaynor", team = "Collingwood Magpies", rat = 94.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008171", name = "Tyler Brown", team = "Collingwood Magpies", rat = 63.8, pos = "MIDFIELDER" }, { id = "CD_I1008285", name = "Will Kelly", team = "Collingwood Magpies", rat = 5.5, pos = "KEY_FORWARD" }, { id = "CD_I1008288", name = "Atu Bosenavulagi", team = "Collingwood Magpies", rat = 9.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I1009186", name = "Trent Bianco", team = "Collingwood Magpies", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009383", name = "Trey Ruscoe", team = "Collingwood Magpies", rat = 19.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I1010841", name = "Jack Madgen", team = "Collingwood Magpies", rat = 139.4, pos = "KEY_DEFENDER" }, { id = "CD_I1013974", name = "Mark Keane", team = "Collingwood Magpies", rat = 1.7, pos = "KEY_DEFENDER" }, { id = "CD_I1013975", name = "Anton Tohill", team = "Collingwood Magpies", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1015793", name = "Jay Rantall", team = "Collingwood Magpies", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I240232", name = "Ben Reid", team = "Collingwood Magpies", rat = 79.5, pos = "KEY_FORWARD" }, { id = "CD_I250290", name = "Travis Varcoe", team = "Collingwood Magpies", rat = 257.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I250548", name = "Lynden Dunn", team = "Collingwood Magpies", rat = 7.5, pos = "KEY_DEFENDER" }, { id = "CD_I260257", name = "Scott Pendlebury", team = "Collingwood Magpies", rat = 487.7, pos = "MIDFIELDER" }, { id = "CD_I270861", name = "Levi Greenwood", team = "Collingwood Magpies", rat = 157.2, pos = "MIDFIELDER" }, { id = "CD_I271001", name = "Dayne Beams", team = "Collingwood Magpies", rat = 140.6, pos = "MIDFIELDER" }, { id = "CD_I280012", name = "Jordan Roughead", team = "Collingwood Magpies", rat = 230.9, pos = "KEY_DEFENDER" }, { id = "CD_I280416", name = "Chris Mayne", team = "Collingwood Magpies", rat = 269.3, pos = "MIDFIELDER" }, { id = "CD_I280965", name = "Steele Sidebottom", team = "Collingwood Magpies", rat = 406.3, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I290289", name = "Josh Thomas", team = "Collingwood Magpies", rat = 269.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I291313", name = "Jeremy Howe", team = "Collingwood Magpies", rat = 308.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I291720", name = "Will Hoskin-Elliott", team = "Collingwood Magpies", rat = 253.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I291776", name = "Taylor Adams", team = "Collingwood Magpies", rat = 453.6, pos = "MIDFIELDER" }, { id = "CD_I291790", name = "Adam Treloar", team = "Collingwood Magpies", rat = 455.2, pos = "MIDFIELDER" }, { id = "CD_I291849", name = "Brody Mihocek", team = "Collingwood Magpies", rat = 314.4, pos = "KEY_FORWARD" }, { id = "CD_I293035", name = "Tim Broomhead", team = "Collingwood Magpies", rat = 4.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I293801", name = "Jamie Elliott", team = "Collingwood Magpies", rat = 234.8, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I293871", name = "Jack Crisp", team = "Collingwood Magpies", rat = 375.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I293957", name = "Brodie Grundy", team = "Collingwood Magpies", rat = 521.5, pos = "RUCK" }, { id = "CD_I295012", name = "Matthew Scharenberg", team = "Collingwood Magpies", rat = 58.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295444", name = "Tom Langdon", team = "Collingwood Magpies", rat = 171.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298288", name = "Darcy Moore", team = "Collingwood Magpies", rat = 325.2, pos = "KEY_DEFENDER" }, { id = "CD_I990291", name = "Darcy Cameron", team = "Collingwood Magpies", rat = 49.0, pos = "KEY_FORWARD" }, { id = "CD_I992010", name = "Brayden Maynard", team = "Collingwood Magpies", rat = 326.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I993797", name = "Tom Wilson", team = "Collingwood Magpies", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I994185", name = "Jordan De Goey", team = "Collingwood Magpies", rat = 342.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I996487", name = "Tom Phillips", team = "Collingwood Magpies", rat = 280.7, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I998647", name = "Mason Cox", team = "Collingwood Magpies", rat = 265.3, pos = "KEY_FORWARD" } ]


essendonBombersPlayers : List Player
essendonBombersPlayers =
    [ { id = "CD_I1001026", name = "Jordan Ridley", team = "Essendon Bombers", rat = 117.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004034", name = "Brandon Zerk-Thatcher", team = "Essendon Bombers", rat = 22.5, pos = "KEY_DEFENDER" }, { id = "CD_I1005577", name = "Sam Draper", team = "Essendon Bombers", rat = 14.3, pos = "RUCK" }, { id = "CD_I1005721", name = "Josh Begley", team = "Essendon Bombers", rat = 45.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006097", name = "Irving Mosquito", team = "Essendon Bombers", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006506", name = "Lachlan Johnson", team = "Essendon Bombers", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1008190", name = "Brayden Ham", team = "Essendon Bombers", rat = 66.9, pos = "MIDFIELDER" }, { id = "CD_I1009223", name = "Ned Cahill", team = "Essendon Bombers", rat = 12.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I1011755", name = "Harrison Jones", team = "Essendon Bombers", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1011864", name = "Noah Gown", team = "Essendon Bombers", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1011954", name = "Nick Bryan", team = "Essendon Bombers", rat = 0.0, pos = "RUCK" }, { id = "CD_I1016097", name = "Henry Crauford", team = "Essendon Bombers", rat = 0.0, pos = "RUCK" }, { id = "CD_I1018969", name = "Cian McBride", team = "Essendon Bombers", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1019156", name = "Ross McQuillan", team = "Essendon Bombers", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1020224", name = "Tom Hird", team = "Essendon Bombers", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I261320", name = "Tom Bellchambers", team = "Essendon Bombers", rat = 349.9, pos = "RUCK" }, { id = "CD_I270588", name = "Cale Hooker", team = "Essendon Bombers", rat = 305.2, pos = "KEY_DEFENDER" }, { id = "CD_I270935", name = "Michael Hurley", team = "Essendon Bombers", rat = 229.1, pos = "KEY_DEFENDER" }, { id = "CD_I270951", name = "David Zaharakis", team = "Essendon Bombers", rat = 276.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I280038", name = "Shaun McKernan", team = "Essendon Bombers", rat = 197.6, pos = "KEY_FORWARD" }, { id = "CD_I290629", name = "Dyson Heppell", team = "Essendon Bombers", rat = 364.8, pos = "MIDFIELDER" }, { id = "CD_I291771", name = "Devon Smith", team = "Essendon Bombers", rat = 266.3, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I291783", name = "Dylan Shiel", team = "Essendon Bombers", rat = 476.8, pos = "MIDFIELDER" }, { id = "CD_I291891", name = "Jacob Townsend", team = "Essendon Bombers", rat = 54.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I293884", name = "Jake Stringer", team = "Essendon Bombers", rat = 365.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I294068", name = "Andrew Phillips", team = "Essendon Bombers", rat = 94.4, pos = "RUCK" }, { id = "CD_I294092", name = "Anthony McDonald-Tipungwuti", team = "Essendon Bombers", rat = 389.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I294518", name = "Joe Daniher", team = "Essendon Bombers", rat = 32.5, pos = "KEY_FORWARD" }, { id = "CD_I294654", name = "James Stewart", team = "Essendon Bombers", rat = 4.9, pos = "KEY_FORWARD" }, { id = "CD_I295461", name = "Adam Saad", team = "Essendon Bombers", rat = 381.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295599", name = "Patrick Ambrose", team = "Essendon Bombers", rat = 114.8, pos = "KEY_DEFENDER" }, { id = "CD_I296334", name = "Orazio Fantasia", team = "Essendon Bombers", rat = 265.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I297406", name = "Tom Cutler", team = "Essendon Bombers", rat = 144.8, pos = "MIDFIELDER" }, { id = "CD_I297438", name = "Martin Gleeson", team = "Essendon Bombers", rat = 108.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298280", name = "Jayden Laverde", team = "Essendon Bombers", rat = 110.8, pos = "KEY_FORWARD" }, { id = "CD_I298407", name = "Mitchell Hibberd", team = "Essendon Bombers", rat = 13.1, pos = "MIDFIELDER" }, { id = "CD_I298630", name = "Kyle Langford", team = "Essendon Bombers", rat = 368.7, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I990606", name = "Will Snelling", team = "Essendon Bombers", rat = 114.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I990816", name = "Aaron Francis", team = "Essendon Bombers", rat = 255.5, pos = "KEY_DEFENDER" }, { id = "CD_I992016", name = "Zach Merrett", team = "Essendon Bombers", rat = 489.7, pos = "MIDFIELDER" }, { id = "CD_I993817", name = "Darcy Parish", team = "Essendon Bombers", rat = 356.1, pos = "MIDFIELDER" }, { id = "CD_I996232", name = "Matt Guelfi", team = "Essendon Bombers", rat = 190.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I997078", name = "Mason Redman", team = "Essendon Bombers", rat = 218.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I997846", name = "Conor McKenna", team = "Essendon Bombers", rat = 374.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998102", name = "Andrew McGrath", team = "Essendon Bombers", rat = 347.0, pos = "MIDFIELDER" }, { id = "CD_I998109", name = "Dylan Clarke", team = "Essendon Bombers", rat = 76.7, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I998212", name = "Kobe Mutch", team = "Essendon Bombers", rat = 0.1, pos = "MEDIUM_DEFENDER" } ]


fremantleDockersPlayers : List Player
fremantleDockersPlayers =
    [ { id = "CD_I1000860", name = "Lachie Schultz", team = "Fremantle Dockers", rat = 104.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I1000980", name = "Lloyd Meek", team = "Fremantle Dockers", rat = 0.0, pos = "RUCK" }, { id = "CD_I1002232", name = "Andrew Brayshaw", team = "Fremantle Dockers", rat = 315.7, pos = "MIDFIELDER" }, { id = "CD_I1002239", name = "Adam Cerra", team = "Fremantle Dockers", rat = 272.1, pos = "MIDFIELDER" }, { id = "CD_I1002353", name = "Mitch Crowden", team = "Fremantle Dockers", rat = 110.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002354", name = "Stefan Giro", team = "Fremantle Dockers", rat = 5.9, pos = "MIDFIELDER" }, { id = "CD_I1002372", name = "Hugh Dixon", team = "Fremantle Dockers", rat = 11.2, pos = "KEY_FORWARD" }, { id = "CD_I1003132", name = "Tom North", team = "Fremantle Dockers", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1004437", name = "Tobe Watson", team = "Fremantle Dockers", rat = 18.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004850", name = "Luke Valente", team = "Fremantle Dockers", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1005831", name = "Dillon O'Reilly", team = "Fremantle Dockers", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1005988", name = "Liam Henry", team = "Fremantle Dockers", rat = 5.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006151", name = "Jason Carter", team = "Fremantle Dockers", rat = 3.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1007854", name = "Jarvis Pina", team = "Fremantle Dockers", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009256", name = "Hayden Young", team = "Fremantle Dockers", rat = 18.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009381", name = "Leno Thomas", team = "Fremantle Dockers", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009420", name = "Caleb Serong", team = "Fremantle Dockers", rat = 112.5, pos = "MIDFIELDER" }, { id = "CD_I1013611", name = "Sam Sturt", team = "Fremantle Dockers", rat = 24.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I1017984", name = "Isaiah Butters", team = "Fremantle Dockers", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I240052", name = "David Mundy", team = "Fremantle Dockers", rat = 400.2, pos = "MIDFIELDER" }, { id = "CD_I280336", name = "Stephen Hill", team = "Fremantle Dockers", rat = 95.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I280988", name = "Travis Colyer", team = "Fremantle Dockers", rat = 162.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I281007", name = "Michael Walters", team = "Fremantle Dockers", rat = 453.1, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I290817", name = "Brandon Matera", team = "Fremantle Dockers", rat = 231.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I290823", name = "Reece Conca", team = "Fremantle Dockers", rat = 194.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I291570", name = "Nat Fyfe", team = "Fremantle Dockers", rat = 581.0, pos = "MIDFIELDER" }, { id = "CD_I293854", name = "Matt Taberner", team = "Fremantle Dockers", rat = 205.6, pos = "KEY_FORWARD" }, { id = "CD_I294125", name = "Nathan Wilson", team = "Fremantle Dockers", rat = 226.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295067", name = "James Aish", team = "Fremantle Dockers", rat = 237.7, pos = "MIDFIELDER" }, { id = "CD_I295222", name = "Joel Hamling", team = "Fremantle Dockers", rat = 217.0, pos = "KEY_DEFENDER" }, { id = "CD_I296294", name = "Blake Acres", team = "Fremantle Dockers", rat = 251.3, pos = "MIDFIELDER" }, { id = "CD_I296324", name = "Jesse Hogan", team = "Fremantle Dockers", rat = 89.6, pos = "KEY_FORWARD" }, { id = "CD_I296371", name = "Brett Bewley", team = "Fremantle Dockers", rat = 121.5, pos = "MIDFIELDER" }, { id = "CD_I298409", name = "Alex Pearce", team = "Fremantle Dockers", rat = 111.9, pos = "KEY_DEFENDER" }, { id = "CD_I298450", name = "Connor Blakely", team = "Fremantle Dockers", rat = 112.4, pos = "MIDFIELDER" }, { id = "CD_I990740", name = "Rory Lobb", team = "Fremantle Dockers", rat = 363.0, pos = "RUCK" }, { id = "CD_I992059", name = "Sam Switkowski", team = "Fremantle Dockers", rat = 174.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I993816", name = "Darcy Tucker", team = "Fremantle Dockers", rat = 256.7, pos = "MIDFIELDER" }, { id = "CD_I995192", name = "Cam McCarthy", team = "Fremantle Dockers", rat = 123.4, pos = "MIDFIELDER" }, { id = "CD_I996580", name = "Ethan Hughes", team = "Fremantle Dockers", rat = 236.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I997033", name = "Brennan Cox", team = "Fremantle Dockers", rat = 203.8, pos = "KEY_DEFENDER" }, { id = "CD_I997933", name = "Griffin Logue", team = "Fremantle Dockers", rat = 124.3, pos = "KEY_DEFENDER" }, { id = "CD_I998115", name = "Taylin Duman", team = "Fremantle Dockers", rat = 204.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998145", name = "Sean Darcy", team = "Fremantle Dockers", rat = 266.3, pos = "RUCK" }, { id = "CD_I998180", name = "Bailey Banfield", team = "Fremantle Dockers", rat = 108.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I998659", name = "Luke Ryan", team = "Fremantle Dockers", rat = 340.2, pos = "KEY_DEFENDER" }, { id = "CD_I999321", name = "Michael Frederick", team = "Fremantle Dockers", rat = 27.0, pos = "MEDIUM_FORWARD" } ]


geelongCatsPlayers : List Player
geelongCatsPlayers =
    [ { id = "CD_I1000937", name = "Jack Henry", team = "Geelong Cats", rat = 236.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1002220", name = "Esava Ratugolea", team = "Geelong Cats", rat = 200.1, pos = "KEY_FORWARD" }, { id = "CD_I1002228", name = "Lachie Fogarty", team = "Geelong Cats", rat = 48.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002242", name = "Charlie Constable", team = "Geelong Cats", rat = 61.1, pos = "MIDFIELDER" }, { id = "CD_I1004681", name = "Jacob Kennerley", team = "Geelong Cats", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1004870", name = "Zach Guthrie", team = "Geelong Cats", rat = 21.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004938", name = "Gryan Miers", team = "Geelong Cats", rat = 257.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I1004940", name = "Sam Simpson", team = "Geelong Cats", rat = 68.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1004948", name = "Cooper Stephens", team = "Geelong Cats", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1006101", name = "Oscar Brownless", team = "Geelong Cats", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1006152", name = "Jordan Clark", team = "Geelong Cats", rat = 137.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1007102", name = "Mark O'Connor", team = "Geelong Cats", rat = 239.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008202", name = "Blake Schlensog", team = "Geelong Cats", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1008603", name = "Cameron Taheny", team = "Geelong Cats", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008940", name = "Ben Jarvis", team = "Geelong Cats", rat = 1.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I1009229", name = "Sam De Koning", team = "Geelong Cats", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1013977", name = "Stefan Okunbor", team = "Geelong Cats", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1017255", name = "Francis Evans", team = "Geelong Cats", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I220001", name = "Gary Ablett", team = "Geelong Cats", rat = 443.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I250321", name = "Joel Selwood", team = "Geelong Cats", rat = 381.2, pos = "MIDFIELDER" }, { id = "CD_I261497", name = "Harry Taylor", team = "Geelong Cats", rat = 268.8, pos = "KEY_DEFENDER" }, { id = "CD_I261510", name = "Tom Hawkins", team = "Geelong Cats", rat = 383.7, pos = "KEY_FORWARD" }, { id = "CD_I270326", name = "Lachie Henderson", team = "Geelong Cats", rat = 143.0, pos = "KEY_DEFENDER" }, { id = "CD_I270912", name = "Jack Steven", team = "Geelong Cats", rat = 155.6, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I270917", name = "Patrick Dangerfield", team = "Geelong Cats", rat = 532.0, pos = "MIDFIELDER" }, { id = "CD_I280317", name = "Rhys Stanley", team = "Geelong Cats", rat = 340.9, pos = "RUCK" }, { id = "CD_I281065", name = "Mitch Duncan", team = "Geelong Cats", rat = 345.0, pos = "MIDFIELDER" }, { id = "CD_I290550", name = "Cameron Guthrie", team = "Geelong Cats", rat = 324.1, pos = "MIDFIELDER" }, { id = "CD_I291357", name = "Gary Rohan", team = "Geelong Cats", rat = 278.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I291526", name = "Luke Dahlhaus", team = "Geelong Cats", rat = 282.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I291800", name = "Tom Stewart", team = "Geelong Cats", rat = 251.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I292511", name = "Zach Tuohy", team = "Geelong Cats", rat = 263.8, pos = "MIDFIELDER" }, { id = "CD_I293883", name = "Jed Bews", team = "Geelong Cats", rat = 233.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I294199", name = "Sam Menegola", team = "Geelong Cats", rat = 337.7, pos = "MIDFIELDER" }, { id = "CD_I294828", name = "Josh Jenkins", team = "Geelong Cats", rat = 126.7, pos = "RUCK" }, { id = "CD_I296291", name = "Jake Kolodjashnij", team = "Geelong Cats", rat = 169.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I296733", name = "Mark Blicavs", team = "Geelong Cats", rat = 369.6, pos = "KEY_DEFENDER" }, { id = "CD_I298211", name = "Darcy Fort", team = "Geelong Cats", rat = 80.8, pos = "RUCK" }, { id = "CD_I298336", name = "Nakia Cockatoo", team = "Geelong Cats", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I298419", name = "Brandan Parfitt", team = "Geelong Cats", rat = 303.1, pos = "MIDFIELDER" }, { id = "CD_I993798", name = "James Parsons", team = "Geelong Cats", rat = 43.3, pos = "MIDFIELDER" }, { id = "CD_I994386", name = "Tom Atkins", team = "Geelong Cats", rat = 270.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I997254", name = "Nathan Kreuger", team = "Geelong Cats", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I999326", name = "Brad Close", team = "Geelong Cats", rat = 40.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I999382", name = "Jake Tarca", team = "Geelong Cats", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I999824", name = "Quinton Narkle", team = "Geelong Cats", rat = 85.9, pos = "MIDFIELDER" } ]


goldCoastSunsPlayers : List Player
goldCoastSunsPlayers =
    [ { id = "CD_I1000044", name = "Jez McLennan", team = "Gold Coast Suns", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1000068", name = "Chris Burgess", team = "Gold Coast Suns", rat = 94.0, pos = "KEY_DEFENDER" }, { id = "CD_I1001195", name = "Izak Rankine", team = "Gold Coast Suns", rat = 105.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002328", name = "Jacob Heron", team = "Gold Coast Suns", rat = 38.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002331", name = "Jacob Dawson", team = "Gold Coast Suns", rat = 33.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004095", name = "Jack Lukosius", team = "Gold Coast Suns", rat = 243.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1005547", name = "Josh Corbett", team = "Gold Coast Suns", rat = 57.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1005986", name = "Malcolm Rosas", team = "Gold Coast Suns", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006087", name = "Caleb Graham", team = "Gold Coast Suns", rat = 57.5, pos = "KEY_DEFENDER" }, { id = "CD_I1006108", name = "Mitch Riordan", team = "Gold Coast Suns", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1006110", name = "Sam Fletcher", team = "Gold Coast Suns", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1006144", name = "Ben King", team = "Gold Coast Suns", rat = 157.9, pos = "KEY_FORWARD" }, { id = "CD_I1007881", name = "Wil Powell", team = "Gold Coast Suns", rat = 196.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008454", name = "Connor Budarick", team = "Gold Coast Suns", rat = 68.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008882", name = "Charlie Ballard", team = "Gold Coast Suns", rat = 228.6, pos = "KEY_DEFENDER" }, { id = "CD_I1009199", name = "Noah Anderson", team = "Gold Coast Suns", rat = 141.8, pos = "MIDFIELDER" }, { id = "CD_I1009208", name = "Matt Rowell", team = "Gold Coast Suns", rat = 69.9, pos = "MIDFIELDER" }, { id = "CD_I1009260", name = "Sam Flanders", team = "Gold Coast Suns", rat = 24.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1009334", name = "Matt Conroy", team = "Gold Coast Suns", rat = 0.0, pos = "RUCK" }, { id = "CD_I1009380", name = "Jeremy Sharp", team = "Gold Coast Suns", rat = 6.6, pos = "MIDFIELDER" }, { id = "CD_I1016116", name = "Patrick Murtagh", team = "Gold Coast Suns", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1019157", name = "Luke Towey", team = "Gold Coast Suns", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I240254", name = "Jarrod Harbrow", team = "Gold Coast Suns", rat = 254.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I270512", name = "Pearce Hanley", team = "Gold Coast Suns", rat = 180.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I280722", name = "Zac Smith", team = "Gold Coast Suns", rat = 31.5, pos = "RUCK" }, { id = "CD_I281075", name = "Rory Thompson", team = "Gold Coast Suns", rat = 3.6, pos = "KEY_DEFENDER" }, { id = "CD_I281091", name = "Hugh Greenwood", team = "Gold Coast Suns", rat = 407.5, pos = "MIDFIELDER" }, { id = "CD_I290671", name = "Anthony Miles", team = "Gold Coast Suns", rat = 155.0, pos = "MIDFIELDER" }, { id = "CD_I290832", name = "David Swallow", team = "Gold Coast Suns", rat = 321.0, pos = "MIDFIELDER" }, { id = "CD_I291753", name = "Sam Day", team = "Gold Coast Suns", rat = 170.8, pos = "KEY_FORWARD" }, { id = "CD_I291964", name = "Jack Hombsch", team = "Gold Coast Suns", rat = 142.6, pos = "KEY_DEFENDER" }, { id = "CD_I291975", name = "Jarrod Witts", team = "Gold Coast Suns", rat = 418.5, pos = "RUCK" }, { id = "CD_I293255", name = "George Horlin-Smith", team = "Gold Coast Suns", rat = 33.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I293713", name = "Brandon Ellis", team = "Gold Coast Suns", rat = 314.2, pos = "MIDFIELDER" }, { id = "CD_I294013", name = "Sean Lemmens", team = "Gold Coast Suns", rat = 78.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I294643", name = "Alex Sexton", team = "Gold Coast Suns", rat = 277.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I295446", name = "Sam Collins", team = "Gold Coast Suns", rat = 253.0, pos = "KEY_DEFENDER" }, { id = "CD_I295942", name = "Jordan Murdoch", team = "Gold Coast Suns", rat = 121.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I297456", name = "Nick Holman", team = "Gold Coast Suns", rat = 214.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I298272", name = "Touk Miller", team = "Gold Coast Suns", rat = 366.5, pos = "MIDFIELDER" }, { id = "CD_I298289", name = "Peter Wright", team = "Gold Coast Suns", rat = 168.0, pos = "KEY_FORWARD" }, { id = "CD_I298524", name = "Lachie Weller", team = "Gold Coast Suns", rat = 359.9, pos = "MIDFIELDER" }, { id = "CD_I991953", name = "Corey Ellis", team = "Gold Coast Suns", rat = 26.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I993799", name = "Brayden Fiorini", team = "Gold Coast Suns", rat = 241.2, pos = "MIDFIELDER" }, { id = "CD_I996064", name = "Jesse Joyce", team = "Gold Coast Suns", rat = 169.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I996464", name = "Darcy MacPherson", team = "Gold Coast Suns", rat = 228.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I998129", name = "Will Brodie", team = "Gold Coast Suns", rat = 86.1, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I998130", name = "Ben Ainsworth", team = "Gold Coast Suns", rat = 210.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I998260", name = "Jack Bowes", team = "Gold Coast Suns", rat = 309.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998511", name = "Josh Schoenfeld", team = "Gold Coast Suns", rat = 15.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I999715", name = "Jy Farrar", team = "Gold Coast Suns", rat = 7.0, pos = "MEDIUM_FORWARD" } ]


greaterWesternSydneyGiantsPlayers : List Player
greaterWesternSydneyGiantsPlayers =
    [ { id = "CD_I1001396", name = "Isaac Cumming", team = "Greater Western Sydney Giants", rat = 41.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1002251", name = "Brent Daniels", team = "Greater Western Sydney Giants", rat = 276.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002296", name = "Nick Shipley", team = "Greater Western Sydney Giants", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1004286", name = "Zac Langdon", team = "Greater Western Sydney Giants", rat = 153.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I1005247", name = "Sam Taylor", team = "Greater Western Sydney Giants", rat = 258.0, pos = "KEY_DEFENDER" }, { id = "CD_I1006103", name = "Jye Caldwell", team = "Greater Western Sydney Giants", rat = 42.6, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1006135", name = "Xavier O'Halloran", team = "Greater Western Sydney Giants", rat = 8.7, pos = "MIDFIELDER" }, { id = "CD_I1006148", name = "Bobby Hill", team = "Greater Western Sydney Giants", rat = 59.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I1007238", name = "Jake Stein", team = "Greater Western Sydney Giants", rat = 29.4, pos = "KEY_DEFENDER" }, { id = "CD_I1008083", name = "Connor Idun", team = "Greater Western Sydney Giants", rat = 3.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008123", name = "Jake Riccardi", team = "Greater Western Sydney Giants", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1008436", name = "Kieren Briggs", team = "Greater Western Sydney Giants", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1009253", name = "Lachie Ash", team = "Greater Western Sydney Giants", rat = 39.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009528", name = "Tom Green", team = "Greater Western Sydney Giants", rat = 21.0, pos = "MIDFIELDER" }, { id = "CD_I1009708", name = "Jack Buckley", team = "Greater Western Sydney Giants", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1014038", name = "Callum M. Brown", team = "Greater Western Sydney Giants", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I240700", name = "Heath Shaw", team = "Greater Western Sydney Giants", rat = 241.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I261374", name = "Sam J. Reid", team = "Greater Western Sydney Giants", rat = 221.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I270811", name = "Sam Jacobs", team = "Greater Western Sydney Giants", rat = 278.0, pos = "RUCK" }, { id = "CD_I271015", name = "Matt de Boer", team = "Greater Western Sydney Giants", rat = 287.7, pos = "MIDFIELDER" }, { id = "CD_I280109", name = "Callan Ward", team = "Greater Western Sydney Giants", rat = 283.9, pos = "MIDFIELDER" }, { id = "CD_I280762", name = "Shane Mumford", team = "Greater Western Sydney Giants", rat = 226.0, pos = "RUCK" }, { id = "CD_I280804", name = "Phil Davis", team = "Greater Western Sydney Giants", rat = 300.9, pos = "KEY_DEFENDER" }, { id = "CD_I290314", name = "Lachlan Keeffe", team = "Greater Western Sydney Giants", rat = 117.9, pos = "KEY_DEFENDER" }, { id = "CD_I290675", name = "Daniel Lloyd", team = "Greater Western Sydney Giants", rat = 186.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I291509", name = "Adam Kennedy", team = "Greater Western Sydney Giants", rat = 248.0, pos = "MIDFIELDER" }, { id = "CD_I291792", name = "Tommy Sheridan", team = "Greater Western Sydney Giants", rat = 71.2, pos = "MIDFIELDER" }, { id = "CD_I291797", name = "Matt Buntine", team = "Greater Western Sydney Giants", rat = 89.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I291969", name = "Stephen Coniglio", team = "Greater Western Sydney Giants", rat = 451.1, pos = "MIDFIELDER" }, { id = "CD_I293845", name = "Jeremy Cameron", team = "Greater Western Sydney Giants", rat = 394.7, pos = "KEY_FORWARD" }, { id = "CD_I294305", name = "Lachie Whitfield", team = "Greater Western Sydney Giants", rat = 372.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I294508", name = "Aidan Corr", team = "Greater Western Sydney Giants", rat = 171.7, pos = "KEY_DEFENDER" }, { id = "CD_I294685", name = "Zac Williams", team = "Greater Western Sydney Giants", rat = 387.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295265", name = "Nick Haynes", team = "Greater Western Sydney Giants", rat = 320.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295344", name = "Toby Greene", team = "Greater Western Sydney Giants", rat = 336.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I296347", name = "Josh Kelly", team = "Greater Western Sydney Giants", rat = 457.9, pos = "MIDFIELDER" }, { id = "CD_I296984", name = "Tom Hutchesson", team = "Greater Western Sydney Giants", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I298111", name = "Jeremy Finlayson", team = "Greater Western Sydney Giants", rat = 354.2, pos = "KEY_FORWARD" }, { id = "CD_I993107", name = "Harry Himmelberg", team = "Greater Western Sydney Giants", rat = 333.4, pos = "KEY_FORWARD" }, { id = "CD_I993902", name = "Matt Flynn", team = "Greater Western Sydney Giants", rat = 0.0, pos = "RUCK" }, { id = "CD_I993903", name = "Jacob Hopper", team = "Greater Western Sydney Giants", rat = 364.7, pos = "MIDFIELDER" }, { id = "CD_I998172", name = "Tim Taranto", team = "Greater Western Sydney Giants", rat = 370.6, pos = "MIDFIELDER" }, { id = "CD_I998205", name = "Harry Perryman", team = "Greater Western Sydney Giants", rat = 273.6, pos = "MIDFIELDER" }, { id = "CD_I998225", name = "Zach Sproule", team = "Greater Western Sydney Giants", rat = -1.1, pos = "KEY_FORWARD" }, { id = "CD_I999309", name = "Jackson Hately", team = "Greater Western Sydney Giants", rat = 60.6, pos = "MIDFIELDER" } ]


hawthornHawksPlayers : List Player
hawthornHawksPlayers =
    [ { id = "CD_I1000887", name = "Mitch Lewis", team = "Hawthorn Hawks", rat = 111.7, pos = "KEY_FORWARD" }, { id = "CD_I1000959", name = "James Cousins", team = "Hawthorn Hawks", rat = 146.6, pos = "MIDFIELDER" }, { id = "CD_I1000963", name = "Harry Morrison", team = "Hawthorn Hawks", rat = 162.9, pos = "MIDFIELDER" }, { id = "CD_I1001024", name = "Ned Reeves", team = "Hawthorn Hawks", rat = 0.0, pos = "RUCK" }, { id = "CD_I1001043", name = "Oliver Hanrahan", team = "Hawthorn Hawks", rat = 84.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002222", name = "James Worpel", team = "Hawthorn Hawks", rat = 372.1, pos = "MIDFIELDER" }, { id = "CD_I1002590", name = "Mathew Walker", team = "Hawthorn Hawks", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1003547", name = "Conor Glass", team = "Hawthorn Hawks", rat = 62.5, pos = "MIDFIELDER" }, { id = "CD_I1004919", name = "Jackson Ross", team = "Hawthorn Hawks", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1004991", name = "Harry Jones", team = "Hawthorn Hawks", rat = 4.7, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1005150", name = "Emerson Jeka", team = "Hawthorn Hawks", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1006030", name = "Jacob Koschitzke", team = "Hawthorn Hawks", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1006128", name = "Will Golds", team = "Hawthorn Hawks", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1006159", name = "Damon Greaves", team = "Hawthorn Hawks", rat = 14.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1006314", name = "Dylan Moore", team = "Hawthorn Hawks", rat = 65.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I1007124", name = "Conor Nash", team = "Hawthorn Hawks", rat = 116.3, pos = "KEY_FORWARD" }, { id = "CD_I1008537", name = "Josh Morris", team = "Hawthorn Hawks", rat = 9.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008550", name = "Will Day", team = "Hawthorn Hawks", rat = 86.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009421", name = "Finn Maginness", team = "Hawthorn Hawks", rat = 4.2, pos = "MIDFIELDER" }, { id = "CD_I1011873", name = "Harry Pepper", team = "Hawthorn Hawks", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I210012", name = "Shaun Burgoyne", team = "Hawthorn Hawks", rat = 346.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I260288", name = "James Frawley", team = "Hawthorn Hawks", rat = 214.4, pos = "KEY_DEFENDER" }, { id = "CD_I260710", name = "Paul Puopolo", team = "Hawthorn Hawks", rat = 298.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I261323", name = "Ben McEvoy", team = "Hawthorn Hawks", rat = 439.7, pos = "RUCK" }, { id = "CD_I280471", name = "Ben Stratton", team = "Hawthorn Hawks", rat = 170.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I280737", name = "Liam Shiels", team = "Hawthorn Hawks", rat = 356.7, pos = "MIDFIELDER" }, { id = "CD_I280744", name = "Luke Breust", team = "Hawthorn Hawks", rat = 416.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I280969", name = "Tom Scully", team = "Hawthorn Hawks", rat = 247.8, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I290889", name = "Keegan Brooksby", team = "Hawthorn Hawks", rat = 4.1, pos = "RUCK" }, { id = "CD_I291201", name = "Ricky Henderson", team = "Hawthorn Hawks", rat = 350.0, pos = "MIDFIELDER" }, { id = "CD_I291327", name = "Jonathon Ceglar", team = "Hawthorn Hawks", rat = 279.7, pos = "RUCK" }, { id = "CD_I291351", name = "Jack Gunston", team = "Hawthorn Hawks", rat = 351.2, pos = "KEY_FORWARD" }, { id = "CD_I291821", name = "Jonathon Patton", team = "Hawthorn Hawks", rat = 15.5, pos = "KEY_FORWARD" }, { id = "CD_I291856", name = "Tom Mitchell", team = "Hawthorn Hawks", rat = 291.0, pos = "MIDFIELDER" }, { id = "CD_I291962", name = "Chad Wingard", team = "Hawthorn Hawks", rat = 372.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I293738", name = "Sam Frost", team = "Hawthorn Hawks", rat = 304.3, pos = "KEY_DEFENDER" }, { id = "CD_I294077", name = "Michael Hartley", team = "Hawthorn Hawks", rat = 49.2, pos = "KEY_DEFENDER" }, { id = "CD_I294613", name = "Jaeger O'Meara", team = "Hawthorn Hawks", rat = 356.8, pos = "MIDFIELDER" }, { id = "CD_I294877", name = "Isaac Smith", team = "Hawthorn Hawks", rat = 300.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I296041", name = "Tim O'Brien", team = "Hawthorn Hawks", rat = 232.2, pos = "KEY_FORWARD" }, { id = "CD_I296254", name = "Jarman Impey", team = "Hawthorn Hawks", rat = 223.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I296452", name = "Darren Minchington", team = "Hawthorn Hawks", rat = 33.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I297566", name = "James Sicily", team = "Hawthorn Hawks", rat = 360.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I992462", name = "Daniel Howe", team = "Hawthorn Hawks", rat = 164.2, pos = "MIDFIELDER" }, { id = "CD_I993794", name = "Blake Hardwick", team = "Hawthorn Hawks", rat = 270.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998114", name = "Jack Scrimshaw", team = "Hawthorn Hawks", rat = 171.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998390", name = "Changkuoth Jiath", team = "Hawthorn Hawks", rat = 34.0, pos = "MEDIUM_DEFENDER" } ]


melbourneDemonsPlayers : List Player
melbourneDemonsPlayers =
    [ { id = "CD_I1001438", name = "Bayley Fritsch", team = "Melbourne Demons", rat = 281.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1001449", name = "Mitch Hannan", team = "Melbourne Demons", rat = 132.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002282", name = "Charlie Spargo", team = "Melbourne Demons", rat = 128.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I1003546", name = "Joel Smith", team = "Melbourne Demons", rat = 42.7, pos = "KEY_DEFENDER" }, { id = "CD_I1004695", name = "Aaron Nietschke", team = "Melbourne Demons", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1005330", name = "Kade Chandler", team = "Melbourne Demons", rat = 9.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006106", name = "Kyle Dunkley", team = "Melbourne Demons", rat = 27.8, pos = "MIDFIELDER" }, { id = "CD_I1008139", name = "Toby Bedford", team = "Melbourne Demons", rat = 4.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008541", name = "Kysaiah Pickett", team = "Melbourne Demons", rat = 85.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008855", name = "Oskar Baker", team = "Melbourne Demons", rat = 76.2, pos = "MIDFIELDER" }, { id = "CD_I1008893", name = "Harrison Petty", team = "Melbourne Demons", rat = 46.7, pos = "KEY_FORWARD" }, { id = "CD_I1009378", name = "Trent Rivers", team = "Melbourne Demons", rat = 57.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1009399", name = "Luke Jackson", team = "Melbourne Demons", rat = 31.1, pos = "KEY_FORWARD" }, { id = "CD_I1013409", name = "James Jordon", team = "Melbourne Demons", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1014081", name = "Austin Bradtke", team = "Melbourne Demons", rat = 0.0, pos = "RUCK" }, { id = "CD_I250222", name = "Nathan Jones", team = "Melbourne Demons", rat = 281.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I280824", name = "Jake Melksham", team = "Melbourne Demons", rat = 250.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I281085", name = "Steven May", team = "Melbourne Demons", rat = 262.9, pos = "KEY_DEFENDER" }, { id = "CD_I281280", name = "Neville Jetta", team = "Melbourne Demons", rat = 131.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290160", name = "Michael Hibberd", team = "Melbourne Demons", rat = 243.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290528", name = "Max Gawn", team = "Melbourne Demons", rat = 602.7, pos = "RUCK" }, { id = "CD_I290622", name = "Mitch Brown", team = "Melbourne Demons", rat = 166.4, pos = "KEY_FORWARD" }, { id = "CD_I291533", name = "Tom McDonald", team = "Melbourne Demons", rat = 269.9, pos = "KEY_FORWARD" }, { id = "CD_I291594", name = "Harley Bennell", team = "Melbourne Demons", rat = 28.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I291819", name = "Adam Tomlinson", team = "Melbourne Demons", rat = 204.4, pos = "KEY_DEFENDER" }, { id = "CD_I291902", name = "Jack Viney", team = "Melbourne Demons", rat = 381.8, pos = "MIDFIELDER" }, { id = "CD_I294675", name = "Josh Wagner", team = "Melbourne Demons", rat = 113.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I296209", name = "Kade Kolodjashnij", team = "Melbourne Demons", rat = 29.6, pos = "MIDFIELDER" }, { id = "CD_I296359", name = "Christian Salem", team = "Melbourne Demons", rat = 292.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I296420", name = "Alex Neal-Bullen", team = "Melbourne Demons", rat = 263.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I297899", name = "James Harmes", team = "Melbourne Demons", rat = 346.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I297990", name = "Aaron vandenBerg", team = "Melbourne Demons", rat = 125.8, pos = "MIDFIELDER" }, { id = "CD_I298210", name = "Christian Petracca", team = "Melbourne Demons", rat = 499.1, pos = "MIDFIELDER" }, { id = "CD_I298264", name = "Ed Langdon", team = "Melbourne Demons", rat = 294.5, pos = "MIDFIELDER" }, { id = "CD_I298279", name = "Angus Brayshaw", team = "Melbourne Demons", rat = 370.6, pos = "MIDFIELDER" }, { id = "CD_I298281", name = "Jake Lever", team = "Melbourne Demons", rat = 202.5, pos = "KEY_DEFENDER" }, { id = "CD_I298390", name = "Jay Lockhart", team = "Melbourne Demons", rat = 113.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I992472", name = "Oscar McDonald", team = "Melbourne Demons", rat = 181.1, pos = "KEY_DEFENDER" }, { id = "CD_I992644", name = "Braydon Preuss", team = "Melbourne Demons", rat = 72.3, pos = "RUCK" }, { id = "CD_I993806", name = "Sam Weideman", team = "Melbourne Demons", rat = 187.3, pos = "KEY_FORWARD" }, { id = "CD_I993940", name = "Corey Wagner", team = "Melbourne Demons", rat = 70.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I994385", name = "Jayden Hunt", team = "Melbourne Demons", rat = 234.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I996692", name = "Marty Hore", team = "Melbourne Demons", rat = 103.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I996701", name = "Clayton Oliver", team = "Melbourne Demons", rat = 483.7, pos = "MIDFIELDER" }, { id = "CD_I999391", name = "Tom Sparrow", team = "Melbourne Demons", rat = 52.4, pos = "MIDFIELDER" } ]


northMelbourneKangaroosPlayers : List Player
northMelbourneKangaroosPlayers =
    [ { id = "CD_I1000905", name = "Tom Murphy", team = "North Melbourne Kangaroos", rat = 18.1, pos = "MIDFIELDER" }, { id = "CD_I1001017", name = "Nick Larkey", team = "North Melbourne Kangaroos", rat = 178.2, pos = "KEY_FORWARD" }, { id = "CD_I1001351", name = "Lachlan Hosie", team = "North Melbourne Kangaroos", rat = 10.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002143", name = "Ben McKay", team = "North Melbourne Kangaroos", rat = 106.2, pos = "KEY_DEFENDER" }, { id = "CD_I1002267", name = "Luke Davies-Uniacke", team = "North Melbourne Kangaroos", rat = 209.4, pos = "MIDFIELDER" }, { id = "CD_I1004894", name = "Aiden Bonar", team = "North Melbourne Kangaroos", rat = 67.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004965", name = "Tristan Xerri", team = "North Melbourne Kangaroos", rat = 25.3, pos = "KEY_FORWARD" }, { id = "CD_I1005084", name = "Will Walker", team = "North Melbourne Kangaroos", rat = 25.7, pos = "MIDFIELDER" }, { id = "CD_I1005729", name = "Tarryn Thomas", team = "North Melbourne Kangaroos", rat = 204.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006058", name = "Bailey Scott", team = "North Melbourne Kangaroos", rat = 110.2, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1006137", name = "Curtis Taylor", team = "North Melbourne Kangaroos", rat = 64.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006138", name = "Joel Crocker", team = "North Melbourne Kangaroos", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1006653", name = "Matt McGuinness", team = "North Melbourne Kangaroos", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1009189", name = "Jack Mahony", team = "North Melbourne Kangaroos", rat = 52.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1011771", name = "Flynn Perez", team = "North Melbourne Kangaroos", rat = 10.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1015781", name = "Charlie Comben", team = "North Melbourne Kangaroos", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I260227", name = "Shaun Higgins", team = "North Melbourne Kangaroos", rat = 374.9, pos = "MIDFIELDER" }, { id = "CD_I270325", name = "Robbie Tarrant", team = "North Melbourne Kangaroos", rat = 261.5, pos = "KEY_DEFENDER" }, { id = "CD_I271129", name = "Todd Goldstein", team = "North Melbourne Kangaroos", rat = 534.0, pos = "RUCK" }, { id = "CD_I280921", name = "Ben Cunnington", team = "North Melbourne Kangaroos", rat = 439.0, pos = "MIDFIELDER" }, { id = "CD_I280944", name = "Jack Ziebell", team = "North Melbourne Kangaroos", rat = 326.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I290156", name = "Jasper Pittard", team = "North Melbourne Kangaroos", rat = 282.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290194", name = "Jamie Macmillan", team = "North Melbourne Kangaroos", rat = 228.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290199", name = "Majak Daw", team = "North Melbourne Kangaroos", rat = 90.3, pos = "KEY_FORWARD" }, { id = "CD_I290246", name = "Tom Campbell", team = "North Melbourne Kangaroos", rat = 11.0, pos = "KEY_FORWARD" }, { id = "CD_I290738", name = "Jared Polec", team = "North Melbourne Kangaroos", rat = 348.0, pos = "MIDFIELDER" }, { id = "CD_I290787", name = "Shaun Atley", team = "North Melbourne Kangaroos", rat = 288.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290802", name = "Ben Jacobs", team = "North Melbourne Kangaroos", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I291550", name = "Josh Walker", team = "North Melbourne Kangaroos", rat = 241.2, pos = "KEY_DEFENDER" }, { id = "CD_I291784", name = "Dom Tyson", team = "North Melbourne Kangaroos", rat = 93.0, pos = "MIDFIELDER" }, { id = "CD_I291861", name = "Jed Anderson", team = "North Melbourne Kangaroos", rat = 407.2, pos = "MIDFIELDER" }, { id = "CD_I291867", name = "Ben Brown", team = "North Melbourne Kangaroos", rat = 293.1, pos = "KEY_FORWARD" }, { id = "CD_I295256", name = "Marley Williams", team = "North Melbourne Kangaroos", rat = 197.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295340", name = "Mason Wood", team = "North Melbourne Kangaroos", rat = 189.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I296035", name = "Trent Dumont", team = "North Melbourne Kangaroos", rat = 347.3, pos = "MIDFIELDER" }, { id = "CD_I296078", name = "Taylor Garner", team = "North Melbourne Kangaroos", rat = 75.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I296355", name = "Luke McDonald", team = "North Melbourne Kangaroos", rat = 238.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I296735", name = "Aaron Hall", team = "North Melbourne Kangaroos", rat = 197.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I297767", name = "Sam Durdin", team = "North Melbourne Kangaroos", rat = 71.5, pos = "KEY_DEFENDER" }, { id = "CD_I298271", name = "Paul Ahern", team = "North Melbourne Kangaroos", rat = 99.8, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I298287", name = "Ed Vickers-Willis", team = "North Melbourne Kangaroos", rat = 31.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I992499", name = "Kayne Turner", team = "North Melbourne Kangaroos", rat = 205.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I993998", name = "Jy Simpkin", team = "North Melbourne Kangaroos", rat = 351.8, pos = "MIDFIELDER" }, { id = "CD_I998327", name = "Kyron Hayden", team = "North Melbourne Kangaroos", rat = 43.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998484", name = "Cameron Zurhaar", team = "North Melbourne Kangaroos", rat = 257.8, pos = "MEDIUM_FORWARD" } ]


portAdelaidePowerPlayers : List Player
portAdelaidePowerPlayers =
    [ { id = "CD_I1000972", name = "Willem Drew", team = "Port Adelaide Power", rat = 80.1, pos = "MIDFIELDER" }, { id = "CD_I1001299", name = "Connor Rozee", team = "Port Adelaide Power", rat = 305.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002248", name = "Sam Hayes", team = "Port Adelaide Power", rat = 0.0, pos = "RUCK" }, { id = "CD_I1002253", name = "Kane Farrell", team = "Port Adelaide Power", rat = 138.9, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1002355", name = "Tobin Cox", team = "Port Adelaide Power", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002392", name = "Jake Patmore", team = "Port Adelaide Power", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1004829", name = "Riley Grundy", team = "Port Adelaide Power", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1004998", name = "Todd Marshall", team = "Port Adelaide Power", rat = 146.1, pos = "KEY_FORWARD" }, { id = "CD_I1005326", name = "Jackson Mead", team = "Port Adelaide Power", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1006096", name = "Xavier Duursma", team = "Port Adelaide Power", rat = 222.2, pos = "MIDFIELDER" }, { id = "CD_I1006121", name = "Zak Butters", team = "Port Adelaide Power", rat = 281.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008531", name = "Trent Burgoyne", team = "Port Adelaide Power", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1009191", name = "Miles Bergman", team = "Port Adelaide Power", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1009195", name = "Dylan Williams", team = "Port Adelaide Power", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1009389", name = "Jake Pasini", team = "Port Adelaide Power", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1010174", name = "Mitch Georgiades", team = "Port Adelaide Power", rat = 42.9, pos = "KEY_FORWARD" }, { id = "CD_I250365", name = "Travis Boak", team = "Port Adelaide Power", rat = 458.2, pos = "MIDFIELDER" }, { id = "CD_I260750", name = "Justin Westhoff", team = "Port Adelaide Power", rat = 338.3, pos = "KEY_FORWARD" }, { id = "CD_I261396", name = "Robbie Gray", team = "Port Adelaide Power", rat = 418.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I261892", name = "Hamish Hartlett", team = "Port Adelaide Power", rat = 221.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I261911", name = "Brad Ebert", team = "Port Adelaide Power", rat = 246.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I270919", name = "Tom Rockliff", team = "Port Adelaide Power", rat = 350.8, pos = "MIDFIELDER" }, { id = "CD_I280711", name = "Charlie Dixon", team = "Port Adelaide Power", rat = 268.2, pos = "KEY_FORWARD" }, { id = "CD_I280972", name = "Jack Watts", team = "Port Adelaide Power", rat = 72.8, pos = "KEY_DEFENDER" }, { id = "CD_I280990", name = "Steven Motlop", team = "Port Adelaide Power", rat = 257.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I290527", name = "Trent McKenzie", team = "Port Adelaide Power", rat = 124.7, pos = "KEY_DEFENDER" }, { id = "CD_I290733", name = "Cam Sutcliffe", team = "Port Adelaide Power", rat = 53.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I290746", name = "Scott Lycett", team = "Port Adelaide Power", rat = 410.3, pos = "RUCK" }, { id = "CD_I292145", name = "Tom Jonas", team = "Port Adelaide Power", rat = 285.7, pos = "KEY_DEFENDER" }, { id = "CD_I293603", name = "Sam Mayes", team = "Port Adelaide Power", rat = 30.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I293987", name = "Jarrod Lienert", team = "Port Adelaide Power", rat = 108.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I294318", name = "Ollie Wines", team = "Port Adelaide Power", rat = 369.3, pos = "MIDFIELDER" }, { id = "CD_I294504", name = "Tom Clurey", team = "Port Adelaide Power", rat = 298.6, pos = "KEY_DEFENDER" }, { id = "CD_I297354", name = "Karl Amon", team = "Port Adelaide Power", rat = 310.6, pos = "MIDFIELDER" }, { id = "CD_I991930", name = "Darcy Byrne-Jones", team = "Port Adelaide Power", rat = 329.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I992128", name = "Ryan Burton", team = "Port Adelaide Power", rat = 218.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I993979", name = "Sam Powell-Pepper", team = "Port Adelaide Power", rat = 295.3, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I994295", name = "Dan Houston", team = "Port Adelaide Power", rat = 354.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I994599", name = "Riley Bonner", team = "Port Adelaide Power", rat = 190.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I997142", name = "Peter Ladhams", team = "Port Adelaide Power", rat = 129.8, pos = "RUCK" }, { id = "CD_I997770", name = "Wylie Buzza", team = "Port Adelaide Power", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I998126", name = "Joe Atley", team = "Port Adelaide Power", rat = 6.7, pos = "MIDFIELDER" }, { id = "CD_I998321", name = "Joel Garner", team = "Port Adelaide Power", rat = 24.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I999320", name = "Martin Frederick", team = "Port Adelaide Power", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I999346", name = "Boyd Woodcock", team = "Port Adelaide Power", rat = 28.3, pos = "MEDIUM_FORWARD" } ]


richmondTigersPlayers : List Player
richmondTigersPlayers =
    [ { id = "CD_I1000061", name = "Callum Coleman-Jones", team = "Richmond Tigers", rat = -2.1, pos = "RUCK" }, { id = "CD_I1000223", name = "Liam Baker", team = "Richmond Tigers", rat = 280.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1000981", name = "Daniel Rioli", team = "Richmond Tigers", rat = 258.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002227", name = "Jack Higgins", team = "Richmond Tigers", rat = 248.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002231", name = "Patrick Naish", team = "Richmond Tigers", rat = 18.3, pos = "MIDFIELDER" }, { id = "CD_I1002245", name = "Noah Balta", team = "Richmond Tigers", rat = 228.9, pos = "KEY_DEFENDER" }, { id = "CD_I1002403", name = "Ben Miller", team = "Richmond Tigers", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1002583", name = "Sydney Stack", team = "Richmond Tigers", rat = 226.1, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1006133", name = "Jack Ross", team = "Richmond Tigers", rat = 101.3, pos = "MIDFIELDER" }, { id = "CD_I1006193", name = "Bigoa Nyuon", team = "Richmond Tigers", rat = 0.0, pos = "RUCK" }, { id = "CD_I1006208", name = "Fraser Turner", team = "Richmond Tigers", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1006276", name = "Derek Eggmolesse-Smith", team = "Richmond Tigers", rat = 43.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1006536", name = "Luke English", team = "Richmond Tigers", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1008297", name = "Riley Collier-Dawkins", team = "Richmond Tigers", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1009226", name = "Thomson Dow", team = "Richmond Tigers", rat = 6.8, pos = "MIDFIELDER" }, { id = "CD_I1009308", name = "Noah Cumberland", team = "Richmond Tigers", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1009313", name = "Will Martyn", team = "Richmond Tigers", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1011985", name = "Hugo Ralphsmith", team = "Richmond Tigers", rat = 0.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I250312", name = "Bachar Houli", team = "Richmond Tigers", rat = 294.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I250395", name = "Jack Riewoldt", team = "Richmond Tigers", rat = 277.7, pos = "KEY_FORWARD" }, { id = "CD_I260930", name = "Shane Edwards", team = "Richmond Tigers", rat = 491.3, pos = "MIDFIELDER" }, { id = "CD_I261362", name = "Alex Rance", team = "Richmond Tigers", rat = 39.6, pos = "KEY_DEFENDER" }, { id = "CD_I270896", name = "Trent Cotchin", team = "Richmond Tigers", rat = 334.2, pos = "MIDFIELDER" }, { id = "CD_I280819", name = "Dylan Grimes", team = "Richmond Tigers", rat = 291.9, pos = "KEY_DEFENDER" }, { id = "CD_I290032", name = "Kane Lambert", team = "Richmond Tigers", rat = 377.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I290198", name = "David Astbury", team = "Richmond Tigers", rat = 225.6, pos = "KEY_DEFENDER" }, { id = "CD_I290623", name = "Josh Caddy", team = "Richmond Tigers", rat = 259.7, pos = "MIDFIELDER" }, { id = "CD_I290627", name = "Dion Prestia", team = "Richmond Tigers", rat = 472.2, pos = "MIDFIELDER" }, { id = "CD_I290847", name = "Dustin Martin", team = "Richmond Tigers", rat = 568.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I293813", name = "Tom J. Lynch", team = "Richmond Tigers", rat = 284.4, pos = "KEY_FORWARD" }, { id = "CD_I294592", name = "Kamdyn McIntosh", team = "Richmond Tigers", rat = 265.6, pos = "MIDFIELDER" }, { id = "CD_I294674", name = "Nick Vlastuin", team = "Richmond Tigers", rat = 384.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295203", name = "Nathan Broad", team = "Richmond Tigers", rat = 203.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298174", name = "Toby Nankervis", team = "Richmond Tigers", rat = 268.4, pos = "RUCK" }, { id = "CD_I298358", name = "Oleg Markov", team = "Richmond Tigers", rat = 51.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I990827", name = "Jack Graham", team = "Richmond Tigers", rat = 294.8, pos = "MIDFIELDER" }, { id = "CD_I991933", name = "Jason Castagna", team = "Richmond Tigers", rat = 217.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I992049", name = "Jayden Short", team = "Richmond Tigers", rat = 273.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I992786", name = "Jake Aarts", team = "Richmond Tigers", rat = 95.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I993771", name = "Marlion Pickett", team = "Richmond Tigers", rat = 141.3, pos = "MIDFIELDER" }, { id = "CD_I993993", name = "Shai Bolton", team = "Richmond Tigers", rat = 339.3, pos = "MIDFIELDER" }, { id = "CD_I994077", name = "Mabior Chol", team = "Richmond Tigers", rat = 167.2, pos = "RUCK" }, { id = "CD_I998218", name = "Ryan Garthwaite", team = "Richmond Tigers", rat = 34.8, pos = "KEY_DEFENDER" }, { id = "CD_I998529", name = "Ivan Soldo", team = "Richmond Tigers", rat = 256.7, pos = "RUCK" } ]


stKildaSaintsPlayers : List Player
stKildaSaintsPlayers =
    [ { id = "CD_I1000267", name = "Matthew Parker", team = "St Kilda Saints", rat = 99.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002213", name = "Ed Phillips", team = "St Kilda Saints", rat = 54.1, pos = "MIDFIELDER" }, { id = "CD_I1002264", name = "Hunter Clark", team = "St Kilda Saints", rat = 213.2, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1002266", name = "Oscar Clavarino", team = "St Kilda Saints", rat = 0.0, pos = "KEY_DEFENDER" }, { id = "CD_I1002922", name = "Jack Bytel", team = "St Kilda Saints", rat = 8.7, pos = "MIDFIELDER" }, { id = "CD_I1003520", name = "Darragh Joyce", team = "St Kilda Saints", rat = 15.3, pos = "KEY_DEFENDER" }, { id = "CD_I1004360", name = "Jack Mayo", team = "St Kilda Saints", rat = 0.0, pos = "KEY_FORWARD" }, { id = "CD_I1004985", name = "Ben Paton", team = "St Kilda Saints", rat = 173.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004989", name = "Doulton Langlands", team = "St Kilda Saints", rat = 18.4, pos = "MIDFIELDER" }, { id = "CD_I1005530", name = "Ryan Abbott", team = "St Kilda Saints", rat = 45.2, pos = "RUCK" }, { id = "CD_I1005717", name = "Nick Coffield", team = "St Kilda Saints", rat = 168.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1006143", name = "Max King", team = "St Kilda Saints", rat = 102.2, pos = "KEY_FORWARD" }, { id = "CD_I1009221", name = "Jack Bell", team = "St Kilda Saints", rat = 0.0, pos = "RUCK" }, { id = "CD_I1009228", name = "Leo Connolly", team = "St Kilda Saints", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1011994", name = "Ryan Byrnes", team = "St Kilda Saints", rat = 0.1, pos = "MIDFIELDER" }, { id = "CD_I1013976", name = "Sam Alabakis", team = "St Kilda Saints", rat = 0.0, pos = "RUCK" }, { id = "CD_I250267", name = "Paddy Ryder", team = "St Kilda Saints", rat = 431.2, pos = "RUCK" }, { id = "CD_I260113", name = "Jarryn Geary", team = "St Kilda Saints", rat = 151.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I260310", name = "Nathan Brown", team = "St Kilda Saints", rat = 139.2, pos = "KEY_DEFENDER" }, { id = "CD_I280858", name = "Shane Savage", team = "St Kilda Saints", rat = 238.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I280933", name = "Dylan Roberton", team = "St Kilda Saints", rat = 0.7, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290117", name = "Dan Hannebery", team = "St Kilda Saints", rat = 112.7, pos = "MIDFIELDER" }, { id = "CD_I290641", name = "Jake Carlisle", team = "St Kilda Saints", rat = 160.2, pos = "KEY_DEFENDER" }, { id = "CD_I290757", name = "Jimmy Webster", team = "St Kilda Saints", rat = 86.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I293846", name = "Sebastian Ross", team = "St Kilda Saints", rat = 387.7, pos = "MIDFIELDER" }, { id = "CD_I294429", name = "Luke Dunstan", team = "St Kilda Saints", rat = 267.4, pos = "MIDFIELDER" }, { id = "CD_I294570", name = "Dean Kent", team = "St Kilda Saints", rat = 193.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I294596", name = "Tim Membrey", team = "St Kilda Saints", rat = 298.3, pos = "KEY_FORWARD" }, { id = "CD_I295584", name = "Bradley Hill", team = "St Kilda Saints", rat = 255.0, pos = "MIDFIELDER" }, { id = "CD_I296205", name = "Jack Steele", team = "St Kilda Saints", rat = 418.5, pos = "MIDFIELDER" }, { id = "CD_I296351", name = "Jack Billings", team = "St Kilda Saints", rat = 307.2, pos = "MIDFIELDER" }, { id = "CD_I296422", name = "Callum Wilkie", team = "St Kilda Saints", rat = 241.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I297452", name = "Nick Hind", team = "St Kilda Saints", rat = 180.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I298091", name = "Logan Austin", team = "St Kilda Saints", rat = 14.4, pos = "KEY_DEFENDER" }, { id = "CD_I298265", name = "Daniel McKenzie", team = "St Kilda Saints", rat = 153.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298421", name = "Jade Gresham", team = "St Kilda Saints", rat = 357.0, pos = "MIDFIELDER" }, { id = "CD_I990548", name = "Jonathon Marsh", team = "St Kilda Saints", rat = 51.7, pos = "KEY_FORWARD" }, { id = "CD_I991988", name = "Zak Jones", team = "St Kilda Saints", rat = 311.6, pos = "MIDFIELDER" }, { id = "CD_I992000", name = "Jack Lonie", team = "St Kilda Saints", rat = 193.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I992374", name = "Dan Butler", team = "St Kilda Saints", rat = 229.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I992468", name = "Rowan Marshall", team = "St Kilda Saints", rat = 467.4, pos = "RUCK" }, { id = "CD_I993480", name = "Dougal Howard", team = "St Kilda Saints", rat = 280.8, pos = "KEY_DEFENDER" }, { id = "CD_I993917", name = "Ben Long", team = "St Kilda Saints", rat = 226.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I994389", name = "Jack Sinclair", team = "St Kilda Saints", rat = 355.7, pos = "MIDFIELDER" }, { id = "CD_I998134", name = "Josh Battle", team = "St Kilda Saints", rat = 201.4, pos = "MIDFIELDER_FORWARD" } ]


sydneySwansPlayers : List Player
sydneySwansPlayers =
    [ { id = "CD_I1002291", name = "James Bell", team = "Sydney Swans", rat = 42.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1003203", name = "Hayden McLean", team = "Sydney Swans", rat = 57.9, pos = "KEY_FORWARD" }, { id = "CD_I1004113", name = "Will Gould", team = "Sydney Swans", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1004848", name = "Dylan Stephens", team = "Sydney Swans", rat = 40.3, pos = "MIDFIELDER" }, { id = "CD_I1004880", name = "Ben Ronke", team = "Sydney Swans", rat = 111.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I1004949", name = "Matthew Ling", team = "Sydney Swans", rat = 7.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1005997", name = "Elijah Taylor", team = "Sydney Swans", rat = 15.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006028", name = "Nick Blakey", team = "Sydney Swans", rat = 256.3, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1006126", name = "James Rowbottom", team = "Sydney Swans", rat = 232.2, pos = "MIDFIELDER" }, { id = "CD_I1006232", name = "Sam Wicks", team = "Sydney Swans", rat = 37.3, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008080", name = "Ryley Stoddart", team = "Sydney Swans", rat = 2.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1008091", name = "Joel Amartey", team = "Sydney Swans", rat = 3.6, pos = "RUCK" }, { id = "CD_I1008198", name = "Tom McCartin", team = "Sydney Swans", rat = 216.4, pos = "KEY_FORWARD" }, { id = "CD_I1011789", name = "Brady Rowles", team = "Sydney Swans", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1011791", name = "Zac Foot", team = "Sydney Swans", rat = 3.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1011936", name = "Justin McInerney", team = "Sydney Swans", rat = 81.8, pos = "MIDFIELDER" }, { id = "CD_I1012014", name = "Chad Warner", team = "Sydney Swans", rat = 9.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1012101", name = "Michael Knoll", team = "Sydney Swans", rat = 0.0, pos = "RUCK" }, { id = "CD_I1013624", name = "Harry Reynolds", team = "Sydney Swans", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1019158", name = "Barry O'Connor", team = "Sydney Swans", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I240399", name = "Lance Franklin", team = "Sydney Swans", rat = 184.8, pos = "KEY_FORWARD" }, { id = "CD_I260382", name = "Josh P. Kennedy", team = "Sydney Swans", rat = 400.8, pos = "MIDFIELDER" }, { id = "CD_I290188", name = "Sam Reid", team = "Sydney Swans", rat = 290.1, pos = "KEY_FORWARD" }, { id = "CD_I290307", name = "Dane Rampe", team = "Sydney Swans", rat = 395.4, pos = "KEY_DEFENDER" }, { id = "CD_I290722", name = "Sam Gray", team = "Sydney Swans", rat = 214.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I290778", name = "Luke Parker", team = "Sydney Swans", rat = 453.7, pos = "MIDFIELDER" }, { id = "CD_I291848", name = "Robbie Fox", team = "Sydney Swans", rat = 172.0, pos = "KEY_DEFENDER" }, { id = "CD_I291978", name = "Harry Cunningham", team = "Sydney Swans", rat = 237.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I294036", name = "George Hewett", team = "Sydney Swans", rat = 357.9, pos = "MIDFIELDER" }, { id = "CD_I294469", name = "Aliir Aliir", team = "Sydney Swans", rat = 331.3, pos = "KEY_DEFENDER" }, { id = "CD_I294663", name = "Jackson Thurlow", team = "Sydney Swans", rat = 120.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I294737", name = "Callum Sinclair", team = "Sydney Swans", rat = 261.2, pos = "RUCK" }, { id = "CD_I295156", name = "Kaiden Brand", team = "Sydney Swans", rat = 81.0, pos = "KEY_DEFENDER" }, { id = "CD_I295342", name = "Jake Lloyd", team = "Sydney Swans", rat = 339.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I296211", name = "Lewis Taylor", team = "Sydney Swans", rat = 127.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I298144", name = "Sam Naismith", team = "Sydney Swans", rat = 23.6, pos = "RUCK" }, { id = "CD_I298539", name = "Isaac Heeney", team = "Sydney Swans", rat = 388.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I992242", name = "Jordan Dawson", team = "Sydney Swans", rat = 340.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I993905", name = "Callum Mills", team = "Sydney Swans", rat = 311.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I996442", name = "Ryan Clarke", team = "Sydney Swans", rat = 178.8, pos = "MIDFIELDER" }, { id = "CD_I996743", name = "Lewis Melican", team = "Sydney Swans", rat = 152.7, pos = "KEY_DEFENDER" }, { id = "CD_I996765", name = "Tom Papley", team = "Sydney Swans", rat = 352.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I997100", name = "Will Hayward", team = "Sydney Swans", rat = 211.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I997842", name = "Colin O'Riordan", team = "Sydney Swans", rat = 134.8, pos = "MEDIUM_DEFENDER" }, { id = "CD_I998103", name = "Oliver Florent", team = "Sydney Swans", rat = 297.4, pos = "MIDFIELDER" }, { id = "CD_I998662", name = "Jack Maibaum", team = "Sydney Swans", rat = 0.0, pos = "KEY_DEFENDER" } ]


westCoastEaglesPlayers : List Player
westCoastEaglesPlayers =
    [ { id = "CD_I1001412", name = "Anthony Treacy", team = "West Coast Eagles", rat = 0.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1002300", name = "Jarrod Brander", team = "West Coast Eagles", rat = 38.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1004356", name = "Brayden Ainsworth", team = "West Coast Eagles", rat = 33.1, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1004364", name = "Liam Ryan", team = "West Coast Eagles", rat = 324.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I1004385", name = "Oscar Allen", team = "West Coast Eagles", rat = 289.0, pos = "KEY_FORWARD" }, { id = "CD_I1005599", name = "Luke Foley", team = "West Coast Eagles", rat = 3.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I1005793", name = "Jarrod Cameron", team = "West Coast Eagles", rat = 74.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006114", name = "Bailey J. Williams", team = "West Coast Eagles", rat = 14.4, pos = "RUCK" }, { id = "CD_I1006550", name = "Jack Petruccelle", team = "West Coast Eagles", rat = 156.7, pos = "MEDIUM_FORWARD" }, { id = "CD_I1008282", name = "Xavier O'Neill", team = "West Coast Eagles", rat = 19.0, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1009353", name = "Mitch O'Neill", team = "West Coast Eagles", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1011243", name = "Callum Jamieson", team = "West Coast Eagles", rat = 0.0, pos = "RUCK" }, { id = "CD_I1011437", name = "Harry Edwards", team = "West Coast Eagles", rat = 2.9, pos = "KEY_DEFENDER" }, { id = "CD_I1011464", name = "Ben Johnson", team = "West Coast Eagles", rat = 0.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I240283", name = "Shannon Hurn", team = "West Coast Eagles", rat = 337.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I240406", name = "Josh J. Kennedy", team = "West Coast Eagles", rat = 266.2, pos = "KEY_FORWARD" }, { id = "CD_I261214", name = "Will Schofield", team = "West Coast Eagles", rat = 139.9, pos = "KEY_DEFENDER" }, { id = "CD_I271045", name = "Nic Naitanui", team = "West Coast Eagles", rat = 311.5, pos = "RUCK" }, { id = "CD_I280078", name = "Luke Shuey", team = "West Coast Eagles", rat = 454.5, pos = "MIDFIELDER" }, { id = "CD_I280959", name = "Nathan Vardy", team = "West Coast Eagles", rat = 144.8, pos = "RUCK" }, { id = "CD_I281052", name = "Mark Hutchings", team = "West Coast Eagles", rat = 145.5, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I281080", name = "Brad Sheppard", team = "West Coast Eagles", rat = 218.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I281281", name = "Lewis Jetta", team = "West Coast Eagles", rat = 295.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I281373", name = "Jack Redden", team = "West Coast Eagles", rat = 270.2, pos = "MIDFIELDER" }, { id = "CD_I290801", name = "Andrew Gaff", team = "West Coast Eagles", rat = 367.6, pos = "MIDFIELDER" }, { id = "CD_I290826", name = "Jamie Cripps", team = "West Coast Eagles", rat = 358.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I290838", name = "Jack Darling", team = "West Coast Eagles", rat = 403.6, pos = "KEY_FORWARD" }, { id = "CD_I291947", name = "Brendon Ah Chee", team = "West Coast Eagles", rat = 129.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I292128", name = "Elliot Yeo", team = "West Coast Eagles", rat = 484.4, pos = "MIDFIELDER" }, { id = "CD_I294266", name = "Tom Hickey", team = "West Coast Eagles", rat = 269.1, pos = "RUCK" }, { id = "CD_I294859", name = "Jeremy McGovern", team = "West Coast Eagles", rat = 404.9, pos = "KEY_DEFENDER" }, { id = "CD_I295898", name = "Tim Kelly", team = "West Coast Eagles", rat = 418.4, pos = "MIDFIELDER" }, { id = "CD_I296225", name = "Willie Rioli", team = "West Coast Eagles", rat = 233.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I296296", name = "Dom Sheed", team = "West Coast Eagles", rat = 349.3, pos = "MIDFIELDER" }, { id = "CD_I297668", name = "Nic Reid", team = "West Coast Eagles", rat = 12.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I298268", name = "Liam Duggan", team = "West Coast Eagles", rat = 254.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298298", name = "Jackson Nelson", team = "West Coast Eagles", rat = 139.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I298474", name = "Francis Watson", team = "West Coast Eagles", rat = 13.4, pos = "MEDIUM_DEFENDER" }, { id = "CD_I990290", name = "Tom Barrass", team = "West Coast Eagles", rat = 341.6, pos = "KEY_DEFENDER" }, { id = "CD_I993820", name = "Tom Cole", team = "West Coast Eagles", rat = 204.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I996554", name = "Jake Waterman", team = "West Coast Eagles", rat = 141.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I997823", name = "Josh Rotham", team = "West Coast Eagles", rat = 55.1, pos = "KEY_DEFENDER" }, { id = "CD_I998107", name = "Hamish Brayshaw", team = "West Coast Eagles", rat = 2.5, pos = "MEDIUM_FORWARD" }, { id = "CD_I998414", name = "Daniel Venables", team = "West Coast Eagles", rat = 95.8, pos = "MEDIUM_FORWARD" }, { id = "CD_I998791", name = "Jamaine Jones", team = "West Coast Eagles", rat = 5.8, pos = "MEDIUM_FORWARD" } ]


westernBulldogsPlayers : List Player
westernBulldogsPlayers =
    [ { id = "CD_I1002383", name = "Callum Porter", team = "Western Bulldogs", rat = 1.1, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1002404", name = "Aaron Naughton", team = "Western Bulldogs", rat = 289.2, pos = "KEY_FORWARD" }, { id = "CD_I1003130", name = "Patrick Lipinski", team = "Western Bulldogs", rat = 291.6, pos = "MIDFIELDER" }, { id = "CD_I1004592", name = "Tim English", team = "Western Bulldogs", rat = 350.3, pos = "RUCK" }, { id = "CD_I1004909", name = "Lachie Young", team = "Western Bulldogs", rat = 34.2, pos = "MIDFIELDER" }, { id = "CD_I1005000", name = "Laitham Vandermeer", team = "Western Bulldogs", rat = 45.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1006127", name = "Rhylee West", team = "Western Bulldogs", rat = 48.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006130", name = "Bailey Smith", team = "Western Bulldogs", rat = 345.0, pos = "MIDFIELDER" }, { id = "CD_I1006303", name = "Fergus Greene", team = "Western Bulldogs", rat = 10.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I1006533", name = "Riley Garcia", team = "Western Bulldogs", rat = 0.0, pos = "MIDFIELDER" }, { id = "CD_I1008280", name = "Ed Richards", team = "Western Bulldogs", rat = 260.9, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I1011803", name = "Cody Weightman", team = "Western Bulldogs", rat = 8.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I1011992", name = "Louis Butler", team = "Western Bulldogs", rat = 9.1, pos = "MEDIUM_DEFENDER" }, { id = "CD_I270732", name = "Matthew Suckling", team = "Western Bulldogs", rat = 243.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I280013", name = "Jackson Trengove", team = "Western Bulldogs", rat = 212.9, pos = "KEY_DEFENDER" }, { id = "CD_I281139", name = "Easton Wood", team = "Western Bulldogs", rat = 236.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290073", name = "Sam Lloyd", team = "Western Bulldogs", rat = 278.4, pos = "MEDIUM_FORWARD" }, { id = "CD_I290085", name = "Taylor Duryea", team = "Western Bulldogs", rat = 131.0, pos = "MEDIUM_DEFENDER" }, { id = "CD_I290797", name = "Alex Keath", team = "Western Bulldogs", rat = 275.6, pos = "KEY_DEFENDER" }, { id = "CD_I290799", name = "Tom Liberatore", team = "Western Bulldogs", rat = 364.5, pos = "MIDFIELDER" }, { id = "CD_I291492", name = "Josh Bruce", team = "Western Bulldogs", rat = 223.3, pos = "KEY_FORWARD" }, { id = "CD_I291545", name = "Mitch Wallis", team = "Western Bulldogs", rat = 308.2, pos = "MEDIUM_FORWARD" }, { id = "CD_I293651", name = "Hayden Crozier", team = "Western Bulldogs", rat = 281.6, pos = "MEDIUM_DEFENDER" }, { id = "CD_I294101", name = "Jason Johannisen", team = "Western Bulldogs", rat = 350.3, pos = "MEDIUM_DEFENDER" }, { id = "CD_I294557", name = "Lachie Hunter", team = "Western Bulldogs", rat = 362.5, pos = "MIDFIELDER" }, { id = "CD_I295136", name = "Caleb Daniel", team = "Western Bulldogs", rat = 392.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I295313", name = "Lin Jong", team = "Western Bulldogs", rat = 54.2, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I295467", name = "Jack Macrae", team = "Western Bulldogs", rat = 482.7, pos = "MIDFIELDER" }, { id = "CD_I295712", name = "Tory Dickson", team = "Western Bulldogs", rat = 176.9, pos = "MEDIUM_FORWARD" }, { id = "CD_I296070", name = "Ben Cavarra", team = "Western Bulldogs", rat = 15.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I297373", name = "Marcus Bontempelli", team = "Western Bulldogs", rat = 550.7, pos = "MIDFIELDER" }, { id = "CD_I298277", name = "Billy Gowers", team = "Western Bulldogs", rat = 69.0, pos = "MEDIUM_FORWARD" }, { id = "CD_I991939", name = "Zaine Cordy", team = "Western Bulldogs", rat = 254.0, pos = "KEY_DEFENDER" }, { id = "CD_I991976", name = "Will Hayes", team = "Western Bulldogs", rat = 72.3, pos = "MIDFIELDER" }, { id = "CD_I992054", name = "Roarke Smith", team = "Western Bulldogs", rat = 72.9, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I992330", name = "Jordon Sweet", team = "Western Bulldogs", rat = 0.0, pos = "RUCK" }, { id = "CD_I992351", name = "Bailey Williams", team = "Western Bulldogs", rat = 193.5, pos = "MEDIUM_DEFENDER" }, { id = "CD_I993834", name = "Josh Dunkley", team = "Western Bulldogs", rat = 473.4, pos = "MIDFIELDER_FORWARD" }, { id = "CD_I993841", name = "Josh Schache", team = "Western Bulldogs", rat = 150.7, pos = "KEY_FORWARD" }, { id = "CD_I994410", name = "Brad Lynch", team = "Western Bulldogs", rat = 29.9, pos = "MEDIUM_DEFENDER" }, { id = "CD_I996483", name = "Toby McLean", team = "Western Bulldogs", rat = 294.6, pos = "MEDIUM_FORWARD" }, { id = "CD_I996708", name = "Bailey Dale", team = "Western Bulldogs", rat = 141.1, pos = "MEDIUM_FORWARD" }, { id = "CD_I997316", name = "Lewis Young", team = "Western Bulldogs", rat = 33.2, pos = "KEY_FORWARD" }, { id = "CD_I997501", name = "Ryan Gardner", team = "Western Bulldogs", rat = 48.0, pos = "KEY_DEFENDER" }, { id = "CD_I998782", name = "Buku Khamis", team = "Western Bulldogs", rat = 0.0, pos = "KEY_DEFENDER" } ]


pickRat : Int -> Int
pickRat i =
    case i of
        1 ->
            3000

        2 ->
            2517

        3 ->
            2234

        4 ->
            2034

        5 ->
            1878

        6 ->
            1751

        7 ->
            1644

        8 ->
            1551

        9 ->
            1469

        10 ->
            1395

        11 ->
            1329

        12 ->
            1268

        13 ->
            1212

        14 ->
            1161

        15 ->
            1112

        16 ->
            1067

        17 ->
            1025

        18 ->
            985

        19 ->
            948

        20 ->
            912

        21 ->
            878

        22 ->
            845

        23 ->
            815

        24 ->
            785

        25 ->
            756

        26 ->
            729

        27 ->
            703

        28 ->
            677

        29 ->
            653

        30 ->
            629

        31 ->
            606

        32 ->
            584

        33 ->
            563

        34 ->
            542

        35 ->
            522

        36 ->
            502

        37 ->
            483

        38 ->
            465

        39 ->
            446

        40 ->
            429

        41 ->
            412

        42 ->
            395

        43 ->
            378

        44 ->
            362

        45 ->
            347

        46 ->
            331

        47 ->
            316

        48 ->
            302

        49 ->
            287

        50 ->
            273

        51 ->
            259

        52 ->
            246

        53 ->
            233

        54 ->
            220

        55 ->
            207

        56 ->
            194

        57 ->
            182

        58 ->
            170

        59 ->
            158

        60 ->
            146

        61 ->
            135

        62 ->
            123

        63 ->
            112

        64 ->
            101

        65 ->
            90

        66 ->
            80

        67 ->
            69

        68 ->
            59

        69 ->
            49

        70 ->
            39

        71 ->
            29

        72 ->
            19

        73 ->
            9

        74 ->
            0

        _ ->
            0


adelaideCrowsPicks : List Int
adelaideCrowsPicks =
    [ 1
    , 8
    , 20
    , 44
    , 48
    , 60
    , 74
    ]


brisbaneLionsPicks : List Int
brisbaneLionsPicks =
    [ 18
    , 19
    , 38
    , 64
    , 80
    , 90
    ]


carltonBluesPicks : List Int
carltonBluesPicks =
    [ 7
    , 27
    , 45
    , 81
    ]


collingwoodMagpiesPicks : List Int
collingwoodMagpiesPicks =
    [ 12
    , 34
    , 37
    , 68
    , 84
    ]


essendonBombersPicks : List Int
essendonBombersPicks =
    [ 6
    , 41
    , 61
    , 69
    , 70
    , 79
    ]


fremantleDockersPicks : List Int
fremantleDockersPicks =
    [ 10
    , 28
    ]


geelongCatsPicks : List Int
geelongCatsPicks =
    [ 11
    , 15
    , 16
    , 33
    , 88
    ]


goldCoastSunsPicks : List Int
goldCoastSunsPicks =
    [ 5
    , 24
    , 35
    , 72
    , 78
    ]


greaterWesternSydneyGiantsPicks : List Int
greaterWesternSydneyGiantsPicks =
    [ 39
    , 46
    , 66
    , 82
    ]


hawthornHawksPicks : List Int
hawthornHawksPicks =
    [ 4
    , 21
    , 40
    , 43
    , 59
    , 67
    , 77
    ]


melbourneDemonsPicks : List Int
melbourneDemonsPicks =
    [ 23
    , 47
    , 62
    , 63
    , 83
    ]


northMelbourneKangaroosPicks : List Int
northMelbourneKangaroosPicks =
    [ 2
    , 25
    , 57
    , 65
    , 75
    ]


portAdelaidePowerPicks : List Int
portAdelaidePowerPicks =
    [ 26
    , 29
    , 42
    , 50
    , 55
    , 91
    ]


richmondTigersPicks : List Int
richmondTigersPicks =
    [ 17
    , 31
    , 53
    , 71
    , 89
    ]


stKildaSaintsPicks : List Int
stKildaSaintsPicks =
    [ 14
    , 58
    , 73
    , 86
    ]


sydneySwansPicks : List Int
sydneySwansPicks =
    [ 3
    , 22
    , 54
    , 56
    , 76
    ]


westCoastEaglesPicks : List Int
westCoastEaglesPicks =
    [ 32
    , 51
    , 52
    , 87
    ]


westernBulldogsPicks : List Int
westernBulldogsPicks =
    [ 13
    , 36
    , 49
    , 85
    ]


picLookup : Player -> String
picLookup s =
    "https://s.afl.com.au/staticfile/AFL%20Tenant/AFL/Players/ChampIDImages/XLarge2020/" ++ String.replace "CD_I" "" s.id ++ ".png"
