import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Char = ({ charData }) => {
   console.log(charData.description);
   const router = useRouter();
   if (router.isFallback) {
      return (
         <div>
            {/* <div className="flex justify-center items-center">
               <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
               >
                  <span className="visually-hidden">Loading...</span>
               </div>
            </div> */}
            <div>Loading...</div>
         </div>
      );
   }
   return (
      <div>
         <h1 className="text-2xl text-center py-8">{charData.name}</h1>
         {charData.img && (
            <div>
               <img
                  className="mx-auto"
                  src={`${charData?.img?.banner}`}
                  alt={`${charData.name}`}
               />
            </div>
         )}
      </div>
   );
};

export async function getStaticPaths() {
   let characters = await axios.get(
      "https://genshin-impact.up.railway.app/characters"
   );
   characters = characters.data.characters;

   const paths = characters.map((char) => {
      return { params: { char: char } };
   });
   return {
      paths: paths,
      fallback: false,
   };
}

export const getStaticProps = async (context) => {
   const char = context.params.char;

   let data = await axios.get(
      `https://genshin-impact.up.railway.app/character/${char}`
   );
   data = data.data;

   return {
      props: {
         charData: data,
      },
   };
};

export default Char;
