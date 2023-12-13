import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://oipropwqatwfttxhpgmq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pcHJvcHdxYXR3ZnR0eGhwZ21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0NTM4MzIsImV4cCI6MjAxODAyOTgzMn0.tmrud2rmj_6fx1vZKor0UvfCHabVLlDH0gh_AubD2OQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
