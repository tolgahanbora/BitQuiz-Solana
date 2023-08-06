import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";

import {SUPABASE_URI,SUPABASE_PUBLIC_API_KEY } from "@env"

const supabase_uri = SUPABASE_URI

const supabase_public_key = SUPABASE_PUBLIC_API_KEY 

const supabase = createClient(supabase_uri, supabase_public_key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;