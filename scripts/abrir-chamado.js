function showSubMenu(id) {
    const menus = document.querySelectorAll('.sub-menu');
    menus.forEach(menu => {
        if (menu.id === id) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });

    const formContainer = document.getElementById('form-container');
    const forms = {
        rede: `
            <form id="rede-form" class="dynamic-form">
                <h2>Informações de Rede</h2>
                <label for="tipo-rede">Tipo de Rede</label>
                <select id="tipo-rede" name="tipo-rede">
                    <option value="rede-pa">Rede PA</option>
                    <option value="rede-cooperados">Rede Cooperados</option>
                </select>
                <div id="pa-info" style="display: none;">
                    <label for="nome-pa">Nome do PA</label>
                    <input type="text" id="nome-pa" name="nome-pa" placeholder="Digite o nome do PA">
                </div>
                <label for="info-adicional">Informações Adicionais</label>
                <textarea id="info-adicional" name="info-adicional" placeholder="Digite aqui"></textarea>
                <button type="submit">Enviar</button>
            </form>
        `,
        equipamento: `
            <form id="equipamento-form" class="dynamic-form">
                <h2>Informações de Equipamento</h2>
                <label for="tipo-equipamento">Tipo de Equipamento</label>
                <select id="tipo-equipamento" name="tipo-equipamento">
                    <option value="impressora">Impressora</option>
                    <option value="notebook">Notebook</option>
                    <option value="computador">Computador</option>
                </select>
                <label for="nome-maquina">Nome da Máquina</label>
                <input type="text" id="nome-maquina" name="nome-maquina" placeholder="Digite o nome da máquina">
                <label for="info-adicional">Informações Adicionais</label>
                <textarea id="info-adicional" name="info-adicional" placeholder="Digite aqui"></textarea>
                <button type="submit">Enviar</button>
            </form>
        `,
        login: `
            <form id="login-form" class="dynamic-form">
                <h2>Informações de Login</h2>
                <label for="tipo-login">Tipo de Acesso</label>
                <select id="tipo-login" name="tipo-login">
                    <option value="sistema">Acesso a Sistema</option>
                    <option value="rede">Acesso de Rede</option>
                </select>
                <label for="nome-colaborador">Nome do Colaborador</label>
                <input type="text" id="nome-colaborador" name="nome-colaborador" placeholder="Digite o nome do colaborador">
                <label for="localizacao-pa">PA de Localização</label>
                <input type="text" id="localizacao-pa" name="localizacao-pa" placeholder="Digite o PA de localização">
                <label for="info-adicional">Informações Adicionais</label>
                <textarea id="info-adicional" name="info-adicional" placeholder="Digite aqui"></textarea>
                <button type="submit">Enviar</button>
            </form>
        `
    };

    formContainer.innerHTML = forms[id] || '';

    if (id === 'rede') {
        document.getElementById('tipo-rede').addEventListener('change', function () {
            const paInfo = document.getElementById('pa-info');
            if (this.value === 'rede-pa') {
                paInfo.style.display = 'block';
            } else {
                paInfo.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); 
            
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            const storageKey = form.id.replace('-form', '');

            let existingData = JSON.parse(localStorage.getItem(storageKey)) || [];

            if (!Array.isArray(existingData)) {
                existingData = [];
            }

            existingData.push(formObject);

            localStorage.setItem(storageKey, JSON.stringify(existingData));

            form.reset();
        });
    });
}