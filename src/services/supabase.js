import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";



const supabase_uri = "https://skxfvsuucxctxqzlgorg.supabase.co"

const supabase_public_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNreGZ2c3V1Y3hjdHhxemxnb3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwODgyNjAsImV4cCI6MjAwNjY2NDI2MH0.hj_sPPAFQ-8ZQFKtMA9dPYZwXHMzGEcyczo3fOwNLpY"

const supabase = createClient(supabase_uri, supabase_public_key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;