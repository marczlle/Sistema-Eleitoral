
const mysql = require('mysql2'); // requerir o pacote mysql2
const readline = require('readline-sync') //constante para requerir o pacote readline que vai ser utilizado pra pedir informações do usuário

//configuração bd e conexao
async function main() {

    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'eleicao',
        connectTimeout: 30000 // 30 segundos
    })


    //saber se funcionou

    connection.connect(err => {
        if (err) {
            console.error('erro ao conectar ao banco de dados', err.stack);
            return;
        }
        console.log('Conectado ao banco de dados');
    }
    )

    //criar um objeto vazio para colocar os candidatos

    let votos = {
        candidato1: 0,
        candidato2: 0,
        candidato3: 0,
    }

    //pedir quantidade de eleitores

    let eleitores = readline.questionInt('Digite o número de eleitores: ')

    console.log('Eleição: \nCandidato 1: Digite 1 \nCandidato 2: Digite 2 \nCandidato 3: Digite 3')

    //votar

    count = 0

    while (count < eleitores) {
        let informacoes = {
            nome: readline.question('Digite seu nome: '),
            cpf: readline.question('Digite seu cpf: '),
            endereco: readline.question('Digite seu endereço: '),
            data_nasc: readline.question('Digite sua data de nascimento (YYYY-MM-DD): '),
            genero: readline.question('Gênero (M/F): ')
        };

        // inserir eleitor no banco de dados
        let eleitorQuery = 'INSERT INTO Eleitores (nome, cpf, endereco, data_nasc) VALUES (?, ?, ?, ?)';
        connection.query(eleitorQuery, [informacoes.nome, informacoes.cpf, informacoes.endereco, informacoes.data_nasc], (err, results) => {
            if (err) {
                console.error('Erro ao inserir eleitor no banco de dados:', err.stack);
                return;
            }
            let eleitorId = results.insertId; // ID do eleitor inserido

            let voto = readline.question('Qual seu voto? ');

            let candidatoId;
            switch (voto) {
                case '1':
                    votos.candidato1++;
                    candidatoId = 1;
                    console.log(`Você votou no primeiro candidato.`);
                    break;
                case '2':
                    votos.candidato2++;
                    candidatoId = 2;
                    console.log(`Você votou no segundo candidato.`);
                    break;
                case '3':
                    votos.candidato3++;
                    candidatoId = 3;
                    console.log(`Você votou no terceiro candidato.`);
                    break;
                default:
                    console.log('Opção inválida! Tente novamente.');
                    return; // reiniciar o loop sem contar mais um
            }

            // inserir voto no banco de dados
            let votoQuery = 'INSERT INTO Votos (id_eleitor, id_candidato) VALUES (?, ?)';
            connection.query(votoQuery, [eleitorId, candidatoId], (err, results) => {
                if (err) {
                    console.error('Erro ao inserir voto no banco de dados:', err.stack);
                } else {
                    console.log('Voto registrado no banco de dados.');
                }
            });
        });
        count++;
    }


    console.log(`Resultado eleicao: \nCandidato 1: ${votos.candidato1} \nCandidato 2: ${votos.candidato2} \nCandidato 3: ${votos.candidato3}`)

    // fechar a conexão com o banco de dados
    await connection.end();
}

main()
