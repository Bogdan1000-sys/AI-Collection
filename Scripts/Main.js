import {aiModels} from './Data.js';

const RarityColors = {
    "Common": "#C0C0C0",
    "Uncommon": "#dad28dff",
    "Rare": "#a200ffff",
    "Epic": "#ff0000ff",
    "Legendary": "#e5ff00ff"
};

function createCard(name, rarity, imageURL) {
    const card = document.createElement("div");
    card.classList.add("itemCard");

    const nameElement = document.createElement("p");
    nameElement.classList.add("cardName");
    nameElement.textContent = name;

    const rarityElement = document.createElement("p");
    rarityElement.classList.add("cardRarity");
    rarityElement.textContent = rarity;

    const imgAI = document.createElement("img");
    imgAI.classList.add("cardImage");
    imgAI.src = imageURL;

    const imgFace = document.createElement("img");
    imgFace.classList.add("cardFace");
    imgFace.src = `Resources/Cards/${rarity}_CardFace.png`;

    card.appendChild(nameElement);
    card.appendChild(rarityElement);
    card.appendChild(imgAI);
    card.appendChild(imgFace);

    return card;
};

function UpdateCurrentInfo(key) {
    const modelData = aiModels[key];

    if (!modelData) {
        console.error("Модель с таким ключом не найдена:", key);
        return;
    }

    const container = document.querySelector(".infoContainer");

    const imgElement = container.querySelector(".aiIconImage");
    const nameElement = container.querySelector(".aiNameTitle");
    const rarityElement = container.querySelector(".aiRarity");
    const typeElement = container.querySelector(".aiType");
    const behaviorElement = container.querySelector(".aiBehavior");
    const registrationElement = container.querySelector(".aiRegistration");
    const descriptionElement = container.querySelector(".aiDescription");
    const buttonElement = container.querySelector(".vwButton");

    imgElement.src = modelData.Icon;
    imgElement.alt = modelData.Name;

    nameElement.textContent = `Название: ${modelData.Name}`;
    rarityElement.textContent = `Редкость: ${modelData.Rarity}`;
    typeElement.textContent = `Тип: ${modelData.Type}`;
    behaviorElement.textContent = `Поведение: ${modelData.Behavior}`;
    registrationElement.textContent = `Регистрация: ${modelData.Registration}`;
    descriptionElement.textContent = `Описание: ${modelData.Description}`;

    buttonElement.onclick = () => {
        window.location.href = modelData.Website;
    };
};
UpdateCurrentInfo("GPT-4");

function UpdateCards() {
    const cardsContainer = document.querySelector(".itemsContainer");
    cardsContainer.innerHTML = "";

    for (const key in aiModels) {
        let modelData = aiModels[key];

        const card = createCard(modelData.Name, modelData.Rarity, modelData.Icon);
        cardsContainer.appendChild(card);

        card.addEventListener("click", () => {
            UpdateCurrentInfo(key);
        });
    }
};

UpdateCards();


function removeBodyDivs() {
    document.body.childNodes.forEach(node => {
        if (node.nodeType === 1 && node.tagName === "DIV") {
            node.remove();
            console.log("Удален div из body при загрузке:", node);
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    removeBodyDivs();
});

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.tagName === "DIV" && node.parentNode === document.body) {
                    node.remove();
                    console.log("Удален div из body:", node);
                }
            });
        }
    }
});

observer.observe(document.body, { childList: true });