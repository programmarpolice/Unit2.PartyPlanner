const COHORT = "Joy-2408";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api${COHORT}/events/`;

// === State ===
let events = [];

// Update state with events from API
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const responseObj = await response.json();
    // debuuger;
    events = responseObj.data;
  } catch (error) {
    console.error(error);
  }
}

// Request API to create a new event

async function addEvent(event) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      const responseObj = await response.json();
      throw new Error(responseObj.error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

//  Request API to delete the event
async function deleteEvent(id) {
  try {
    const response = await fetch(API_URL + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      const responseObj = await response.json();
      throw new Error(responseObj.error.message);
    }
  } catch {
    console.error(error);
  }
}

// Render

function renderEvents() {
  
  const $events = events.map((event) => {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <h2>${event.name}</h2>
    <h3>${event.date}</h3>
    <h4>${event.location}
    <p>${event.description}
    <button<Delete</button>
    `;

  const $button = $li.querySelector("button");
  $button.addEventListener("click", async () => {
    await deleteEvent(event.id);
    await getEvents();
    renderEvents();
  });

  return $li;
});

//  Script
const date = new Date($form.date.value).toISOString();
