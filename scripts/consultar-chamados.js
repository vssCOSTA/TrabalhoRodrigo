function loadData() {
    const topics = ['rede', 'equipamento', 'login'];
    const topicsContainer = document.getElementById('topics-container');
    const noDataMessage = document.getElementById('no-data-message');
    topicsContainer.innerHTML = ''; 

    let hasData = false; // Flag to check if there's any data

    topics.forEach(topic => {
        const topicContent = document.createElement('div');
        topicContent.classList.add('topic-content');
        topicContent.id = `${topic}-content`;

        let topicHasData = false; // Flag for each topic

        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(topic)) {
                const data = JSON.parse(localStorage.getItem(key));
                const dataCard = document.createElement('div');
                dataCard.classList.add('data-card');

                let dataHtml = `<h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>`;
                if (Array.isArray(data)) {
                    data.forEach((item, index) => {
                        dataHtml += `<div class="data-item-container">`;
                        for (const [field, value] of Object.entries(item)) {
                            dataHtml += `
                                <div class="data-item">
                                    <label>${field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                    <input type="text" value="${value}" id="${key}-${index}-${field}" />
                                </div>
                            `;
                        }
                        dataHtml += `<div class="actions">
                            <button onclick="saveData('${key}', ${index})">Salvar Alterações</button>
                            <button class="delete" onclick="deleteData('${key}', ${index})">Resolvido</button>
                        </div></div>`;
                    });
                } else {
                    dataHtml += `<div class="data-item-container">`;
                    for (const [field, value] of Object.entries(data)) {
                        dataHtml += `
                            <div class="data-item">
                                <label>${field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                                <input type="text" value="${value}" id="${key}-${field}" />
                            </div>
                        `;
                    }
                    dataHtml += `<div class="actions">
                        <button onclick="saveData('${key}')">Salvar Alterações</button>
                        <button class="delete" onclick="deleteData('${key}')">Resolvido</button>
                    </div></div>`;
                }

                dataCard.innerHTML = dataHtml;
                topicContent.appendChild(dataCard);
                topicHasData = true;
            }
        });

        if (topicHasData) {
            topicsContainer.appendChild(topicContent);
            hasData = true;
        }
    });

    noDataMessage.style.display = hasData ? 'none' : 'block';
}

function toggleTopicContent(topic) {
    const allTopics = document.querySelectorAll('.topic-content');
    allTopics.forEach(content => {
        content.style.display = 'none';
    });

    const topicContent = document.getElementById(`${topic}-content`);
    topicContent.style.display = 'block';
}

function saveData(key, index = null) {
    const data = {};
    if (index !== null) {
        const inputs = document.querySelectorAll(`input[id^="${key}-${index}-"]`);
        inputs.forEach(input => {
            const field = input.id.replace(`${key}-${index}-`, '');
            if (!data[index]) data[index] = {};
            data[index][field] = input.value;
        });
        localStorage.setItem(key, JSON.stringify(Object.values(data)));
    } else {
        const inputs = document.querySelectorAll(`input[id^="${key}-"]`);
        inputs.forEach(input => {
            const field = input.id.replace(`${key}-`, '');
            data[field] = input.value;
        });
        localStorage.setItem(key, JSON.stringify(data));
    }
}

function deleteData(key, index = null) {
    if (index !== null) {
        let data = JSON.parse(localStorage.getItem(key));
        data.splice(index, 1);
        if (data.length > 0) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            localStorage.removeItem(key);
        }
    } else {
        localStorage.removeItem(key);
    }
    loadData(); // Recarrega os dados após a exclusão
}
