import training from '../../models/trainingModel.js';

export const createtraining = async (req, res) => {
    console.log('cadastrando um novo treino');
    try {
        const grupoTreino  = req.body;

        if (!grupoTreino) {
            return res.status(404);
        }
        const newTraning = await training.create({
            tipo: grupoTreino.tipo,
            fotoGrupo: grupoTreino.fotoGrupo,
            videoUrl: grupoTreino.videoUrl,
            descricao: grupoTreino.descricao,
            Treinos: grupoTreino.Treinos.map(Treino => ({
                diaSemana: Treino.diaSemana,
                nome: Treino.nome,
                descricao: Treino.descricao,
                videoUrl: Treino.videoUrl,
                fotoTreino: Treino.fotoTreino || 60,
                nivelTreino: Treino.nivelTreino.map(nivelTreino => ({
                    nivel: nivelTreino.nivel,
                    descricao: nivelTreino.descricao,
                    videoUrl: nivelTreino.videoUrl,
                    duracao: nivelTreino.duracao,
                    fasesDoNivel: nivelTreino.fasesDoNivel.map(fasesDoNivel => ({
                        titulo: fasesDoNivel.titulo,
                        repeticao: fasesDoNivel.repeticao,
                        serie: fasesDoNivel.serie,
                        videoUrl: fasesDoNivel.videoUrl,
                        posicao: fasesDoNivel.posicao,
                        dicas: fasesDoNivel.dicas.map(dicas => ({
                            videoUrl: dicas.videoUrl,
                            tipo: dicas.tipo
                        })),
                    })),
                })),
            })) ,
        });
        console.log("treino criado com sucesso: ",newTraning.descricao);
        return res.status(201).json({ success: true, data: newTraning});
    } catch (error) {
        console.error('Erro ao cadastrar treino:', error);
        return res.status(500).json({ success: false, message: 'Erro ao cadastrar unidade.' });
    }
}