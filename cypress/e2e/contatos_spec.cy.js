describe('Agenda de Contatos - Testes Funcionais', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve adicionar um novo contato com sucesso', () => {
    const nome = `Contato ${Date.now()}`;
    const telefone = '11988887777';
    const email = `teste${Date.now()}@email.com`;
    
    cy.get('input[type="text"]').type(nome);
    cy.get('input[type="tel"]').type(telefone);
    cy.get('input[type="email"]').type(email);
    cy.get('button').contains('Adicionar').click();

    cy.contains(nome, { timeout: 10000 }).should('be.visible');
  });

  it('deve alterar um contato existente', () => {
    const nomeOriginal = `Editável ${Date.now()}`;
    cy.get('input[type="text"]').type(nomeOriginal);
    cy.get('input[type="tel"]').type('111111111');
    cy.get('input[type="email"]').type('edit@email.com');
    cy.get('button').contains('Adicionar').click();

    cy.contains(nomeOriginal).parents().filter(':has(button)').first().contains('Editar').click();
    const novoNome = `${nomeOriginal} Alterado`;
    cy.get('input[type="text"]').clear().type(novoNome);
    cy.get('button').contains('Salvar').click();

    cy.contains(novoNome).should('be.visible');
  });

  it('deve remover um contato', () => {
    const nomeRemover = `Removível ${Date.now()}`;
    cy.get('input[type="text"]').type(nomeRemover);
    cy.get('input[type="tel"]').type('222222222');
    cy.get('input[type="email"]').type('remove@email.com');
    cy.get('button').contains('Adicionar').click();

    cy.contains(nomeRemover).should('be.visible');
    
    // Tenta encontrar o botão de excluir próximo ao nome
    cy.contains(nomeRemover).parents().filter(':has(button)').first().contains('Deletar').click();
    
    cy.contains(nomeRemover).should('not.exist');
  });
});
