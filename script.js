
async function renderLinks() {
    const core = document.querySelector("#core");
    const colors = ['cyan', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'];

    try {
        const response = await fetch('./links.json');
        const data = await response.json();

        data.links.forEach(item => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors.splice(randomIndex, 1)[0];

            const groupColumn = document.createElement("div");
            const group = document.createElement("p");

            group.textContent = item.group;
            groupColumn.classList.add('col');
            group.classList.add(randomColor, 'fw-bold', 'mb-1');

            groupColumn.appendChild(group);

            item.urls.forEach(link => {
                const linkWrapper = document.createElement("p");
                const linkItem = document.createElement("a");

                linkItem.textContent = link.label;
                linkItem.href = link.url;

                linkItem.setAttribute('target', '_blank');
                linkItem.classList.add('link');

                linkWrapper.classList.add('link');
                linkWrapper.appendChild(linkItem);

                groupColumn.appendChild(linkWrapper);
            });

            core.appendChild(groupColumn);
        });
    } catch (error) {
        core.textContent = 'Failed to load content'
        core.classList.add('white', 'm-3')
    }
}

function updateClock() {
    var now = new Date();
    var formattedTime = now.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
    document.getElementById('datetime').textContent = formattedTime;
}

function updateTemp() {
    const apiKey = 'c01afd78109dcd9ce79847603cc00e6c';
    const lat = '-23.5489';
    const lon = '-46.6388'

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').textContent =
                Math.floor(data.main.temp) + '°C, min '
                + Math.floor(data.main.temp_min) + '°C, max '
                + Math.floor(data.main.temp_max) + '°C';
        })
        document.getElementById('temperature').textContent = 'Missing OpenWeatherMap info'        ;
}

function start() {
    setInterval(updateClock, 1000);    
    updateClock();
    renderLinks();
    updateTemp();
}
start();
