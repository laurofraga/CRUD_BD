const bibliotecaRepository = require('../repository/biblioteca.repository.js');

async function addBook(livro){
    if (livro && livro.titulo && livro.autor && livro.editora && livro.publicacao) {
       return await bibliotecaRepository.addBook(livro);
    }
    else{
        throw {id:400, message:"Todos os campos são obrigatórios"};
    }
}

async function getBooks(){
    return await bibliotecaRepository.getBooks();
}

async function getById(isbn) {
    const livro = await bibliotecaRepository.buscarPorId(isbn);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"Livro nao encontrado"};
    }
}


async function updateBook(isbn, livroAtualizado ){
    const livro = await bibliotecaRepository.getById(isbn);
    if(!livro){
        throw {id:404, message:"Livro não encontrado"};
        
    } 
    if (livroAtualizado && livroAtualizado.titulo && livroAtualizado.autor && livroAtualizado.editora && livroAtualizado.publicacao) {
        return await bibliotecaRepository.updateBook(isbn,livroAtualizado);
    }
    else{
        throw {id:400, message:"Todos os campos são obrigatórios"};
   
}
}

async function deleteBookById(isbn){
    const livroDeletado = await bibliotecaRepository.deleteBook(isbn);
    if(livroDeletado){
        return livroDeletado;
    } 
    else{
        throw {id:404, message:"Livro não encontrado"};
    }

}

module.exports = {
    addBook, 
    getBooks,
    getById, 
    updateBook,
    deleteBookById
}