const {Client} = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    database: "Crud_Biblioteca",
    user: "postgres",
    password: 'lauro123'
}

 //create
 async function addBook(livro){
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query('insert into livros (titulo, autor, editora, publicacao) values ($1, $2, $3, $4) returning *',
    [livro.titulo, livro.autor, livro.editora, livro.publicacao]);
    const livroInserido = result.rows[0];
    await client.end();
    return livroInserido;
}
//read
async function getBooks(){
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query('select * from livros');
    const livros = result.rows;
    await client.end();
    return livros;

}

async function getById(isbn){
    const cliente = new Client(conexao);
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livros WHERE isbn=$1',[isbn]);
    const livro = res.rows[0];
    await cliente.end();
    return livro;
}

//update
async function updateBook(isbn, livro){
    const sql =  'update livros set titulo = $1, autor = $2, editora = $3, publicacao = $4 where isbn = $5 returning *';
    const values = [livro.titulo, livro.autor, livro.editora, livro.publicacao, isbn];
    
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(sql, values);
    const livroAtualizado = result.rows[0];
    await client.end();
    return livroAtualizado;
}

//delete
async function deleteBook(isbn){
    const sql = 'delete from livros where isbn = $1 returning *';
    const values = [isbn];

    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(sql, values);
    const livroDeletado = result.rows[0];
    await client.end();
    return livroDeletado;
}
    
module.exports = {
    addBook, 
    getBooks, 
    getById,
    updateBook, 
    deleteBook}