document
.querySelectorAll(
 'input[type=radio]'
)
.forEach(x=>{

 x.addEventListener(
  'change',
  saveAnswer
 );

});

async function openExam(caseId){

  const exam =
    await apiGet({

      action:'getExam',

      caseId

    });

}

const session =
 await apiGet({

   action:'checkSession',

   user:currentUser.username,

   caseId

 });

const result =
 await apiGet({

   action:'startExam',

   user:currentUser.username,

   caseId

 });

function renderExam(data){

  const html = `
  
    <div class="exam-header">

      <h2>
        ${data.title}
      </h2>

      <div id="timer">
      </div>

    </div>

    <iframe
      src="${data.pdf}">
    </iframe>

    <div id="questionArea">
    </div>

  `;

  pageContent.innerHTML =
    html;

}

function renderQuestions(list){

  const area =
    document.getElementById(
      'questionArea'
    );

  area.innerHTML='';

  list.forEach((q,index)=>{

    area.innerHTML += `

      <div class="question-card">

        <h4>
          ${index+1}.
        </h4>

        <div>
          ${q.question}
        </div>

      </div>

    `;

  });

}

async function saveAnswer(){

  await apiPost({

    action:'saveAnswer',

    sessionId,

    questionId,

    answer

  });

}

async function checkRunningExam(){

  const result =
    await apiGet({

      action:'runningExam',

      user:currentUser.username

    });

  if(result.hasExam){

    resumeExam(
      result.sessionId
    );

  }

}
