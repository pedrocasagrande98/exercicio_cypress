fetch('https://ebac-agenda-contatos-tan.vercel.app/static/js/main.5f6b4358.js').then(r => r.text()).then(t => {
  console.log(t.match(/placeholder:\"[^\"]+\"/g));
  console.log(t.match(/Adicionar|Editar|Salvar|Novo|Excluir|Deletar|Remover/gi));
});
