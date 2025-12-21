import * as alias from 'module-alias';
alias.addAliases({
  '@': __dirname
});

import app from './config/server/server';

const port = app.get('port') || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
