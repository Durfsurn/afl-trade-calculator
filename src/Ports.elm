port module Ports exposing (..)


port copy : String -> Cmd msg


port copyDone : (String -> msg) -> Sub msg
