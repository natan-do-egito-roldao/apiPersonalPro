import User from '../../models/userModel.js';
import { omit } from '../../services/omit.js';
import grupoTreinos from '../../models/trainingModel.js'

export async function Treinos(req,res) {
    try{
        const userId = req.user;
        if (!userId.sub) {
            return res.status(400).json({ error: 400});
        }
        
        const user = await User.findById(userId.sub)
        const grupo = await grupoTreinos.findById(user.treinos);
        const resultado = grupo.Treinos.map(treino => {
            const nivelDoUsuario = treino.nivelTreino.find(
                n => n.nivel === user.nivel
            );
            return {
                diaSemana: treino.diaSemana,
                nome: treino.nome,
                descricao: treino.descricao,
                treino: nivelDoUsuario
            };
        });
        return res.status(200).json({resultado});

    } catch (error) {
        res.status(500).json({ error: 'Erro ao alterar informações do usuário' });
    }
} 