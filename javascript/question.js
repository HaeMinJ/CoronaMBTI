let questionList = new Array(4);
for(let i = 0 ; i < questionList.length ; i++){
    questionList[i] = new Array(5);
    for(let j = 0; j < questionList[i].length ; j++){
        questionList[i][j]=`${i}+${j}`;
    }
}
let [ei, sn, tf, jp] = [0,0,0,0];
let count = 0;

var nextButton = new Vue({

});

var q = new Vue({
    el: ".question",
    data:{
        questions : ['1','2','3','4','5']

    },
    method : {
        nextQuestion : function () {
            for (question in questionList){
                data.questions.push({message:question});
                console.log(question);
            }
        }
    },
    created : function () {
        q.computed.nextQuestion();
    }
});