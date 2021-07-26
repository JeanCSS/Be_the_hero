const connection = require('../database/connection');
const { update } = require('./ongsController');

module.exports = {

    async list(request, response){
        //return response.send('hello, world');
        if (request.params.idOng){
            console.log(request.params);
            const ongs = await connection('incidents').where({ 'ong_id': request.params.idOng }).select("*");
            return response.json(ongs);
        }
        else{
            const ongs = await connection('incidents').select('*');
            return response.json(ongs);
        }
    },

    async create(request, response){
     //return response.send('hello, world');
        var { title, description, value } = request.body; 
        var ong_id = request.headers.authorization;
         console.log(request.body);
         console.log(request.headers.authorization);
        await connection('incidents').insert({  
            description,
            ong_id, 
            title, 
            value
            
         });
        return response.send(ong_id);
    },
    async delete(request, response){
        var { id } = request.params;
        var ong_id = request.headers.authorization
        console.log( id +' '+ong_id);
        await connection('incidents').where({ ong_id }).where({ id }).delete();
        response.send('deletado: '+id);
    },
    async update(request, response){
        var { id } = request.params;
        var { title, description, value } = request.body;
        var ong_id = request.headers.authorization
        console.log(request.body);
        console.log(id +' '+ong_id);
        
        await connection('incidents')
        .where({ ong_id })
        .where({ id })
        .update({ 
            title, 
            description, 
            value 
        });

        response.send('Update: '+id);
    }
}