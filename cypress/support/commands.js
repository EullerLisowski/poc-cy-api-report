Cypress.Commands.add('login', (email, password) => {
    cy.api({
        method: 'POST',
        url: '/login',
        body: {
            email: email,
            password: password
        }
    }).then((response) => {
        Cypress.env('token', response.body.authorization)
    })
})

Cypress.Commands.add('postProdutos', (produtoBody = { nome, preco, descricao, quantidade }) => {
    cy.api({
        method: 'POST',
        url: '/produtos',
        body: produtoBody,
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('deleteProdutos', (id) => {
    cy.api({
        method: 'DELETE',
        url: `/produtos/${id}`,
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('getProdutos', (qs) => {
    cy.api({
        method: 'GET',
        url: '/produtos',
        ... (qs && { qs }),
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('getProduto', (id) => {
    cy.api({
        method: 'GET',
        url: `/produtos/${id}`,
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('putProdutos', (id, produtoBody = { nome, preco, descricao, quantidade }) => {
    cy.api({
        method: 'PUT',
        url: `/produtos/${id}`,
        body: produtoBody,
        headers: { authorization: Cypress.env('token') }
    })
})