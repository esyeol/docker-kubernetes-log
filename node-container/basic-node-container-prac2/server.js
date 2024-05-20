const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const serve = require('koa-static');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

let userGoal = 'Learn Docker!';

app.use(bodyParser());
app.use(serve(path.join(__dirname, 'public')));

router.get('/', (ctx, next) => {
  ctx.body = `
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <section>
          <h2>My Course Goal!!</h2>
          <h3>${userGoal}</h3>
        </section>
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Course Goal</label>
            <input type="text" name="goal">
          </div>
          <button>Set Course Goal</button>
        </form>
      </body>
    </html>
  `;
});

router.post('/store-goal', (ctx, next) => {
  const enteredGoal = ctx.request.body.goal;
  console.log(enteredGoal);
  userGoal = enteredGoal;
  ctx.redirect('/');
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(80, () => {
  console.log('Server is running on port 80');
});
