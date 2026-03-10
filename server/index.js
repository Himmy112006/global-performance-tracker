const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Supabase using the names from your Render settings
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Changed from SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

// Update CORS to allow your Vercel website to connect
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));

app.use(express.json());

// 1. GET: Load all employees from the database
app.get('/employees', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('id', { ascending: false });
            
        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. POST: Add a new employee review
app.post('/employees', async (req, res) => {
    try {
        const { name, email, role, department, rating, feedback } = req.body;
        const { data, error } = await supabase
            .from('employees')
            .insert([{ name, email, role, department, rating, feedback }])
            .select();
            
        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. DELETE: Remove an employee by ID
app.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('employees')
            .delete()
            .eq('id', id);
            
        if (error) throw error;
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Root route to check if server is awake
app.get('/', (req, res) => {
    res.send("🚀 HR Pulse Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});