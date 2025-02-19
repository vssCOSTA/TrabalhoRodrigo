describe('Adicionando dados no formulário de rede', () => {
  it('Deve adicionar dados no formulário de rede e salvar no localStorage', () => {
    cy.visit('http://127.0.0.1:5500/abrir-chamados.html'); 
    cy.contains('Rede').click();
    cy.get('#tipo-rede').select('Rede PA');
    cy.get('#nome-pa').type('PA Teste');
    cy.get('#info-adicional').type('Informações adicionais para teste');
    cy.get('form#rede-form button[type="submit"]').click();


    cy.window().then((win) => {
      const storedData = win.localStorage.getItem('rede');
      expect(storedData).to.exist;
      const parsedData = JSON.parse(storedData);
      expect(parsedData).to.deep.include({
        'tipo-rede': 'rede-pa',
        'nome-pa': 'PA Teste',
        'info-adicional': 'Informações adicionais para teste'
      });
    });
  });
});