function createInput(label, value, dataTag, type = 'number') {
    const div = document.createElement("div");
    div.setAttribute("js-data-id", dataTag);
    div.setAttribute("js-data-type", type);
    const span = document.createElement("span");
    span.innerText = label;
    const input = document.createElement("input");
    input.placeholder = "Sleep Time";
    input.value = value;
    div.appendChild(span);
    div.appendChild(input);
    return div;
}


(async () => {
    const data = await fetch('/config').then(r => r.json());

    const mainDiv = document.getElementById("main");

    Object.keys(data).forEach(esp => {

        const espCard = document.createElement("div");
        espCard.setAttribute("js-data-esp", esp);
        espCard.classList.add("esp-card")
        const titleDiv = document.createElement("h1");
        titleDiv.innerText = esp;
        espCard.appendChild(titleDiv);


        espCard.appendChild(createInput("Sleep time", data[esp].sleep_time, "sleep_time"));
        espCard.appendChild(createInput("Min value", data[esp].min_value, "min_value"));
        espCard.appendChild(createInput("Max value", data[esp].max_value, "max_value"));


        mainDiv.appendChild(espCard);

    });

    const btn = document.createElement("button");
    btn.innerText = "Save";
    btn.addEventListener('click', () => {
        const espDivs = mainDiv.querySelectorAll("[js-data-esp]");

        const config = {};

        espDivs.forEach(espDiv => {
            const espName = espDiv.getAttribute("js-data-esp");

            const espConfig = {};
            const inputs = espDiv.querySelectorAll("[js-data-id]");
            inputs.forEach(inputDiv => {
                const inputName = inputDiv.getAttribute("js-data-id");
                const inputType = inputDiv.getAttribute("js-data-type");
                if (inputType === 'number') {
                    espConfig[inputName] = Number.parseInt(inputDiv.querySelector("input").value);
                }
                if (inputType === 'string') {
                    espConfig[inputName] = inputDiv.querySelector("input").value;
                }
            });

            config[espName] = espConfig;
        });

        fetch('config', {
            method: 'POST',
            body: JSON.stringify(config),
            headers: {'Content-Type': 'application/json'}
        }).then(() => console.log('OK'));
    });

    mainDiv.appendChild(btn);
})();