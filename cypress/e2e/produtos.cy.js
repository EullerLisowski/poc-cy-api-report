describe('Validações de Produtos', () => {

    Array.from(Array(1).keys()).forEach(() => {
        before(() => {
            cy.fixture('usuario').then((user) => {
                cy.login(user.email, user.password)
            })
        })

        context('GET /produtos', () => {
            it('Deve listar todos produtos com sucesso', () => {
                cy.getProdutos().should((getProdutosResponse) => {
                    expect(getProdutosResponse.status).to.be.equal(200)
                    expect(getProdutosResponse.body.quantidade).to.be.greaterThan(0)
                    expect(getProdutosResponse.body.produtos.length).to.be.greaterThan(0)
                })
            })


            it('Deve listar todos produtos com sucesso', () => {
                cy.getProdutos().then((getProdutosResponse) => {
                    cy.getProduto(getProdutosResponse.body.produtos[0]._id).should((getProdutoResponse) => {
                        expect(getProdutoResponse.status).to.be.equal(200)
                        expect(getProdutoResponse.body.nome).to.be.eq(getProdutosResponse.body.produtos[0].nome)
                        expect(getProdutoResponse.body.preco).to.be.eq(getProdutosResponse.body.produtos[0].preco)
                        expect(getProdutoResponse.body.descricao).to.be.eq(getProdutosResponse.body.produtos[0].descricao)
                        expect(getProdutoResponse.body.quantidade).to.be.eq(getProdutosResponse.body.produtos[0].quantidade)
                        expect(getProdutoResponse.body._id).to.be.eq(getProdutosResponse.body.produtos[0]._id)
                    })
                })
            })
        })

        context('POST /produtos', () => {
            it('Deve criar um produto com sucesso', () => {
                cy.postProdutos({
                    "nome": `Notebook Dell ${Math.round(Math.random() * 10000)}`,
                    "preco": 10000,
                    "descricao": "Notebook",
                    "quantidade": 34
                }).should((postProdutosResponse) => {
                    expect(postProdutosResponse.status).to.be.equal(201)
                    expect(postProdutosResponse.body.message).to.be.equal('Cadastro realizado com sucesso')
                })
            })
        })

        context('PUT /produtos/:_id', () => {
            it('Deve editar um produto com sucesso', () => {
                cy.getProdutos({ "nome": "Notebook Dell" }).then((getProdutosResponse) => {
                    cy.putProdutos(
                        getProdutosResponse.body.produtos[0]._id,
                        {
                            "nome": `Notebook Dell ${Math.round(Math.random() * 10000)}`,
                            "preco": 12000,
                            "descricao": "Notebook",
                            "quantidade": 36
                        }
                    ).should((putProdutosResponse) => {
                        expect(putProdutosResponse.status).to.be.equal(200)
                        expect(putProdutosResponse.body.message).to.be.equal('Registro alterado com sucesso')
                    })
                })
            })
        })

        context('DELETE /produtos', () => {
            it('Deve excluir um produto com sucesso', () => {
                cy.getProdutos({ "nome": "Notebook Dell" }).then((getProdutosResponse) => {
                    cy.deleteProdutos(getProdutosResponse.body.produtos[0]._id).should((putProdutosResponse) => {
                        expect(putProdutosResponse.status).to.be.equal(200)
                        expect(putProdutosResponse.body.message).to.be.equal('Registro excluído com sucesso')
                    })
                })
            })
        })
    })
})
