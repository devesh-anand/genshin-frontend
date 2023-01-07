import React from "react";
import axios from "axios";
import Link from "next/link";

const characters = ({ characters }) => {
   return (
      <div>
         <div className="text-center">
            Characters:
            <ul className="flex flex-col items-center">
               {characters.map((char) => {
                  return (
                     <li key={`${char.name}`} className="cursor-pointer">
                        <Link href={`/character/${char?.key}`}>
                           <div className="flex flex-col w-32">
                              <img src={char?.img?.icon} alt={char.name} />
                              <p>{char.name}</p>
                           </div>
                        </Link>
                     </li>
                  );
               })}
            </ul>
         </div>
      </div>
   );
};

export async function getStaticProps() {
   const res = await axios.get(
      "https://genshin-impact.up.railway.app/character/imglist"
   );

   const characters = res.data.characters;

   return {
      props: {
         characters,
      },
   };
}

export default characters;
