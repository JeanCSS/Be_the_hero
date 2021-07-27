const connection = require('../database/connection');
const { update } = require('./ongsController');

module.exports = {

    async list(request, response){
        //return response.send('hello, world');
        const { page = 1 } = request.query

        const [count] = await connection('incidents').count();
        console.log(count);

        const ongs = await connection('incidents')
            .join(
                'ongs', 
                'ongs.id', 
                '=', 
                'incidents.ong_id'
            )
            .limit(5)
            .offset((page - 1) * 5)
            .select(
                'incidents.*', 
                'ongs.nome', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            );

        response.header('X-Total-Cout', count['count(*)']);
        return response.json(ongs);
        
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
        const incidents = await connection('incidents')
            .select('*')
            .where('id', id )
            .first();

        if(incidents.ong_id != ong_id){
           console.log(incidents); 
           return response.status(401).json({ error : "Operation not permited"});
        }
        await connection('incidents')
            .where('ong_id' , ong_id)
            .delete();
        console.log(incidents); 
        console.log(incidents.ong_id+ " "+ong_id);
        return response.status(204).send();
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