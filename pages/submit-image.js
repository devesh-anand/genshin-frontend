import { useEffect, useState } from "react";
import {
   TextField,
   Button,
   Stack,
   Paper,
   Box,
   styled,
   Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: "center",
   color: theme.palette.text.secondary,
}));
let test = ["aaa", "bbbb"];
export default function SubmitImage() {
   let [character, setCharacter] = useState("");
   let [urls, setUrls] = useState([]);
   let [tooltipIsOpen, setTooltipIsOpen] = useState(false);

   let handleImageUpload = async (e) => {
      e.preventDefault();
      try {
         const files = document.getElementById("images");
         const formData = new FormData();
         formData.append("character", character);
         let names = [];
         for (let i = 0; i < files.files.length; i++) {
            names.push(files.files[i].name);
            formData.append("files", files.files[i]);
            console.log(files.files[i]);
         }
         formData.append("names", names);
         console.log(formData);
         if (formData) {
            let res = await axios.post(
               "http://localhost:5000/others/image",
               formData,
               {
                  headers: {
                     "content-type": "multipart/form-data",
                  },
               }
            );
            console.log(res.data);
            setUrls(res.data.public_url);

            //empty the fileList
            document.getElementById("images").value = "";
         }
      } catch (err) {
         console.log(err);
      }
   };

   let copyUrl = (i) => {
      navigator.clipboard.writeText(urls[i]);
      tooltipHandler();
   };

   let tooltipHandler = () => {
      setTooltipIsOpen(true);
      setTimeout(() => {
         setTooltipIsOpen(false);
      }, 1000);
   };

   return (
      <div className="flex flex-col">
         <div className="flex justify-center">
            <div className="flex flex-col">
               <form
                  onSubmit={handleImageUpload}
                  className="flex flex-col items-center gap-8 w-4/5 md:w-1/2 m-16"
               >
                  <TextField
                     id="character"
                     label="Character"
                     variant="outlined"
                     className="w-full"
                     required
                     value={character}
                     onChange={(e) => setCharacter(e.target.value)}
                  />
                  <div className="form-group">
                     <input type="file" id="images" multiple />
                  </div>

                  <Button
                     className="bg-blue-600"
                     type="submit"
                     variant="contained"
                     size="medium"
                  >
                     Upload
                  </Button>
               </form>

               {urls && (
                  <Box sx={{ width: "100%" }}>
                     <Stack spacing={2}>
                        {urls.map(function (url, index) {
                           return (
                              <Item key={url}>
                                 {url}

                                 {/* <Tooltip
                                    open={tooltipIsOpen}
                                    onOpen={() => setTooltipIsOpen(true)}
                                    title="URL copied"
                                 ></Tooltip> */}
                                 <ContentCopyIcon
                                    className="mx-4 cursor-pointer"
                                    onClick={() => {
                                       copyUrl(index);
                                    }}
                                 />
                                 <a href={url} target="_blank">
                                    <OpenInNewIcon className="cursor-pointer" />
                                 </a>
                              </Item>
                           );
                        })}
                     </Stack>
                  </Box>
               )}
            </div>
         </div>
      </div>
   );
}
