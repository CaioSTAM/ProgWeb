import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';
import {
  getAboutPage,
  getHb1Page,
  getHb2Page,
  getHb3Page,
  getHb4Page
} from '../controllers/main.controller';

const router = Router();

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


router.get('/about', getAboutPage);
router.get('/hb1', getHb1Page);
router.get('/hb2', getHb2Page);
router.get('/hb3', getHb3Page);
router.get('/hb4', getHb4Page);


router.get('/lorem/:count', (req: Request, res: Response) => {
  const count = parseInt(req.params.count, 10);

  if (isNaN(count) || count <= 0) {
    return res.status(400).send('Parâmetro inválido. Informe um número inteiro maior que zero.');
  }

  let html = '';
  for (let i = 0; i < count; i++) {
    html += `<p>${lorem.generateParagraphs(1)}</p>`;
  }

  res.send(html);
});

router.get('/hello/:name/:age', (req, res) => {
  const { name, age } = req.params;
  res.render('hello', { name, age });
});

router.get('/hb1', (req, res) => {
  const nome = 'Caio São Thiago';
  res.render('hb1', { nome });
});

router.get('/hb2', (req, res) => {
  const logado = true; 
  res.render('hb2', { logado });
});

router.get('/hb3', (req, res) => {
  const linguagens = ['TypeScript', 'JavaScript', 'Python', 'C++'];
  res.render('hb3', { linguagens });
});

router.get('/hb4', (req, res) => {
  const technologies = [
    { name: 'Express', poweredByNodejs: true },
    { name: 'React', poweredByNodejs: false },
    { name: 'NestJS', poweredByNodejs: true },
    { name: 'Vue.js', poweredByNodejs: false },
    { name: 'Fastify', poweredByNodejs: true }
  ];

  res.render('hb4', { technologies });
});



export default router;

