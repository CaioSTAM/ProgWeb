import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

function formatDate(date: Date) {
  return date.toISOString();
}

type LogFormat = 'simples' | 'completo';

export function logger(format: LogFormat) {
  return (req: Request, res: Response, next: NextFunction) => {
    const logsPath = process.env.LOGS_PATH;

    if (!logsPath) {
      throw new Error('Variável LOGS_PATH não definida no .env');
    }

    const dir = path.dirname(logsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const now = new Date();
    const time = formatDate(now);
    const method = req.method;
    const url = req.originalUrl;

    let logEntry = '';

    if (format === 'simples') {
      logEntry = `[${time}] ${method} ${url}\n`;
    } else if (format === 'completo') {
      const httpVersion = `HTTP/${req.httpVersion}`;
      const userAgent = req.headers['user-agent'] || 'Unknown User-Agent';
      logEntry = `[${time}] ${method} ${url} ${httpVersion} ${userAgent}\n`;
    }

    fs.appendFile(logsPath, logEntry, (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo de log:', err);
      }
    });

    next();
  };
}
