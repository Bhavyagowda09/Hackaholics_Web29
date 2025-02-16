require("dotenv").config();  // Load environment variables
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.supabase_url;
const supabaseKey = process.env.supabase_key;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("⚠️ SUPABASE_URL and SUPABASE_KEY are required! Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
