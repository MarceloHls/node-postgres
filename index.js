let { Client } = require('pg');
let db;

function connectDB() {
    db = new Client({
        host: "localhost",
        database: "node",
        user: "postgres",
        password: "123",
        port: 5432
    })
    db.connect()
}

let nameTable = 'pessoas'

async function createTable() {

    await db.query(`
    create table if not exists ${nameTable}(
        id serial not null primary key,
        name varchar,
        age integer
    )    
`)
    console.log(`Tabela ${nameTable}criada`)
}

async function insert(name, age) {
    let data = await db.query(`
    insert into ${nameTable}(name,age)
    values('${name}',${age})
    returning * 
    `)

    let { rows } = data
    console.log(`Inseridos: ${rows.length}`)
}

async function select() {
    let data = await db.query(
        `select * from ${nameTable}`
    )
    let { rows } = data
    console.log(rows)

}

async function start() {
    connectDB()
    await createTable()
    await insert("marcelo", 20)
    await select()
}

start()