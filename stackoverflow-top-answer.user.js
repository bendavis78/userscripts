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

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var $counts = $$('.answer .vote-count-post');
var bestId;
for (var $count, i=0; ($count=$counts[i]); i++) {
  if ($count.innerText.trim()) {
    bestId = $count.parentElement.querySelector('input[name="_id_"]').getAttribute('value');
    break;
  }
}
var topId = $('.answer').id.replace(/^answer-/, '');
if (topId != bestId) {
    var $topLink = $('a[name="' + $('.answer').id + '"]');
    var $best = $('#answer-' + bestId);
    var $bestLink = $('a[name="' + bestId + '"]');
    $bestLink.remove();
    $best.remove();
    var $answers = $('#answers');
    $answers.insertBefore($best, $topLink);
    $answers.insertBefore($bestLink, $best);
}
