const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger документация
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Schopp Management API',
            version: '0.0.0',
            description: 'API для управления schopp',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['openapi.yaml'], // укажите путь к файлам с аннотациями
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middleware для парсинга JSON
app.use(bodyParser.json());

// Массив для хранения goods
let goods = [];

// Получить список задач
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Создать новую задачу
app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: completed || false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Получить задачу по ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Обновить задачу по ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const { title, completed } = req.body;
        task.title = title !== undefined ? title : task.title;
        task.completed = completed !== undefined ? completed : task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Удалить задачу по ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:", PORT);
});