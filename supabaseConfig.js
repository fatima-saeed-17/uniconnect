
import { createClient } from '@supabase/supabase-js'
const supabase = createClient( 'https://ukqnpubnseblotkhjunz.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcW5wdWJuc2VibG90a2hqdW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Mjk3MTgsImV4cCI6MjA0OTMwNTcxOH0.W_bgenNrbBu1Cvjfj6AlGa9LZGDDrLitzM6crBAxxrc");
module.exports={supabase}