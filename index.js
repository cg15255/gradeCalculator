const state = {
  clickedToSecondScreen: false,
  knowCurrentGrade: false,
};

const app = document.querySelector('.app');

const knowCurrentGradeHTML = `
    <span class="goBack"><a href="/">&laquo;</a></span>
        <div class="top-card">
          <h1>Your Final Mark</h1>
          <h2 class="finalPercent">100%</h2>
          <div class="current-grade input-label-group">
            <label for="currentGrade">Current Grade</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                name="currentGrade"
                id="currentGrade"
                value="100"
              />
              <span class="input-after">%</span>
            </div>
          </div>
        </div>

        <h1>FINAL EXAM</h1>
        <div class="bottom-card">
          <div class="input-label-group">
            <label for="estimatedGrade">What you think you'll get</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value="100"
                name="estimatedGrade"
                id="estimatedGrade"
              />
              <span class="input-after">%</span>
            </div>
          </div>
          <div class="input-label-group">
            <label for="finalWeight">What it's worth</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value="20"
                name="finalWeight"
                id="finalWeight"
              />
              <span class="input-after">%</span>
            </div>
          </div>
        </div>
`;

const dontKnowCurrentGradeHTML = `
     <span class="goBack"><a href="/">&laquo;</a></span>
        <div class="top-card">
          <h1>Your Final Mark</h1>
          <h2 class="finalPercent">100%</h2>
          <div class="marks">
            <div class="mark-row">
              <h4>Mark <span class="markNumber">1</span></h4>
              <div class="what-you-got input-label-group">
                <label>What you got</label>
                <div class="input-group">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value="100"
                    class="whatYouGot"
                  />
                  <span class="input-after">%</span>
                </div>
                <!-- input-group-->
              </div>
              <!-- input-label-group-->
              <div class="what-you-got input-label-group">
                <label>What it's Worth</label>
                <div class="input-group">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value="100"
                    class="whatItsWorth"
                  />
                  <span class="input-after">%</span>
                </div>
                <!-- input-group-->
              </div>
              <!-- input-label-group-->
            </div>
          </div>
          <!-- marks-->
        </div>
        <!-- top-card-->

        <h1>FINAL EXAMS</h1>
        <div class="bottom-card">
          <div class="input-label-group">
            <label for="estimatedGrade">What you think you'll get</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                name="estimatedGrade"
                id="estimatedGrade"
                value="100"
              />
              <span class="input-after">%</span>
            </div>
          </div>
          <div class="input-label-group">
            <label for="finalWeight">What it's worth</label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                name="finalWeight"
                id="finalWeight"
                value="100"
              />
              <span class="input-after">%</span>
            </div>
          </div>
        </div>
        <button class="addMark">+ Add Mark</button>
`;

const additionalMarkRow = `
  <!-- mark-row-->
  <div class="mark-row">
    <h4>Mark <span class="markNumber">1</span></h4>
    <div class="what-you-got input-label-group">
      <label>What you got</label>
      <div class="input-group">
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value="100"
          class='whatYouGot'
          />
        <span class="input-after">%</span>
      </div>
      <!-- input-group-->
    </div>
    <!-- input-label-group-->
    <div class="what-you-got input-label-group">
      <label>What it's Worth</label>
      <div class="input-group">
        <input
          type="number"
          min="0"
          max="100"
          step="0.1"
          class="whatItsWorth"
          value="100"
        />
        <span class="input-after">%</span>
      </div>
      <!-- input-group-->
    </div>
    <!-- input-label-group-->
  </div>
  <!-- mark-row-->
`;

// FUNCTIONS

function handleAppClick(e) {
  if (e.target.classList.contains('addMark')) {
    addNewMarkRow();
  }
  if (e.target.dataset.know === 'true') {
    state.knowCurrentGrade = true;
    loadSecondScreen();
  } else if (e.target.dataset.know === 'false') {
    state.knowCurrentGrade = false;
    loadSecondScreen();
  }
}

function loadSecondScreen() {
  if (state.knowCurrentGrade) {
    app.innerHTML = knowCurrentGradeHTML;
    app.classList.add('secondScreen');
    app.classList.add('knowCurrentGrade');
  } else {
    app.innerHTML = dontKnowCurrentGradeHTML;
    app.classList.add('secondScreen');
    app.classList.add('dontKnowCurrentGrade');
  }
}

function addNewMarkRow() {
  const html = document.querySelector('.marks');
  html.innerHTML = html.innerHTML += additionalMarkRow;
  updateMarkNumbers();
}

function calculateCurrentGrade() {
  let grade;
  if (app.classList.contains('knowCurrentGrade')) {
    let currentGrade = parseFloat(
      document.getElementById('currentGrade').value
    );
    if (isNaN(currentGrade)) currentGrade = 0;
    let guess = parseFloat(document.getElementById('estimatedGrade').value);
    if (isNaN(guess)) guess = 0;
    let finalWeight =
      parseFloat(document.getElementById('finalWeight').value) / 100;
    if (isNaN(finalWeight)) finalWeight = 0;

    grade = (currentGrade * (1 - finalWeight) + guess * finalWeight).toFixed(1);
  } else if (app.classList.contains('dontKnowCurrentGrade')) {
    const markRows = [...app.querySelectorAll('.mark-row')];
    const totals = markRows.reduce(
      (acc, curr) => {
        let rowGrade = parseFloat(curr.querySelector('.whatYouGot').value);
        if (isNaN(rowGrade)) rowGrade = 0;
        let rowWeight =
          parseFloat(curr.querySelector('.whatItsWorth').value) / 100;
        if (isNaN(rowWeight)) rowWeight = 0;
        acc.courseTotal += rowGrade * rowWeight;
        acc.courseWeight += rowWeight;
        return acc;
      },
      { courseTotal: 0, courseWeight: 0 }
    );

    let finalWeightDN =
      parseFloat(document.getElementById('finalWeight').value) / 100;
    if (isNaN(finalWeightDN)) finalWeightDN = 0;
    let finalGradeGuess = parseFloat(
      document.getElementById('estimatedGrade').value
    );
    if (isNaN(finalGradeGuess)) finalGradeGuess = 0;
    const totalFinalMark = totals.courseTotal + finalGradeGuess * finalWeightDN;
    grade = totalFinalMark;
  }
  document.querySelector('.finalPercent').innerHTML = `${grade}%`;
}

function updateMarkNumbers() {
  const marks = app.querySelectorAll('.mark-row');
  marks.forEach((mark, i) => {
    const number = mark.querySelector('.markNumber');
    number.innerHTML = i + 1;
  });
}

// EVENTS

app.addEventListener('click', handleAppClick);
app.addEventListener('keyup', calculateCurrentGrade);
app.addEventListener('change', calculateCurrentGrade);
