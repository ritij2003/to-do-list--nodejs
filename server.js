// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';

// Connect to MongoDB
mongoose.connect('enter your mongodb database key', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Task schema and model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
});

const Task = mongoose.model('Task', taskSchema);

// Initialize Express app
const app = express();
app.use(express.json());

// Zod schemas for validation
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const updateTaskSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed']),
});

// Routes

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);
    const task = new Task(validatedData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Fetch all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update the task status
app.put('/tasks/:id', async (req, res) => {
  try {
    const validatedData = updateTaskSchema.parse(req.body);
    const task = await Task.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Delete a task by ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));