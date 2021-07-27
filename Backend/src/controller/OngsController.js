const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async list(request, response){
        //return response.send('hello, world');
        if (request.params.idOng){ 
            const ongs = await connection('ongs').where({ 'nome': request.params.idOng }).select("*");
            return response.json(ongs);
        }
        else{
            const ongs = await connection('ongs').select('*');
            return response.json(ongs);
        }
    },
    async create(request, response){
     //return response.send('hello, world');
        var {  nome, email, whatsapp, city, uf } = request.body;
        var id = crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({ 
            id,
            nome, 
            email, 
            whatsapp, 
            city, 
            uf 
         });
        return response.send(id);
    },
    async delete(request, response){
        var ong_id = request.headers.authorization; 
        await connection('ongs').where({ id : ong_id }).delete();
        response.send('Deletado: '+ ong_id);
    },
    async update(request, response){
        var ong_id = request.headers.authorization;
        var { nome, email, whatsapp, city, uf} = request.body;
        await connection('ongs').where({ id : ong_id }).update({
            nome, 
            email, 
            whatsapp, 
            city, 
            uf 
        })
        console.log(request.body);
        console.log(ong_id);
        response.send(ong_id);
    }
}