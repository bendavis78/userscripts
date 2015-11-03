// ==UserScript==
// @name         StackOverflow Top Answer First
// @namespace    http://bendavis.net/userscripts/so-top-answer-first
// @version      0.1
// @description  Show the top-voted answer first, ignoring op's selected answer
// @author       Ben Davis <bendavis78@gmail.com>
// @match        http://stackoverflow.com/questions/*
// @run-at       document-idle
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
var $ = document.querySelector.bind(document);
var $accepted = $('div.accepted-answer');
var $topLink = $('div.accepted-answer ~ a');
var $top = $('div.accepted-answer ~ a ~ div.answer');
var $parent = $top.parentNode;
$topLink.remove();
$top.remove();
$parent.insertBefore($top, $accepted);
$parent.insertBefore($topLink, $top);
