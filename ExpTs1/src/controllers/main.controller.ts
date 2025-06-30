import { Request, Response } from 'express';

export function getAboutPage(req: Request, res: Response) {
  res.render('about', {
    title: 'Sobre o Jogo',
    description: 'Star Wars: Galaxy Shooter é um jogo clássico de nave espacial, ambientado no universo da franquia Star Wars onde o jogador precisa sobreviver e eliminar os inimigos do império. Criado com HTML, CSS e JavaScript.',
    imagePath: '/img/imagemjogo.png'
  });
};

export function getHb1Page(req: Request, res: Response) {
  const nome = 'Caio São Thiago';
  res.render('hb1', { nome });
}

export function getHb2Page(req: Request, res: Response) {
  const logado = true; 
  res.render('hb2', { logado });
}

export function getHb3Page(req: Request, res: Response) {
  const linguagens = ['JavaScript', 'Python', 'Java', 'C#', 'Go'];
  res.render('hb3', { linguagens });
}

export function getHb4Page(req: Request, res: Response) {
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];

  res.render('hb4', { technologies });
}