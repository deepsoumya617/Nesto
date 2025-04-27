require('dotenv').config()

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseKey) {
  throw new Error('Supabase key is missing from environment variables')
}

if (!supabaseUrl) {
  throw new Error('Supabase url is missing from environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
