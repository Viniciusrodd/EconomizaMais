
export interface iModal{
   title: string; 
   msg: string; 
   btt1: boolean | string; 
   btt2: boolean | string; 
   display: boolean; 
   onClose: () => void; 
   modalEvent?: (event: any) => void;
}

export interface iModalConfig{
   title: string;
   msg: string;
   btt1: boolean | string;
   btt2: boolean | string;
   display: boolean;
}