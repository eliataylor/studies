<?php

class Solution {
    private $_nums;
    function __construct($nums) {
        $this->_nums = $nums;
    }

    /**
     * @return Integer[]
     */
    function reset() {
        return $this->_nums;
    }

    /**
     * @return Integer[]
     */
    function shuffle() {
        $shuffled = [];
        $copy = $this->_nums;
        while (sizeof($copy) > 0) {
            $randomIndex = rand(0, count($copy)-1);
            $val = array_splice($copy, $randomIndex, 1)[0];
            $shuffled[] = $val;
        }
        return $shuffled;

    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * $obj = Solution($nums);
 * $ret_1 = $obj->reset();
 * $ret_2 = $obj->shuffle();
 */