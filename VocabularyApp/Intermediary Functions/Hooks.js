import { use, useEffect, useState } from "react";
import {run, getDataFromSupabase, addToSupabase} from "../backend/db";
    const URL = process.env.EXPO_PUBLIC_URL


    export function useFetch(setVocabList) {
      async function fetchData() {
          console.log("Fetching data from the URL: " + URL);
          const response = await run();
          const data = await response.json();
          console.log(`Data fetched: ${data}`);
          setVocabList(data);
      };
      useEffect(() => {
        //fetchData();
        async function fetchData(){
          let data = await getDataFromSupabase()
          
          console.log("Data from Supabase: ", data)  
          let vocabList = {}
          data.forEach(element => {   
            vocabList[element.Word] = element.Meaning
          }); 
          setVocabList(vocabList)   
          
        }
        fetchData();

      }, []);
    }