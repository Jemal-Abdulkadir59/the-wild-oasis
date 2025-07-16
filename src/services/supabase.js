import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ncgqqrxgzfcuthsiwupr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZ3FxcnhnemZjdXRoc2l3dXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MTY2NDUsImV4cCI6MjA2NzI5MjY0NX0.o3DqaPOLCm3lQiMz8zuGOIj6BGnHZypvKXC3E8sw4lI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
