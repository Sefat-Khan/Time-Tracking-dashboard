
async function fetchData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to update the view based on the selected timeframe
function updateView(timeframe) {
  const cards = document.querySelectorAll('.flex-col-reverse');

  cards.forEach((card, index) => {
    const currentData = card.querySelector('#currentData');
    const previousData = card.querySelector('#previousData');

    const title = data[index].title.toLowerCase();
    const currentTimeframe = data[index].timeframes[timeframe];

    currentData.textContent = `${currentTimeframe.current}hrs`;
    switch (timeframe) {
      case 'daily':
        previousData.textContent = `Previous - ${currentTimeframe.previous}hrs`;
        break;
      case 'weekly':
        previousData.textContent = `Last Week - ${currentTimeframe.previous}hrs`;
        break;
      case 'monthly':
        previousData.textContent = `Last Month - ${currentTimeframe.previous}hrs`;
        break;
      default:
        break;
    }
  });
}

// Initial data load
let data;

window.onload = async () => {
  data = await fetchData();
  updateView('daily'); // Default view

  // Event listeners for timeframe buttons
  const dailyButton = document.getElementById('daily');
  const weeklyButton = document.getElementById('weekly');
  const monthlyButton = document.getElementById('monthly');

  dailyButton.addEventListener('click', () => updateView('daily'));
  weeklyButton.addEventListener('click', () => updateView('weekly'));
  monthlyButton.addEventListener('click', () => updateView('monthly'));
};