import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
const __dirname = path.resolve();

const app = fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});

app.get('/', function (req, reply) {
  console.log('%c [JL] hi - ', 'font-size: 13px; color:  orange;');
  return reply.sendFile('index.html'); // serving path.join(__dirname, 'public', 'myHtml.html') directly
});
app.get('/login', function (req, reply) {
  return reply.sendFile('login.html');
});

app.listen(3000, (err, address) => {
  if (err) throw err;
});
