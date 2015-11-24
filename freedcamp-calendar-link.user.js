// ==UserScript==
// @name         Freedcamp Calendar Link
// @namespace    http://bendavis.net/userscripts/freedcamp-calendar-link
// @version      0.1
// @description  Show the global calendar link in the main toolbar
// @author       Ben Davis <bendavis78@gmail.com>
// @match        http://freedcamp.com/*
// @run-at       document-idle
// ==/UserScript==
/* jshint -W097 */
'use strict';

var $ = document.querySelector.bind(document);

var $ul = $('.fc-user-actions ul.app');

var $link = document.createElement('link');
$link.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css';
$link.rel = 'stylesheet';
$link.type = 'text/css';
(document.head||document.documentElement).appendChild($link);

function addButton(icon, name, href) {
  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa fa-' + icon);
  $icon.style.color = '#fff';

  var $a = document.createElement('a');
  $a.appendChild($icon);
  $a.setAttribute('href', href);
  $a.dataset.tip = name;

  var $li = document.createElement('li');
  $li.appendChild($a);
  $ul.appendChild($li);
}

addButton('calendar', 'Calendar', 'https://freedcamp.com/dashboard/calendar');
