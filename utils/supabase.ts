import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://jkhnpfmqflbhtvvivwbf.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraG5wZm1xZmxiaHR2dml2d2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4OTg5NTAsImV4cCI6MjA2NzQ3NDk1MH0.dxq5LtHC76HUtg_xA23OfgjvN0KqjN7qETWx3egVKZ4'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export default supabase