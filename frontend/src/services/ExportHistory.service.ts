
// imports
import axios from "axios";

// import DTOs
import type { 
   HistoriesResponseDTO,
   PDFResponseDTO,
   FileDataResponseDTO
} from '@DTOs/ExportHistory.dtos';

// import routes
import { 
   historyRoutesCreate,
   historyRoutesGet,
   historyRoutesDownload
} from "@routes/routes";



// export history service - frontend
class ExportHistoryService {

   // create pdf history
   public async createHistoryService(): Promise<PDFResponseDTO> {
      try{
         const res = await axios.post(historyRoutesCreate);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get export histories
   public async getHistoriesService(): Promise<HistoriesResponseDTO> {
      try{
         const res = await axios.get(historyRoutesGet);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };


   // get export history for download
   public async downloadPdfService(
      id: string
   ): Promise<FileDataResponseDTO> {
      try{
         const res = await axios.get(`${historyRoutesDownload}/${id}`);
         return res.data.data;
      }
      catch(error){
         if(axios.isAxiosError(error)){
            throw error.response?.data?.data || error.response?.data?.message;
         }
         throw error;
      }
   };
   
};
export const exportHistoryService: ExportHistoryService = new ExportHistoryService();