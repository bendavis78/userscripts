// ==UserScript==
// @name         Walmart Grants Macro
// @namespace    http://boldidea.org/walmart-grants-macro
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.cybergrants.com/pls/cybergrants/*
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==
/* jshint -W097 */
'use strict';
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var $id = document.getElementById.bind(document);

var progTitle, header;

var AUTO_ADVANCE = !!parseInt(localStorage.getItem('autoAdvance')) || false;
console.log('autoAdvance: ', AUTO_ADVANCE);

var $linkBar = $id('cglinkbar');
if ($linkBar) {
    var checked = AUTO_ADVANCE ? ' checked' : '';
    $linkBar.style.display = 'flex';
    $linkBar.style.justifyContent = 'space-between';
    $linkBar.style.alignItems = 'center';
    $linkBar.innerHTML = '<div><input type="checkbox" id="autoAdvance"' + checked + '><label for="autoAdvance">Auto Advance</label></div><div>' + $linkBar.innerHTML + '</div>';
    var $autoAdvance = $id('autoAdvance');
    $autoAdvance.style.marginRight = '4px';
    $autoAdvance.addEventListener('change', function(event) {
        localStorage.setItem('autoAdvance', event.target.checked ? 1 : 0);
        AUTO_ADVANCE = event.target.checked;
    });
    
    var $unsubmittedHeader = $('.unsubmitted_history thead');
    if ($unsubmittedHeader) {
        var $newRow = document.createElement('tr');
        $newRow.innerHTML = '<td colspan="4" align="center" style="text-align: center"><button id="processUnsubmitted">Process All Applications</button></td>';
        $unsubmittedHeader.appendChild($newRow);
        var $processBtn = $id('processUnsubmitted');
        $processBtn.addEventListener('click', function() {
            localStorage.setItem('autoAdvance', 1);
            localStorage.setItem('processUnsubmitted', 1);
            window.location.reload();
        });
    }
}

function match(query, pattern) {
    return function() {
        var el = $(query);
        return el && el.textContent.match(pattern);
    };
}

function matchAll(matches) {
    return function() {
        for (var query in matches) {
            if (!match(query, matches[query])()) {
                return false;
            }
        }
        return true;
    };
}

function header(pattern) {
    return matchAll({
        '#lhprogtitle': /Community Grant Program/,
        'h2.headerCell': pattern
    });
}

function quiz(pattern) {
    return matchAll({
        '#lhprogtitle': /Apply for Grants/,
        'td.cell': pattern
    });
}

function submit(btn) {
    if (AUTO_ADVANCE) {
        $(btn).click();
    }
}

var pages = {
    quiz1: {
        match: quiz(/directly benefit the communities/),
        macro: function() {
            $('input[name=x_yes]').click();
        }
    },
    quiz2: {
        match: quiz(/areas of focus does your proposed program fall/),
        macro: function() {
            $('select[name=x_answer]').value = '35875822'; // Strengthening local communities
            $id('primaryAction').click();
            
        }
    },
    quiz3: {
        match: quiz(/select the option that best describes your organization/),
        macro: function() {
            $('select[name=x_answer]').value = '256784'; // Option 1
            $id('primaryAction').click();
        }
    },
    quiz5: {
        match: quiz(/for any of the organizations listed below\?/),
        macro: function() {
            $id('CG256794').checked = true; // None
            $id('primaryAction').click();
        }
    },
    quiz6: {
        match: quiz(/for funding for any of the following\?/),
        macro: function() {
            $id('CG256808').checked = true; // None
            $id('primaryAction').click();
        }
    },
    quiz7: {
        match: quiz(/plan to request less than/),
        macro: function() {
            $('input[name=x_no]').click();
        }
    },
    quiz8: {
        match: quiz(/Thank you for taking the time/),
        macro: function() {
            $('#cgcontent .text center a').click();
        }
    },
    welcome: {
        match: match('td.headerCell', /Applications Requiring Action/),
        macro: function() {
            var $headerCell = $('.cgportlet.unsubmitted_history td.headerCell');
            $headerCell.innerHTML = '<button id="updateAll">Update All</button>' + $headerCell.innerHTML;
        }
    },
    contactInfo: {
        match: header(/Contact Information/),
        macro: function() {
            $$('#XCONTACTID')[0].checked = true; // First contact
            $$('#XCONTACTID')[1].checked = true; // Second contact
            submit('#primaryAction');
        }
    },
    orgInfo: {
        match: header(/Organization Information/),
        macro: function() {
            submit('#primaryAction');
        }
    },
    prevFunding: {
        match: header(/Request History/),
        macro: function() {
            // Previous funding requests - All Locations
            $('#CG369636').value = '270062'; // "More than 20"
            
            // Previous funding - All Locations
            $('#CG369635').value = '270053'; // N/A
            
            // Previous funding - This Location
            $('#CG222957').value = 'N';
            
            submit('#primaryAction');
        }
    },
    areaOfFocus: {
        match: header(/Area of Focus/),
        macro: function() {
            $('#CG532584').value = '35875846'; // Strengthening local communities
            $('#CG532586').value = '38000332'; // Education
            submit('#primaryAction');
            if (!!parseInt(localStorage.getItem('samsClub'))) {
                $('#CG369640').value = '369640|270064'; // Youth Entrepreneurship Education
            }
        }
    },
    communityServed: {
        match: header(/Community Served/),
        macro: function() {
            // Area Served
            $id('CG222950.select').innerHTML = '';
            $id('CG222950.entry').value = 'Dallas';
            $('input[value="Add to List"]').click();
            $id('CG222950.entry').value = 'Collin';
            $('input[value="Add to List"]').click();
            
            // People Served
            $id('CG322080').value = '72';
            
            // Gender
            $id('CG417618|33497215').value = '28'; // Male
            $id('CG417618|33497216').value = '44'; // Female
            $id('CG417618|33497216').onkeyup();
            
            // Age Group
            $id('CG417619|33497218').value = '72'; // Children (0-12)
            $id('CG417619|33497218').onkeyup();
            
            // Ethnic Background
            $id('CG417620|33497224').value = '16'; // Black
            $id('CG417620|33497225').value = '16'; // Asian
            $id('CG417620|33497226').value = '16'; // Hispanic
            $id('CG417620|33497229').value = '24'; // White
            $id('CG417620|33497229').onkeyup();
            
            submit('#primaryAction');
        }
    },
    programInfo: {
        match: header(/Program Information/),
        macro: function() {
            // Requested Grant Amount
            $id('CG171402').value = '750';
            $id('CG171402').onchange();
            
            // Program Description
            $id('CG222941').value = 'ideaSpark is an after-school program for 1st - 8th grade students in Dallas and Collin Counties. The program provides education in coding, computer science and community activism combined with a team-based process to build technology that addresses community issues. Students also develop skills necessary to succeed in the 21st century including critical thinking and problem solving, innovation and creativity, and teamwork and collaboration. Students will join a team with up to seven of their peers. Teams meet weekly to learn together and work on projects together, all alongside mentors – many of whom are professional coders. Our goal is to help Dallas-area students realize that even though they are young they have the ability to make an impact in their community. The technology building blocks to do that – code – are accessible to them. Each mini-mester students will complete a small project together that demonstrates both problem solving and their knowledge of the concepts taught over the past several weeks. In addition to fun, ourlearning model is project-based, peer-supported and focused on outcomes. At the end of the program, students will be able to work collaboratively in a group to code a project; understand how to help teammates during challenges and achieve a team goal; learn the basics of important coding concepts, such as algorithms, functions, variables and boolean logic; develop commitment and perseverance through multi-week projects; solve open-ended questions with more than one solution and develop creative confidence in solutions they come up with; and identify and understand issues in their community and how to design technology solutions.';
            $id('CG222941').onchange();
            
            // Fund Use
            $id('CG323590').value = 'The ideaSpark program, purchasing of student supplies and lowering the program fee for participating students. We plan to purchase 20 laptop computers for the spring 2016 program, as well as USB flash drives and binder notebooks for students.';
            $id('CG323590').onchange();
            
            // Program Relevancy
            $id('CG357075').value = 'The ideaSpark program engages students in STEM (science, technology, engineering and math) education in a unique and meaningful way, specifically through out-of-school support and academic achievement. As we mentor students in a team environment, they will develop skills that build a foundation in lifelong learning, including computational thinking, problem solving, collaboration and creative confidence. Further, computer science (CS) education emphasizes active learning, creativity and exploration, typically embedded within other curricular areas such as social science, language arts, mathematics and science. As a result, CS skills can have an impact on studentachievement in these subjects as well. Studies have shown a correlation between participation in CS courses to significant gains in math and reading scores, especially among low-income students (source: Code.org). Further, research suggests that outside experiences have just as much impact on a child’s life as the classroom ones. ideaSpark presents CS in the larger context of social impact, providing a motivation to continue learning a challenging subject, while developing skills in social activism, an area that the generation under 17 has shown an active interest.';
            
            submit('#primaryAction');
        }
    },
    agreement: {
        match: header(/Agreement/),
        macro: function() {
            $id('CG353630_251388').checked = true;
            submit('#primaryAction');
        }
    },
    review: {
        match: match('.gsUi .headerCell', /Review Your Application/),
        macro: function() {
            if (!!(parseInt(localStorage.getItem('processUnsubmitted')))) {
                submit('#primaryAction');
            } else {
                submit('#cgsaveonly');
            }
        }
    },
    receipt: {
        match: match('#cgcontent .headerCell', /Confirmation of Application Receipt/),
        macro: function() {
            $id('cgIntro').querySelector('a.cglink').click();
        }
    },
    index: {
        match: match('.unsubmitted_history .headerCell', /Applications Requiring Action/),
        macro: function() {
            if (!!(parseInt(localStorage.getItem('processUnsubmitted')))) {
                var $appLink = $('.unsubmitted_history a.cglink');
                if ($appLink) {
                    $appLink.click();
                } else {
                    localStorage.removeItem('processUnsubmitted');
                }
            }
        }
    }
};
unsafeWindow.confirm = function() {return true;}

function jump(toStep) {
    document.sectionform.x_step.value = toStep;
    document.sectionform.ignore_errors.value = "Y";
    document.sectionform.submit();
}

var page;
for (var key in pages) {
    page = pages[key];
    if (page && page.match && page.match()) {
        console.log('running macro: ', key);
        page.macro();
    }
}
