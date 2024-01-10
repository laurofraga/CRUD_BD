const biblioteca_service = require('../service/biblioteca.service.js');


async function getBooks(req, res){
    const livros =  await biblioteca_service.getBooks()
    res.json(livros);
    
}

async function addBook(req, res){
    const livros = req.body;
    try{
      const livroInserido = await biblioteca_service.addBook(livros);
        res.status(201).json({msg: livroInserido});
    }
    catch(err){
        res.status(err.id).json({message: err.message});
    }

}

async function updateBook(req, res) {
    const isbn = +req.params.isbn;
    let livro = req.body;

    try {
        const livroAtualizado = await biblioteca_service.updateBook(isbn, livro);
            res.status(200).json(livroAtualizado);
        } 
    catch (err) {
        console.error('Erro ao atualizar livro:', err);

        res.status(err.id || 500).json({ message: err.message || 'Erro interno ao atualizar livro' });
    }
}


async function deleteBook(req,res){
    const isbn = +req.params.isbn;
    try{
        const livroDeletado = await biblioteca_service.deleteBookById(isbn);
        res.json(livroDeletado);
    } 
    catch (err) {      
        res.status(err.id).json({ message: err.message });
    }
}


module.exports = {
    addBook,
     getBooks,
     updateBook,
     deleteBook
}