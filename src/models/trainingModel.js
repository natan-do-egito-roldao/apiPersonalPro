import mongoose from 'mongoose';

const tips = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  tipo: { type: String, enum: ['Técnica', 'Hipertrofia']}
})

const dropSet = new mongoose.Schema({
  drop1: { type: Number, required: true },
  drop2: { type: Number, required: true },
  drop3: { type: Number},
  drop4: { type: Number},
  drop5: { type: Number},
})

const fasetreino = new mongoose.Schema({
  titulo: { type: String, required: true },
  repeticao: { type: Number, required: true }, 
  serie: { type: Number, required: true },
  videoUrl: { type: String }, 
  posicao: { type: Number, required: true },
  dicas: { type: [tips] },
  dropSet: { type: [dropSet] },
});

const nivelTreino = new mongoose.Schema({
  nivel: { type: Number, required: true },
  fasesDoNivel: { type: [fasetreino], required: true }, 
  descricao: { type: String, required: true }, 
  videoUrl: { type: String }, 
  duracao: { type: Number, required: true },
  dicas: { type: [tips] },
});

const treino = new mongoose.Schema({
  diaSemana: { type: Number, required: true },
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  videoUrl: { type: String },
  dataCriacao: { type: Date, default: Date.now },
  fotoTreino: {type: String},
  nivelTreino: { type: [nivelTreino], required: true },
});

const grupoTreino = new mongoose.Schema({
  descricao: { type: String, required: true },
  tipo: { 
    type: String, 
    enum: ["express", "personal", "familia"], 
    required: true 
  },
  Treinos: { type: [treino], required: true },
  videoUrl: { type: String },
  dataCriacao: { type: Date, default: Date.now },
  fotoGrupo: {type: String, required: true},
});

const Treino = mongoose.model("grupoTreino", grupoTreino);

export default Treino;
