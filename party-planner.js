const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2410-FTB-ET-WEB-PT';

const eventsContainer = document.querySelector('#events');

const state = {
    parties: [],
}

const getEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/events`);
        const events = await response.json();

        return events.data;
    } catch (e) {
        console.error(`Failed to fetch events.`, e);

        return [];
    }
}

const deleteEvent = async (id) => {
    try {
        await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE',
        });
        await renderPage();
    } catch (e) {
        console.error(`Failed to delete event with ID: ${id}`, e);
    }
};

const createEventItem = (event) => {
    const eventContainer = document.createElement('tr');
    eventContainer.classList.add('event_item');

    const eventName = document.createElement('td');
    eventName.textContent = event.name;
    const eventDate = document.createElement('td');
    console.log(event.date)
    eventDate.textContent = event.date;
    const eventTime = document.createElement('td');
    eventTime.textContent = event.time;
    const eventLocation = document.createElement('td');
    eventLocation.textContent = event.location;
    const eventDescription = document.createElement('td');
    eventDescription.textContent = event.description;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Event';
    deleteButton.addEventListener('click', () => {
        deleteEvent(event.id);
    });

    eventContainer.append(eventName, eventDate, eventTime, eventLocation, eventDescription, deleteButton);

    return eventContainer;
};

const eventForm = document.querySelector('form')
eventForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(eventForm);
    const data = new URLSearchParams(formData);
    data.id = Math.random();

    console.log(JSON.stringify(data))
    fetch(`${API_URL}/events`, {
        method: 'POST',
        body: data
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(`Failed to add event with ID: ${data.id}`, err))
})

async function renderPage() {
    while (eventsContainer.children.length) {
        const child = eventsContainer.firstChild;
        eventsContainer.removeChild(child);
    }

    const events = await getEvents();

    state.events = events;

    state.events.forEach((event) => {
        const eventContainer = createEventItem(event);

        eventsContainer.appendChild(eventContainer);
    });
}

renderPage();