/*
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
*/


async function openExam(caseId){

  showLoading();

  try{

    const response =
      await fetch(
        `${PostTest_URL}
        ?action=getExam
        &caseId=${caseId}`
      );

    const exam =
      await response.json();

    renderExamInfo(exam);

  }
  finally{

    hideLoading();

  }

}


function renderExamInfo(exam){

  const content =
    document.getElementById(
      'pageContent'
    );

  content.innerHTML = `

  <div class="exam-container">

    <div class="exam-header">

      <h2>
        ${exam.title}
      </h2>

    </div>

    <div class="exam-pdf">

      <iframe
        src="${exam.pdf}"
        loading="lazy">
      </iframe>

    </div>

    <div class="exam-info">

      <div class="info-card">
        ⏱ Duration
        <strong>
          ${exam.duration} Min
        </strong>
      </div>

      <div class="info-card">
        🎯 Passing
        <strong>
          ${exam.passing}
        </strong>
      </div>

      <div class="info-card">
        ❓ Questions
        <strong>
          ${exam.totalQuestion}
        </strong>
      </div>

    </div>

    <div id="examStatus">
      ${renderExamStatus(exam)}
    </div>

  </div>

  `;

}


function renderExamStatus(exam){

  if(exam.passed){

    return `

    <div class="exam-result passed">

      <h3>
        ✅ PASSED
      </h3>

      <p>
        Score :
        ${exam.lastScore}
      </p>

      <button
        class="btn-primary"
        disabled
      >
        Exam Completed
      </button>

    </div>

    `;

  }

  return `

  <button
    class="btn-primary"
    onclick="
      startExam(
        '${exam.caseId}'
      )
    "
  >
    🚀 Start Exam
  </button>

  `;

}

function renderQuestionPage(data){

  const content =
    document.getElementById(
      'pageContent'
    );

  content.innerHTML = `

  <div class="exam-running">

    <div class="exam-topbar">

      <div>
        ${data.title}
      </div>

      <div
        id="examTimer"
        class="exam-timer">
      </div>

    </div>

    <div id="questionContainer">
    </div>

    <div class="submit-area">

      <button
        class="btn-primary"
        onclick="submitExam()">
        Submit Exam
      </button>

    </div>

  </div>

  `;

  renderQuestions(
    data.questions
  );

  startTimer(
    data.remaining
  );

}


function renderQuestions(
  questions
){

  const container =
    document.getElementById(
      'questionContainer'
    );

  container.innerHTML='';

  questions.forEach(
    (q,index)=>{

      container.innerHTML += `

      <div class="question-card">

        <div class="question-header">

          <span>
            Question ${index+1}
          </span>

          <span class="weight">

            ⭐ ${q.weight} Point

          </span>

        </div>

        <div class="question-text">

          ${q.question}

        </div>

        <label>
          <input
            type="radio"
            name="${q.id}"
            value="A"
            onchange="
            saveAnswer(
              '${q.id}',
              'A'
            )">
          ${q.A}
        </label>

        <label>
          <input
            type="radio"
            name="${q.id}"
            value="B"
            onchange="
            saveAnswer(
              '${q.id}',
              'B'
            )">
          ${q.B}
        </label>

        <label>
          <input
            type="radio"
            name="${q.id}"
            value="C"
            onchange="
            saveAnswer(
              '${q.id}',
              'C'
            )">
          ${q.C}
        </label>

        <label>
          <input
            type="radio"
            name="${q.id}"
            value="D"
            onchange="
            saveAnswer(
              '${q.id}',
              'D'
            )">
          ${q.D}
        </label>

      </div>

      `;

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



async function saveAnswer(){

  await apiPost({

    action:'saveAnswer',

    sessionId,

    questionId,

    answer

  });

}

