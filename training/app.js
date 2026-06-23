// ========================================
// START APP
// ========================================
document.addEventListener(
  'DOMContentLoaded',
  initApp
);

async function initApp(){

  restoreSession();

  await loadExamMenu();

}

// ========================================
// LOAD EXAM MENU
// ========================================
async function loadExamMenu() {

  try {

    const response =
      await fetch(
        `${PostTest_URL}?action=listExam`
      );

    const exams =
      await response.json();

    const submenu =
      document.getElementById(
        'examSubmenu'
      );

    if(!submenu) return;

    submenu.innerHTML='';

    exams.forEach(exam=>{

      submenu.innerHTML += `

      <a
        href="#"
        class="exam-link"
        data-case="${exam.caseId}"
        title="${exam.title}">

        ${exam.caseId}

      </a>

      `;

    });

    document
      .querySelectorAll('.exam-link')
      .forEach(link=>{

        link.addEventListener(
          'click',
          e=>{

            e.preventDefault();

            openExam(
              link.dataset.case
            );

          }
        );

      });

  }

  catch(error){

    console.error(
      'Load Exam Error',
      error
    );

  }

}
