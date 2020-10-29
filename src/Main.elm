module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import List.Extra as LExtra
import Teams exposing (..)



-- MAIN


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


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
    , players_checked : List Player
    , picks_going : List ( ( Int, String ), String )
    , players_going : List ( Player, String )
    , export_modal : Bool
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { teams_checked = []
      , picks_checked = []
      , players_checked = []
      , picks_going = []
      , players_going = []
      , export_modal = False
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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        PlayerChecked player ->
            case List.filter (\p -> p == player) model.players_checked |> List.length of
                1 ->
                    ( { model | players_checked = List.filter (\p -> p /= player) model.players_checked }, Cmd.none )

                _ ->
                    ( { model | players_checked = player :: model.players_checked }, Cmd.none )

        PickChecked pick ->
            case List.filter (\p -> p == pick) model.picks_checked |> List.length of
                1 ->
                    ( { model | picks_checked = List.filter (\p -> p /= pick) model.picks_checked }, Cmd.none )

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
            ( { model | export_modal = state }, Cmd.none )


view : Model -> Html Msg
view model =
    div [ class "section" ]
        [ h1 [ class "title is-1" ]
            [ text "AFL Trade Calculator" ]
        , div [ class "" ]
            [ table [ class "" ]
                [ tr [] <| List.map (\t -> td [ class "has-text-centered" ] [ img [ width 45, src ("svg/" ++ (String.words t.name |> List.head |> Maybe.withDefault "" |> String.toLower) ++ ".svg") ] [] ]) teams
                , tr [] <| List.map (\t -> td [ class "has-text-centered" ] [ input [ type_ "checkbox", onClick (TeamChecked t) ] [] ]) teams
                , tr [] <| List.map (\t -> td [ class "has-text-centered", style "padding" "5px", style "font-size" "0.75rem" ] [ text t.name ]) teams
                ]
            ]
        , hr [] []
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
                    List.map
                        (\p ->
                            td [ style "padding" "2.5px" ]
                                [ button
                                    [ class "button is-small is-outlined", style "width" "60px" ]
                                    [ text <| String.fromInt <| Tuple.first p ]
                                ]
                        )
                    <|
                        List.sort model.picks_checked
                , tr [] <|
                    List.map
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
            [ button [ class "button is-success", disabled (List.isEmpty model.picks_going && List.isEmpty model.players_going), onClick (ExportModal True) ] [ text "Overview" ] ]
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
                        LExtra.unique <|
                            List.map (\t -> String.replace "GWS" "Greater Western Sydney" t) <|
                                List.map Tuple.second model.players_going
                                    ++ List.map Tuple.second model.picks_going
                  in
                  div [ class "modal-card-body" ]
                    [ div [ class "columns has-text-centered" ] <|
                        List.map
                            (\t ->
                                let
                                    gain_val =
                                        (toFloat <|
                                            List.sum <|
                                                List.map (\pg -> pickRat (Tuple.first pg |> Tuple.first)) <|
                                                    List.filter (\pg -> Tuple.second pg == t) model.picks_going
                                        )
                                            + (List.sum <|
                                                List.map (\pg -> (Tuple.first pg).rat) <|
                                                    List.filter (\pg -> Tuple.second pg == t) model.players_going
                                              )

                                    loss_val =
                                        (toFloat <|
                                            List.sum <|
                                                List.map (\pg -> pickRat (Tuple.first pg |> Tuple.first)) <|
                                                    List.filter (\pg -> (Tuple.first pg |> Tuple.second) == t) model.picks_going
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
                                        [ div [ class "column", style "background-color" "lightpink", style "min-height" "25vh" ]
                                            ([ h5 [ class "title is-5" ] [ text "Lose" ]
                                             ]
                                                ++ ((List.map (\pick -> p [ class "has-text-centered" ] [ text <| String.fromInt <| Tuple.first <| Tuple.first pick ]) <|
                                                        List.filter (\pg -> (Tuple.first pg |> Tuple.second) == t) model.picks_going
                                                    )
                                                        ++ (List.map (\pg -> p [ class "has-text-centered" ] [ text <| (Tuple.first pg).name ++ " (" ++ positionPretty (Tuple.first pg).pos ++ ")" ]) <| List.filter (\p -> (Tuple.first p).team == t) model.players_going)
                                                        |> List.intersperse (br [] [])
                                                   )
                                            )
                                        , div [ class "column", style "background-color" "lightgreen", style "min-height" "25vh" ]
                                            ([ h5 [ class "title is-5" ] [ text "Gain" ]
                                             ]
                                                ++ ((List.map (\pick -> p [ class "has-text-centered" ] [ text <| String.fromInt <| Tuple.first <| Tuple.first pick ]) <| List.filter (\pg -> Tuple.second pg == t) model.picks_going)
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
                    ]
                ]
            , button [ class "modal-close is-large", onClick (ExportModal False) ] []
            ]
        , tr [ style "position" "fixed", style "bottom" "10px" ] [ td [ style "vertical-align" "middle" ] [ text "Developed by Durfsurn, 2020" ], td [ style "width" "5px" ] [], td [] [ a [ class "button is-link is-small", href "mailto:durfsurn@gmail.com" ] [ text "Report Issues ⚠️" ] ] ]
        ]
