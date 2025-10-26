import 'expo-sqlite';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getDataFromSupabase(){
  let postgreResponse = await supabase.from("Vocabulary").select()
  let data = postgreResponse.data
  console.log(`Fetch data: `, data)
  return data
}

/**Deprecated Function: Use to connect to mongoDB */
export async function run() {
  try {
    let vocab = null
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    let collections = await client.db("Dictionary").collection("Dictionary").find()
    let document = await collections.toArray().then((doc) => {
      vocab = doc[0].myVocab
    })
    return vocab
  }
  catch (e) {
    console.error(e);
  }
  finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function addToSupabase(word, meaning) {
  const payload = { Word: word, Meaning: meaning };
  const bulkPayLoad = [
   /* To bulk update insert object in this format:
    {Word: value, Meaning: value}, {...}, {...}*/
  ];
  const { data, error } = await supabase
    .from('Vocabulary')
    .insert(payload)
    .select(); // returns inserted row(s)

  if (error) {
    // surface useful message
    throw new Error(error.message);
  }
  console.log(`Message from db.js: Inserted row: `, data);
  return data; // array of inserted rows
}

export async function updateSupabase(word, meaning){
  const {data, error} = await supabase.from("Vocabulary").update({Meaning:meaning}).eq("Word", word).select("*")
  if(error){
    throw new Error(error.message)
  }
  console.log(`Updated the supabase with the word: `, data)
}

export async function deleteFromSupabase(word){
  const {data, error} = await supabase.from("Vocabulary").delete(word).eq("Word", word).select("*")
  if(error){
    throw new Error(error.message)
  }
  console.log(`Deleted the word from supabase: `, data)
}
