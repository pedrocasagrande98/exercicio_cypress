describe('Agenda de Contatos - Testes Funcionais', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve adicionar um novo contato com sucesso', () => {
    const nome = `Contato ${Date.now()}`;
    const telefone = '11988887777';
    const email = `teste${Date.now()}@email.com`;

    // Tenta encontrar o botão de Novo Contato por texto ou ícone
    cy.contains('Novo Contato', { timeout: 10000 }).click();
    
    cy.get('input[placeholder*="Nome"]').type(nome);
    cy.get('input[placeholder*="Telefone"]').type(telefone);
    cy.get('input[placeholder*="Email"]').type(email);
    cy.get('button').contains('Salvar').click();

    cy.contains(nome, { timeout: 10000 }).should('be.visible');
  });

  it('deve alterar um contato existente', () => {
    const nomeOriginal = `Editável ${Date.now()}`;
    cy.contains('Novo Contato').click();
    cy.get('input[placeholder*="Nome"]').type(nomeOriginal);
    cy.get('input[placeholder*="Telefone"]').type('111111111');
    cy.get('input[placeholder*="Email"]').type('edit@email.com');
    cy.get('button').contains('Salvar').click();

    cy.contains(nomeOriginal).click();
    const novoNome = `${nomeOriginal} Alterado`;
    cy.get('input[placeholder*="Nome"]').clear().type(novoNome);
    cy.get('button').contains('Salvar').click();

    cy.contains(novoNome).should('be.visible');
  });

  it('deve remover um contato', () => {
    const nomeRemover = `Removível ${Date.now()}`;
    cy.contains('Novo Contato').click();
    cy.get('input[placeholder*="Nome"]').type(nomeRemover);
    cy.get('input[placeholder*="Telefone"]').type('222222222');
    cy.get('input[placeholder*="Email"]').type('remove@email.com');
    cy.get('button').contains('Salvar').click();

    cy.contains(nomeRemover).should('be.visible');
    
    // Tenta encontrar o botão de excluir próximo ao nome
    cy.contains(nomeRemover).parents().find('button').contains('Excluir').click();
    
    // Tenta clicar no Sim do modal de confirmação
    cy.get('button').contains('Sim', { timeout: 5000 }).click();
    
    cy.contains(nomeRemover).should('not.exist');
  });
});
