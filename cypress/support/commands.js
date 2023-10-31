Cypress.Commands.add('login', (email, password) => {
    cy.request({
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
    cy.request({
        method: 'POST',
        url: '/produtos',
        body: produtoBody,
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('deleteProdutos', (id) => {
    cy.request({
        method: 'DELETE',
        url: `/produtos/${id}`,
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('getProdutos', (qs) => {
    cy.request({
        method: 'GET',
        url: '/produtos',
        ... (qs && { qs }),
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('getProduto', (id) => {
    cy.request({
        method: 'GET',
        url: `/produtos/${id}`,
        headers: { authorization: Cypress.env('token') }
    })
})

Cypress.Commands.add('putProdutos', (id, produtoBody = { nome, preco, descricao, quantidade }) => {
    cy.request({
        method: 'PUT',
        url: `/produtos/${id}`,
        body: produtoBody,
        headers: { authorization: Cypress.env('token') }
    })
})