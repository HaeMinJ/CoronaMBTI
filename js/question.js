var startPageIdx = 0;
var answerStatus = {
    e: 0,
    s: 0,
    t: 0,
    j: 0
} // 동의 +3 ~ -3 비동의

function onNextClicked() {
    var p = document.getElementById("pg");
    p.value = p.value + 25;
    document.getElementById('pg').value = p.value;
    app.questions.forEach(function (question) {
        switch (question.type) {
            case 0:
                answerStatus.e += Number.parseInt(question.status, 0);
                break;
            case 1:
                answerStatus.s += Number.parseInt(question.status, 0);
                break;
            case 2:
                answerStatus.t += Number.parseInt(question.status, 0);
                break;
            case 3:
                answerStatus.j += Number.parseInt(question.status, 0);
                break;
        }

    });
    startPageIdx++;
    getJson(startPageIdx);
    if (startPageIdx == 3) {
        document.getElementById('nextButton').innerHTML = "<span>완료</span>";
        document.getElementById('nextButton').onclick = onCompleteClicked;
    }
    for (let el of document.getElementsByClassName('radio')) {
        el.classList.remove('selected');
    }

    for (let el of document.getElementsByClassName('neutral')) {
        el.classList.add('selected');
    }
    window.scrollTo(0, 0);
}

function onCompleteClicked() {

    app.questions.forEach(function (question) {
        switch (question.type) {
            case 0:
                answerStatus.e += Number.parseInt(question.status, 0);
                break;
            case 1:
                answerStatus.s += Number.parseInt(question.status, 0);
                break;
            case 2:
                answerStatus.t += Number.parseInt(question.status, 0);
                break;
            case 3:
                answerStatus.j += Number.parseInt(question.status, 0);
                break;
        }

    });

    location.href = './mbti_result.html?e=' + answerStatus.e + '&s=' + answerStatus.s + "&t=" + answerStatus.t + "&j=" + answerStatus.j;
    console.log("E : " + answerStatus.e + " S : " + answerStatus.s + " T :" + answerStatus.t + " J :" + answerStatus.j);
}

function optionClicked(event, item, option) {
    item.status = option;
    for (let el of event.target.parentElement.getElementsByClassName('radio')) {
        el.classList.remove('selected');
    }
    event.target.classList.add('selected');
}

function getJson(startPage) {
    fetch('http://static-yojongdo.coronambti.com/json/' + 'mbti_page' + startPage + '.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            app.questions = data;
        });
}

Vue.component('question-item', {
    props: ['question'],
    template: '<div class = "question_container"><div class="statement">' +
        '            <!--질문멘트-->{{ question.statement }}' +
        '        </div>' +
        '        <div class="decision">' +
        '            <span class="captionAgree">동의</span>' +
        '            <div class="options">' +
        '                <div class="agreeMax radio agree" v-on:click="optionClicked($event, question,3)"><span class="check" ></span></div>' +
        '                <div class="agreeMed radio agree" v-on:click="optionClicked($event, question,2)"><span class="check"></span></div>' +
        '                <div class="agreeMin radio agree" v-on:click="optionClicked($event, question,1)"><span class="check"></span></div>' +
        '                <div class="neutral radio selected" v-on:click="optionClicked($event, question,0)"><span class="check"></span></div>' +
        '                <div class="disagreeMin radio disagree" v-on:click="optionClicked($event, question,-1)"><span class="check"></span></div>' +
        '                <div class="disagreeMed radio disagree" v-on:click="optionClicked($event, question,-2)"><span class="check"></span></div>' +
        '                <div class="disagreeMax radio disagree" v-on:click="optionClicked($event, question,-3)"><span class="check"></span></div>' +
        '            </div>' +
        '            <span class="captionDisagree">비동의</span>' +
        '        </div>' +
        '        <hr/></div>'
});
var app = new Vue({
    el: '.question',
    data: {
        questions: []
    }
})

getJson(startPageIdx);