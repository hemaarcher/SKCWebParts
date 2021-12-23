    
export interface ISkcServerHwSysListState {
  sysItems: SystemsItem[];
    ServerId:string;
  ServerTitle:string;
  columns: any;
  qsId:string;
  }


export interface SystemsItem{ 
  Id:number;
  Title:string;
  FLevelSupport: string;
  SLevelSupport: string;
  TLevelSupport: string;
  PortFolioLead: string;
  ApplicationSLA: string;
  LaunchURLs: string;
  Servers:any;
  
}