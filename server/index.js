const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Professional CORS configuration
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// --- AUTHENTICATION ---

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(`ATTEMPT SIGNUP: ${email}`);
    
    const { data, error } = await supabase.auth.signUp({ 
        email, 
        password 
    });

    if (error) {
        console.error("SUPABASE ERROR:", error.message);
        return res.status(400).json({ error: error.message });
    }
    res.json({ user: data.user });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`ATTEMPT LOGIN: ${email}`);
    
    const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
    });

    if (error) {
        console.error("SUPABASE ERROR:", error.message);
        return res.status(400).json({ error: error.message });
    }
    res.json({ user: data.user, session: data.session });
});

// --- EMPLOYEE DATA ---

app.get('/employees', async (req, res) => {
    const { data, error } = await supabase.from('employees').select('*').order('id', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

app.post('/employees', async (req, res) => {
    const { name, email, role, department, rating, feedback } = req.body;
    const { data, error } = await supabase.from('employees').insert([{ name, email, role, department, rating, feedback }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

app.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('employees').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => console.log(`Backend Engine running on port ${PORT}`));