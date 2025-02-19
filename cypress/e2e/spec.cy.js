describe('Testando o sistema de chamados', () => {
  it('Deve exibir o formulário de rede', () => {
    cy.visit('http://127.0.0.1:5500/abrir-chamados.html'); 
    cy.contains('Rede').click();
    cy.get('form#rede-form').should('be.visible');
  });
});