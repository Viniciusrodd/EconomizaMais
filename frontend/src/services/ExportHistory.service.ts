
// imports
import axios from "axios";

// import DTOs
import type { 
   HistoriesResponseDTO,
   PDFResponseDTO
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
   public async getHistoricService(): Promise<HistoriesResponseDTO> {
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
   ): Promise<void> {
      try{
         const res = await axios.get(`${historyRoutesDownload}/${id}`, {
            responseType: 'blob'
         });
         
         // Create blob URL and trigger download
         const blob = new Blob([res.data], { type: 'application/pdf' });
         const url = window.URL.createObjectURL(blob);

         // Create temporary link and trigger click
         const link = document.createElement('a');
         link.href = url;
         link.download = 'evaluation.pdf'; // file name for download
         document.body.appendChild(link);
         link.click();

         // Cleanup
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);
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