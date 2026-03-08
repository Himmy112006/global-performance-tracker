const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = 5000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// GET: Load all employees
app.get('/employees', async (req, res) => {
    const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('id', { ascending: false });
    if (error) return res.status(500).json(error);
    res.json(data);
});

// POST: Add new employee
app.post('/employees', async (req, res) => {
    const { name, email, role, department, rating, feedback } = req.body;
    const { data, error } = await supabase
        .from('employees')
        .insert([{ name, email, role, department, rating, feedback }])
        .select();
    if (error) return res.status(500).json(error);
    res.json(data[0]);
});

// DELETE: Remove an employee by ID
app.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
    if (error) return res.status(500).json(error);
    res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server updated with Delete: http://localhost:${PORT}`);
});