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
              <h4>Mark 1</h4>
              <div class="what-you-got input-label-group">
                <label for="currentGrade">What you got</label>
                <div class="input-group">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    name="whatYouGot"
                    id="whatYouGot-1"
                  />
                  <span class="input-after">%</span>
                </div>
                <!-- input-group-->
              </div>
              <!-- input-label-group-->
              <div class="what-you-got input-label-group">
                <label for="currentGrade">What it's Worth</label>
                <div class="input-group">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    name="whatYouGot"
                    id="whatYouGot-1"
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
                step="0.1"
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
                step="0.1"
                name="finalWeight"
                id="finalWeight"
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
    <h4>Mark 1</h4>
    <div class="what-you-got input-label-group">
      <label for="currentGrade">What you got</label>
      <div class="input-group">
        <input
          type="number"
          min="0"
          step="0.1"
          name="whatYouGot"
          id="whatYouGot-1"
        />
        <span class="input-after">%</span>
      </div>
      <!-- input-group-->
    </div>
    <!-- input-label-group-->
    <div class="what-you-got input-label-group">
      <label for="currentGrade">What it's Worth</label>
      <div class="input-group">
        <input
          type="number"
          min="0"
          step="0.1"
          name="whatYouGot"
          id="whatYouGot-1"
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
}

function calculateCurrentGrade() {
  console.log('ran');
  let grade;
  if (app.classList.contains('knowCurrentGrade')) {
    const currentGrade = parseFloat(
      document.getElementById('currentGrade').value
    );
    if (isNaN(currentGrade)) currentGrade = 0;
    const guess = parseFloat(document.getElementById('estimatedGrade').value);
    if (isNaN(guess)) guess = 0;
    const finalWeight =
      parseFloat(document.getElementById('finalWeight').value) / 100;
    if (isNaN(finalWeight)) finalWeight = 0;

    grade = (currentGrade * (1 - finalWeight) + guess * finalWeight).toFixed(1);
    document.querySelector('.finalPercent').innerHTML = `${grade}%`;
  }
}

// EVENTS

app.addEventListener('click', handleAppClick);
app.addEventListener('keyup', calculateCurrentGrade);
app.addEventListener('change', calculateCurrentGrade);
