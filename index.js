const COHORT = "Joy-2408";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

// === State ===
let events = [];

// Update state with events from API
async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const responseObj = await response.json();
    // debugger;
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
      body: JSON.stringify(event),
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
  console.log(events);
  const $events = events.map((event) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
    <h2>Name: ${event.name}</p>
    <p>Date: ${event.date}</p>
    <p>Location: ${event.location} </p>
    <p>Details: ${event.description} </p>
    <button>Delete</button>
    `;

    const $button = $li.querySelector("button");
    $button.addEventListener("click", async () => {
      await deleteEvent(event.id);
      await getEvents();
      renderEvents();
    });

    return $li;
  });

  const $ul = document.querySelector("ul");
  $ul.replaceChildren(...$events);
}

//  Script

async function init() {
  await getEvents();
  renderEvents();
}

init();

//  Add event with form data when form is submitted
const $form = document.querySelector("form");
$form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newEvent = {
    name: $form.title.value,
    date: $form.date.value,
    location: $form.location.value,
    details: $form.details.value,
  };

  await addEvent(newEvent);
  await getEvents();
  renderEvents();
});
