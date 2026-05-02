describe('Investigação de Selectores', () => {
  it('deve extrair textos do DOM', () => {
    cy.visit('/');
    cy.get('body').then(($body) => {
      const text = $body.text();
      cy.writeFile('cypress/fixtures/dom_dump.txt', text);
    });
    cy.get('button').each(($btn, index) => {
      cy.writeFile(`cypress/fixtures/button_${index}.txt`, $btn.text());
    });
  });
});
