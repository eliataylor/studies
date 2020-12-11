<?php

function messageFromBinaryCode2($code) {
    $letters = str_split($code, 8);
    foreach($letters as $letter)
        $text .= chr(bindec($letter));
    return $text;
}

function messageFromBinaryCode($code) {
    if(!$code) return "";
    $subStr = substr($code, 0, 8);
    $char = chr(bindec($subStr));
    $code = substr_replace($code, '', 0, 8);
    return $char . messageFromBinaryCode($code);
}
