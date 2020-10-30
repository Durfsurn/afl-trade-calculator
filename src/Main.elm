module Main exposing (..)

import Base64.Decode as BDecode
import Base64.Encode as BEncode
import Browser
import Bytes
import Bytes.Decode
import Bytes.Encode
import Flate
import Html exposing (..)
import Html.Attributes exposing (class, disabled, href, placeholder, src, style, title, type_, value, width)
import Html.Events exposing (..)
import Json.Decode as JDecode
import Json.Decode.Pipeline exposing (required)
import Json.Encode as Encode
import List.Extra as LExtra
import Ports
import Teams exposing (..)


stringAsBytes : String -> Bytes.Bytes
stringAsBytes s =
    Bytes.Encode.encode (Bytes.Encode.string s)


b64Encoded : String -> String
b64Encoded s =
    BEncode.encode (BEncode.bytes (stringAsBytes s))


subscriptions : Model -> Sub Msg
subscriptions _ =
    Ports.copyDone CopyDone


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


type alias Model =
    { teams_checked : List Team
    , picks_checked : List ( Int, String )
    , future_picks_checked : List ( String, String )
    , players_checked : List Player
    , picks_going : List ( ( Int, String ), String )
    , future_picks_going : List ( ( String, String ), String )
    , players_going : List ( Player, String )
    , export_modal : Bool
    , import_modal : Bool
    , player_filter : String
    , copied : Maybe String
    , hash : Maybe String
    , hash_error : String
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { teams_checked = []
      , picks_checked = []
      , future_picks_checked = []
      , players_checked = []
      , picks_going = []
      , future_picks_going = []
      , players_going = []
      , export_modal = False
      , import_modal = False
      , player_filter = ""
      , copied = Nothing
      , hash = Nothing
      , hash_error = ""
      }
    , Cmd.none
    )


type Msg
    = NoOp
    | TeamChecked Team
    | PickChecked ( Int, String )
    | PlayerChecked Player
    | PlayerGoing Player String
    | PickGoing Int String String
    | ExportModal Bool
    | ImportModal Bool
    | PlayerFilter String
    | FuturePick Team String
    | FuturePickGoing String String String
    | CalculateHash
    | CopyDone String
    | ImportHash String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        PlayerChecked player ->
            case List.filter (\p -> p == player) model.players_checked |> List.length of
                1 ->
                    ( { model | players_checked = List.filter (\p -> p /= player) model.players_checked, players_going = List.filter (\p -> Tuple.first p /= player) model.players_going }, Cmd.none )

                _ ->
                    ( { model | players_checked = player :: model.players_checked }, Cmd.none )

        PickChecked pick ->
            case List.filter (\p -> p == pick) model.picks_checked |> List.length of
                1 ->
                    ( { model | picks_checked = List.filter (\p -> p /= pick) model.picks_checked, picks_going = List.filter (\p -> (Tuple.first p |> Tuple.first) /= Tuple.first pick) model.picks_going }, Cmd.none )

                _ ->
                    ( { model | picks_checked = pick :: model.picks_checked }, Cmd.none )

        TeamChecked team ->
            case List.filter (\t -> t == team) model.teams_checked |> List.length of
                1 ->
                    ( { model | teams_checked = List.filter (\t -> t /= team) model.teams_checked }, Cmd.none )

                _ ->
                    ( { model | teams_checked = team :: model.teams_checked }, Cmd.none )

        PlayerGoing pl team ->
            let
                new_list =
                    List.filter (\pg -> Tuple.first pg /= pl) model.players_going
            in
            ( { model | players_going = ( pl, team ) :: new_list |> List.filter (\l -> Tuple.second l /= "...") }, Cmd.none )

        PickGoing p old_t new_t ->
            let
                new_list =
                    List.filter (\pg -> (Tuple.first pg |> Tuple.first) /= p) model.picks_going
            in
            ( { model | picks_going = ( ( p, old_t ), shortNameToLong new_t ) :: new_list |> List.filter (\l -> Tuple.second l /= "...") }, Cmd.none )

        ExportModal state ->
            ( { model | export_modal = state, copied = Nothing, hash = Nothing }, Cmd.none )

        ImportModal state ->
            ( { model | import_modal = state, copied = Nothing, hash = Nothing }, Cmd.none )

        PlayerFilter inp ->
            ( { model | player_filter = inp }, Cmd.none )

        FuturePick team pick ->
            let
                new_list =
                    if List.member ( pick, team.name ) model.future_picks_checked then
                        List.filter (\tp -> tp /= ( pick, team.name )) model.future_picks_checked

                    else
                        ( pick, team.name ) :: model.future_picks_checked
            in
            ( { model | future_picks_checked = new_list }, Cmd.none )

        FuturePickGoing p old_t new_t ->
            let
                new_list =
                    List.filter (\pg -> (Tuple.first pg |> Tuple.first) /= p) model.future_picks_going
            in
            ( { model | future_picks_going = ( ( p, old_t ), new_t ) :: new_list |> List.filter (\l -> Tuple.second l /= "...") }, Cmd.none )

        CalculateHash ->
            let
                mdl =
                    Encode.encode 0 <| encodeModel model

                deflate =
                    Flate.deflate (stringAsBytes mdl)
            in
            ( model, Ports.copy (BEncode.encode (BEncode.bytes deflate)) )

        CopyDone str ->
            ( { model | copied = Just str }, Cmd.none )

        ImportHash str ->
            let
                b_decoded_str =
                    BDecode.decode BDecode.bytes str
            in
            case b_decoded_str of
                Ok b_d_str ->
                    let
                        inflate =
                            Flate.inflate b_d_str
                    in
                    case inflate of
                        Just b ->
                            let
                                b_str : Maybe String
                                b_str =
                                    Bytes.Decode.decode (Bytes.Decode.string (Bytes.width b)) b
                            in
                            case b_str of
                                Just s ->
                                    let
                                        mdl : Result JDecode.Error ImportModel
                                        mdl =
                                            JDecode.decodeString decodeModel s
                                    in
                                    case mdl of
                                        Ok m ->
                                            ( importModelToModel s model m, Cmd.none )

                                        Err _ ->
                                            ( { model | hash = Nothing, hash_error = "Could not decode json to model." }, Cmd.none )

                                Nothing ->
                                    ( { model | hash = Nothing, hash_error = "Could not decode bytes to string." }, Cmd.none )

                        Nothing ->
                            ( { model | hash = Nothing, hash_error = "Could not inflate hash." }, Cmd.none )

                Err _ ->
                    ( { model | hash = Nothing, hash_error = "Could not decode hash." }, Cmd.none )


type alias ImportModel =
    { teams_checked : List Team
    , picks_checked : List IS
    , future_picks_checked : List StrStr
    , players_checked : List Player
    , picks_going : List ISS
    , future_picks_going : List SSS
    , players_going : List PS
    }


importModelToModel : String -> Model -> ImportModel -> Model
importModelToModel hash m im =
    { m
        | teams_checked = im.teams_checked
        , picks_checked = List.map isToIntStr im.picks_checked
        , future_picks_checked = List.map strStrToStrStr im.future_picks_checked
        , players_checked = im.players_checked
        , picks_going = List.map isstoIntStrStr im.picks_going
        , future_picks_going = List.map ssstoStrStrStr im.future_picks_going
        , players_going = List.map pstoPlayerStr im.players_going
        , hash = Just hash
        , export_modal = True
        , import_modal = False
    }


decodeModel : JDecode.Decoder ImportModel
decodeModel =
    JDecode.succeed ImportModel
        |> required "teams_checked" (JDecode.list decodeTeam)
        |> required "picks_checked" (JDecode.list decodeIntStr)
        |> required "future_picks_checked" (JDecode.list decodeStrStr)
        |> required "players_checked" (JDecode.list decodePlayer)
        |> required "picks_going" (JDecode.list decodeIntStrStr)
        |> required "future_picks_going" (JDecode.list decodeStrStrStr)
        |> required "players_going" (JDecode.list decodePlayerStr)


type alias SSS =
    { string1 : String
    , string2 : String
    , string3 : String
    }


ssstoStrStrStr : SSS -> ( ( String, String ), String )
ssstoStrStrStr sss =
    ( ( sss.string1, sss.string2 ), sss.string3 )


decodeStrStrStr : JDecode.Decoder SSS
decodeStrStrStr =
    JDecode.succeed SSS
        |> required "string1" JDecode.string
        |> required "string2" JDecode.string
        |> required "string3" JDecode.string


type alias ISS =
    { int : Int
    , string2 : String
    , string3 : String
    }


isstoIntStrStr : ISS -> ( ( Int, String ), String )
isstoIntStrStr iss =
    ( ( iss.int, iss.string2 ), iss.string3 )


decodeIntStrStr : JDecode.Decoder ISS
decodeIntStrStr =
    JDecode.succeed ISS
        |> required "int" JDecode.int
        |> required "string1" JDecode.string
        |> required "string2" JDecode.string


type alias PS =
    { pl : Player
    , string : String
    }


pstoPlayerStr : PS -> ( Player, String )
pstoPlayerStr ps =
    ( ps.pl, ps.string )


decodePlayerStr : JDecode.Decoder PS
decodePlayerStr =
    JDecode.succeed PS
        |> required "player" decodePlayer
        |> required "string" JDecode.string


type alias StrStr =
    { string1 : String
    , string2 : String
    }


strStrToStrStr : StrStr -> ( String, String )
strStrToStrStr str_str =
    ( str_str.string1, str_str.string2 )


decodeStrStr : JDecode.Decoder StrStr
decodeStrStr =
    JDecode.succeed StrStr
        |> required "string1" JDecode.string
        |> required "string2" JDecode.string


type alias IS =
    { int : Int
    , string : String
    }


isToIntStr : IS -> ( Int, String )
isToIntStr is =
    ( is.int, is.string )


decodeIntStr : JDecode.Decoder IS
decodeIntStr =
    JDecode.succeed IS
        |> required "int" JDecode.int
        |> required "string" JDecode.string


decodeTeam : JDecode.Decoder Team
decodeTeam =
    JDecode.succeed Team
        |> required "name" JDecode.string
        |> required "players" (JDecode.list decodePlayer)
        |> required "picks" (JDecode.list JDecode.int)


decodePlayer : JDecode.Decoder Player
decodePlayer =
    JDecode.succeed Player
        |> required "name" JDecode.string
        |> required "rat" JDecode.float
        |> required "pos" JDecode.string
        |> required "team" JDecode.string
        |> required "id" JDecode.string


encodeModel : Model -> Encode.Value
encodeModel m =
    Encode.object
        [ ( "teams_checked", Encode.list encodeTeam m.teams_checked ) --  List Team
        , ( "picks_checked", Encode.list encodeIntStr m.picks_checked ) --  List ( Int, String )
        , ( "future_picks_checked", Encode.list encodeStrStr m.future_picks_checked ) --  List ( String, String )
        , ( "players_checked", Encode.list encodePlayer m.players_checked ) --  List Player
        , ( "picks_going", Encode.list encodeIntStrStr m.picks_going ) --  List ( ( Int, String ), String )
        , ( "future_picks_going", Encode.list encodeStrStrStr m.future_picks_going ) --  List ( ( String, String ), String )
        , ( "players_going", Encode.list encodePlayerStr m.players_going ) --  List ( Player, String )
        ]


encodeStrStrStr : ( ( String, String ), String ) -> Encode.Value
encodeStrStrStr ( ( str1, str2 ), str3 ) =
    Encode.object
        [ ( "string1", Encode.string str1 ), ( "string2", Encode.string str2 ), ( "string3", Encode.string str3 ) ]


encodeIntStrStr : ( ( Int, String ), String ) -> Encode.Value
encodeIntStrStr ( ( int, str1 ), str2 ) =
    Encode.object
        [ ( "int", Encode.int int ), ( "string1", Encode.string str1 ), ( "string2", Encode.string str2 ) ]


encodePlayerStr : ( Player, String ) -> Encode.Value
encodePlayerStr ( pl, str ) =
    Encode.object
        [ ( "player", encodePlayer pl ), ( "string", Encode.string str ) ]


encodeStrStr : ( String, String ) -> Encode.Value
encodeStrStr ( str1, str2 ) =
    Encode.object
        [ ( "string1", Encode.string str1 ), ( "string2", Encode.string str2 ) ]


encodeIntStr : ( Int, String ) -> Encode.Value
encodeIntStr ( int, str ) =
    Encode.object
        [ ( "int", Encode.int int ), ( "string", Encode.string str ) ]


encodeTeam : Team -> Encode.Value
encodeTeam t =
    Encode.object
        [ ( "name", Encode.string t.name )
        , ( "players", Encode.list encodePlayer t.players )
        , ( "picks", Encode.list Encode.int t.picks )
        ]


encodePlayer : Player -> Encode.Value
encodePlayer p =
    Encode.object
        [ ( "name", Encode.string p.name )
        , ( "rat", Encode.float p.rat )
        , ( "pos", Encode.string p.pos )
        , ( "team", Encode.string p.team )
        , ( "id", Encode.string p.id )
        ]


view : Model -> Html Msg
view model =
    div [ class "section", style "padding-top" "10px" ]
        [ div [ style "display" "flex" ]
            [ h1 [ class "title is-1" ]
                [ text "AFL Trade Calculator" ]
            , button [ style "right" "5px", style "position" "absolute", style "top" "5px", class "button is-small is-primary", onClick (ImportModal True) ] [ text "Import Hash" ]
            ]
        , div [ class "" ]
            [ table [ class "" ]
                [ tr [] <| List.map (\t -> td [ class "has-text-centered" ] [ img [ width 45, src ("svg/" ++ (String.words t.name |> List.head |> Maybe.withDefault "" |> String.toLower) ++ ".svg") ] [] ]) teams
                , tr [] <| List.map (\t -> td [ class "has-text-centered" ] [ input [ type_ "checkbox", onClick (TeamChecked t) ] [] ]) teams
                , tr [] <| List.map (\t -> td [ class "has-text-centered", style "padding" "5px", style "font-size" "0.75rem" ] [ text t.name ]) teams
                ]
            ]
        , hr [ style "margin-bottom" "2px" ] []
        , div [ class "column is-3", style "padding-bottom" "20px", style "padding-left" "0px" ]
            [ label [ class "label" ] [ text "Player Filter" ]
            , input [ type_ "text", class "input", onInput PlayerFilter ] []
            ]
        , div []
            [ div [ class "columns", style "overflow-x" "scroll" ] <|
                List.map
                    (\t ->
                        div [ class "column", style "min-width" "350px" ]
                            [ h5 [ class "title is-5", style "min-height" "44px", style "margin-bottom" "10px" ] [ text t.name ]
                            , div [] [ text "Picks: " ]
                            , tr [] <|
                                List.map
                                    (\p ->
                                        td [ style "padding" "5px" ]
                                            [ button
                                                [ class "button is-small"
                                                , onClick (PickChecked ( p, t.name ))
                                                , class
                                                    (case List.filter (\p2 -> p2 == p) (List.map Tuple.first model.picks_checked) |> List.length of
                                                        1 ->
                                                            "is-black"

                                                        _ ->
                                                            "is-outlined"
                                                    )
                                                ]
                                                [ text <| String.fromInt p ]
                                            ]
                                    )
                                    t.picks
                            , div [ style "overflow-x" "scroll", style "max-width" "300px", style "padding-left" "5px" ]
                                [ td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R1 2021")
                                        , class
                                            (if List.member ( "R1 2021", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R1 2021" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R2 2021")
                                        , class
                                            (if List.member ( "R2 2021", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R2 2021" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R3 2021")
                                        , class
                                            (if List.member ( "R3 2021", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R3 2021" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R4 2021")
                                        , class
                                            (if List.member ( "R4 2021", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R4 2021" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R1 2022")
                                        , class
                                            (if List.member ( "R1 2022", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R1 2022" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R2 2022")
                                        , class
                                            (if List.member ( "R2 2022", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R2 2022" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R3 2022")
                                        , class
                                            (if List.member ( "R3 2022", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R3 2022" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R4 2022")
                                        , class
                                            (if List.member ( "R4 2022", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R4 2022" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R1 2023")
                                        , class
                                            (if List.member ( "R1 2023", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R1 2023" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R2 2023")
                                        , class
                                            (if List.member ( "R2 2023", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R2 2023" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R3 2023")
                                        , class
                                            (if List.member ( "R3 2023", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R3 2023" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R4 2023")
                                        , class
                                            (if List.member ( "R4 2023", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R4 2023" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R1 2024")
                                        , class
                                            (if List.member ( "R1 2024", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R1 2024" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R2 2024")
                                        , class
                                            (if List.member ( "R2 2024", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R2 2024" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R3 2024")
                                        , class
                                            (if List.member ( "R3 2024", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R3 2024" ]
                                    ]
                                , td []
                                    [ button
                                        [ class "button is-small"
                                        , onClick (FuturePick t "R4 2024")
                                        , class
                                            (if List.member ( "R4 2024", t.name ) model.future_picks_checked then
                                                "is-black"

                                             else
                                                "is-outlined"
                                            )
                                        ]
                                        [ text "R4 2024" ]
                                    ]
                                ]
                            , div []
                                [ div [ style "max-height" "350px", style "overflow-y" "scroll", style "max-width" "300px" ] <|
                                    List.map
                                        (\pl ->
                                            tr []
                                                [ td [] [ text pl.name ]
                                                , td [ style "width" "5px" ] []
                                                , td [] [ input [ onClick (PlayerChecked pl), type_ "checkbox" ] [] ]
                                                ]
                                        )
                                    <|
                                        List.filter
                                            (\p ->
                                                -- if model.player_filter /= "" then
                                                String.contains model.player_filter p.name
                                             -- else
                                             --     True
                                            )
                                        <|
                                            List.filter (\p -> not <| List.member p.name retiredPlayers) <|
                                                List.reverse <|
                                                    List.sortBy .rat t.players
                                ]
                            ]
                    )
                <|
                    List.sortBy .name model.teams_checked
            ]
        , hr [] []
        , div []
            [ h4 [ class "title is-4" ] [ text "Pick & Player Pool" ]
            , table []
                [ tr [] <|
                    (List.map
                        (\p ->
                            td [ style "padding" "2.5px" ]
                                [ button
                                    [ class "button is-small is-outlined", style "width" "60px" ]
                                    [ text <| String.fromInt <| Tuple.first p ]
                                ]
                        )
                     <|
                        List.sort model.picks_checked
                    )
                        ++ (List.map
                                (\p ->
                                    td [ style "padding" "2.5px" ]
                                        [ button
                                            [ class "button is-small is-outlined" ]
                                            [ text <| (Tuple.second p |> String.words |> List.reverse |> List.head |> Maybe.withDefault "") ++ "' " ++ Tuple.first p ]
                                        ]
                                )
                            <|
                                List.sort model.future_picks_checked
                           )
                , tr [] <|
                    (List.map
                        (\p ->
                            td [ style "padding" "2.5px" ]
                                [ select [ class "select", style "width" "60px", onInput (PickGoing (Tuple.first p) (Tuple.second p)) ] <|
                                    List.map
                                        (\t ->
                                            option []
                                                [ text t ]
                                        )
                                    <|
                                        (++) [ "..." ] <|
                                            List.map (\n -> String.join "" <| List.map (String.left 1) <| String.words n.name) <|
                                                List.filter (\tc -> tc.name /= Tuple.second p) model.teams_checked
                                ]
                        )
                     <|
                        List.sort model.picks_checked
                    )
                        ++ (List.map
                                (\p ->
                                    td [ style "padding" "2.5px" ]
                                        [ select [ class "select", onInput (FuturePickGoing (Tuple.first p) (Tuple.second p)) ] <|
                                            List.map
                                                (\t ->
                                                    option []
                                                        [ text <| String.replace "Greater Western Sydney" "GWS" t ]
                                                )
                                            <|
                                                (++) [ "..." ] <|
                                                    List.map .name <|
                                                        List.filter (\tc -> tc.name /= Tuple.second p) model.teams_checked
                                        ]
                                )
                            <|
                                List.sort model.future_picks_checked
                           )
                ]
            , table [ class "table" ]
                [ tr [] <| List.map (\pl -> td [ style "padding" "5px", class "has-text-centered" ] [ img [ width 75, src (picLookup pl) ] [] ]) model.players_checked
                , tr [] <| List.map (\pl -> td [ style "padding" "5px", class "has-text-centered" ] [ text pl.name ]) model.players_checked
                , tr [] <|
                    List.map
                        (\pl ->
                            td [ style "padding" "5px", class "has-text-centered" ]
                                [ select [ class "select", onInput (PlayerGoing pl) ] <|
                                    List.map (\t -> option [] [ text <| String.replace "Greater Western Sydney" "GWS" t ]) <|
                                        (++) [ "Select One..." ] <|
                                            List.map .name <|
                                                List.filter (\tc -> tc.name /= pl.team) model.teams_checked
                                ]
                        )
                        model.players_checked
                ]
            ]
        , hr [] []
        , div []
            [ button [ class "button is-success", disabled (List.isEmpty model.picks_going && List.isEmpty model.players_going && List.isEmpty model.future_picks_going), onClick (ExportModal True) ] [ text "Overview" ] ]
        , div
            [ class "modal"
            , class
                (case ( model.import_modal, model.hash ) of
                    ( True, Nothing ) ->
                        "is-active"

                    _ ->
                        ""
                )
            ]
            [ div [ class "modal-background" ] []
            , div [ class "modal-card", style "min-width" "85vw", style "border-radius" "30px" ]
                [ textarea [ onInput ImportHash, class "textarea", value "", placeholder "Paste hash here." ] []
                ]
            , button [ class "modal-close is-large", onClick (ImportModal False) ] []
            ]
        , div
            [ class "modal"
            , class
                (if model.export_modal then
                    "is-active"

                 else
                    ""
                )
            ]
            [ div [ class "modal-background" ] []
            , div [ class "modal-card", style "min-width" "85vw", style "border-radius" "30px" ]
                [ let
                    teams_involved =
                        List.sort <|
                            LExtra.unique <|
                                List.map (\t -> String.replace "GWS" "Greater Western Sydney" t) <|
                                    List.map Tuple.second model.players_going
                                        ++ List.map Tuple.second model.picks_going
                                        ++ List.map (\pg -> Tuple.first pg |> Tuple.second) model.picks_going
                                        ++ List.map Tuple.second model.future_picks_going
                                        ++ List.map (\pg -> Tuple.first pg |> Tuple.second) model.future_picks_going
                  in
                  div [ class "modal-card-body" ]
                    [ div [ class "columns has-text-centered" ] <|
                        List.map
                            (\t ->
                                let
                                    gain_val =
                                        (toFloat <|
                                            List.sum <|
                                                List.map (\pg -> pickRat (Tuple.first pg |> Tuple.first) // 2) <|
                                                    List.filter (\pg -> Tuple.second pg == t) model.picks_going
                                        )
                                            + (List.sum <|
                                                List.map (\pg -> futurePickRat (Tuple.first pg |> Tuple.first)) <|
                                                    List.filter (\pg -> Tuple.second pg == t) model.future_picks_going
                                              )
                                            + (List.sum <|
                                                List.map (\pg -> (Tuple.first pg).rat) <|
                                                    List.filter (\pg -> Tuple.second pg == t) model.players_going
                                              )

                                    loss_val =
                                        (toFloat <|
                                            List.sum <|
                                                List.map (\pg -> pickRat (Tuple.first pg |> Tuple.first) // 2) <|
                                                    List.filter (\pg -> (Tuple.first pg |> Tuple.second) == t) model.picks_going
                                        )
                                            + (List.sum <|
                                                List.map (\pg -> futurePickRat (Tuple.first pg |> Tuple.first)) <|
                                                    List.filter (\pg -> (Tuple.first pg |> Tuple.second) == t) model.future_picks_going
                                              )
                                            + (List.sum <|
                                                List.map (\pg -> (Tuple.first pg).rat) <|
                                                    List.filter (\pg -> (Tuple.first pg).team == t) model.players_going
                                              )
                                in
                                div [ class "column" ]
                                    [ h4 [ class "title is-4", style "min-height" "54px", style "margin-bottom" "0px" ] [ text t ]
                                    , img [ width 80, src ("svg/" ++ (String.words t |> List.head |> Maybe.withDefault "" |> String.toLower) ++ ".svg") ] []
                                    , hr [] []
                                    , div [ class "columns" ]
                                        [ div [ class "column", style "background-color" "lightpink", style "min-height" "35vh" ]
                                            ([ h5 [ class "title is-5" ] [ text "Lose" ]
                                             ]
                                                ++ ((List.map (\pick -> p [ class "has-text-centered" ] [ text <| String.fromInt <| Tuple.first <| Tuple.first pick ]) <|
                                                        List.filter (\pg -> (Tuple.first pg |> Tuple.second) == t) model.picks_going
                                                    )
                                                        ++ (List.map (\pick -> p [ class "has-text-centered" ] [ text <| "Their " ++ (Tuple.first <| Tuple.first pick) ]) <|
                                                                List.filter (\pg -> (Tuple.first pg |> Tuple.second) == t) model.future_picks_going
                                                           )
                                                        ++ (List.map (\pg -> p [ class "has-text-centered" ] [ text <| (Tuple.first pg).name ++ " (" ++ positionPretty (Tuple.first pg).pos ++ ")" ]) <| List.filter (\p -> (Tuple.first p).team == t) model.players_going)
                                                        |> List.intersperse (br [] [])
                                                   )
                                            )
                                        , div [ class "column", style "background-color" "lightgreen", style "min-height" "35vh" ]
                                            ([ h5 [ class "title is-5" ] [ text "Gain" ]
                                             ]
                                                ++ ((List.map (\pick -> p [ class "has-text-centered" ] [ text <| String.fromInt <| Tuple.first <| Tuple.first pick ]) <| List.filter (\pg -> Tuple.second pg == t) model.picks_going)
                                                        ++ (List.map (\pick -> p [ class "has-text-centered" ] [ text <| (Tuple.first pick |> Tuple.second |> String.words |> List.reverse |> List.head |> Maybe.withDefault "") ++ "' " ++ (Tuple.first <| Tuple.first pick) ]) <| List.filter (\pg -> Tuple.second pg == t) model.future_picks_going)
                                                        ++ (List.map (\pg -> p [ class "has-text-centered" ] [ text <| (Tuple.first pg).name ++ " (" ++ positionPretty (Tuple.first pg).pos ++ ")" ]) <| List.filter (\pg -> Tuple.second pg == t) model.players_going)
                                                        |> List.intersperse (br [] [])
                                                   )
                                            )
                                        ]
                                    , div [ title (String.fromFloat <| gain_val - loss_val) ] [ text <| "Net Value: " ++ (String.fromInt <| round <| gain_val - loss_val) ]
                                    ]
                            )
                            teams_involved
                    , div [] [ text "Net value is calculated from the AFL Player Ratings for players, and the Draft Pick Value Chart for picks." ]
                    , div [ style "display" "flex" ]
                        [ button [ class "button is-link is-small", onClick CalculateHash ] [ text "Copy hash to clipboard." ]
                        , p
                            [ style "padding-left" "5px"
                            , style "font-size" "0.8rem"
                            , style "padding-top" "10px"
                            , style "color"
                                (case model.copied of
                                    Just _ ->
                                        "green"

                                    Nothing ->
                                        "black"
                                )
                            ]
                            [ text
                                (case model.copied of
                                    Just str ->
                                        "Copied Hash of " ++ (String.fromInt <| (String.length str // 1000)) ++ "kb size to clipboard."

                                    Nothing ->
                                        "This produces a compressed string of the current trade, it is recommended to share this via a pastebin."
                                )
                            ]
                        ]
                    ]
                ]
            , button [ class "modal-close is-large", onClick (ExportModal False) ] []
            ]
        , tr [ style "position" "fixed", style "padding-bottom" "10px", style "bottom" "0px", style "background-color" "white" ] [ td [ style "vertical-align" "middle" ] [ text "v1.0.1, Developed by Durfsurn, 2020" ], td [ style "width" "5px" ] [], td [] [ a [ class "button is-link is-small", href "mailto:durfsurn@gmail.com" ] [ text "Report Issues ⚠️" ] ] ]
        ]
