import * as React from 'react';
import styles from './SkcServerHwFrm.module.scss';
import { ISkcServerHwFrmProps } from './ISkcServerHwFrmProps';
import { ISkcServerHwFrmState } from './ISkcServerHwFrmState';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton ,mergeStyles, PrimaryButton, Label, Stack, MessageBar, MessageBarType, Separator } from 'office-ui-fabric-react';
import { sp, DateTimeFieldFormatType } from "@pnp/sp/presets/all";
import { FormatDate } from '../../Utilities';
import { ISiteUserProps } from "@pnp/sp/site-users/";


export default class SkcServerHwFrm extends React.Component<ISkcServerHwFrmProps, ISkcServerHwFrmState> {
  
    constructor(props: ISkcServerHwFrmProps, state: ISkcServerHwFrmState) {
      super(props);
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const strErrorMessages: string = "";
      
      let qsParam: string;
      params.has('idval') ? qsParam = params.get("idval") : qsParam = "";
      this.state = {
        itemID: qsParam,
        Site: "",
        IP: "",
        HostName: "",
        Function: "",
        OperationStatus: "",
        DNAAlias: "",
        OS: "",
        SLALevel: "",
        BackupPolicy:[],
        SignOffStatus:"",
        Version:"",
        Created: "",
        CreatedBy: "",
        Modified: null,
        ModifiedBy: "",
        strErrorMessages:"",
      };
      sp.setup({
        spfxContext: this.props.spcontext
      });
    
      this._getItem(Number(this.state.itemID));
  
  
    }
    private  _closeClicked(): void {    
      window.history.back();
    }
    private async _getItem(qid:number) {
      // get a specific item by id
      const item: any = await sp.web.lists.getByTitle("Server Hardware")     
        .items.getById(qid) 
        .select("*","OData__UIVersionString")
        .get();
  
      console.dir(item);
        
      let uservalue: number = item["AuthorId"];
      let DisplayUserCreated:string;
          try
          { 
              const user: ISiteUserProps = await sp.web.getUserById(uservalue).get();
              DisplayUserCreated= user.Title;
              
          }
          catch(error){  
            DisplayUserCreated="User no longer exist in our systems ";
           
          }  
        let editorvalue: number = item["EditorId"];
          let DisplayUserEdited:string;
              try
              { 
                  const user: ISiteUserProps = await sp.web.getUserById(editorvalue).get();
                  DisplayUserEdited= user.Title;
                  
              }
              catch(error){   
                DisplayUserEdited="User Deleted from systems";
              
              }  
        
  //set value 
  
  try{
      this.setState({
        HostName: item.Title,
        itemID: item.itemID,
        Site: item.Site,
        IP: item.IP,
        Function: item.Function,
        OperationStatus: item.Operation_x0020_Status,
        DNAAlias: item.DNS_x0020_Alias,
        OS: item.OS,
        SLALevel: item.SLA_x0020_Level,
        BackupPolicy:item.Backup_x0020_Policy,
        SignOffStatus:"",
        Version:item.OData__UIVersionString,
        Created: FormatDate(item.Created),
        CreatedBy: DisplayUserCreated,
        Modified: FormatDate(item.Modified),
        ModifiedBy: DisplayUserEdited,
  
      });
      this.setState({strErrorMessages: "We are experiencing an Unknown Error, Kindly ScreenShot this page along the page URL and share it with SharePoint AMS Team."});
      }
    catch(error){     
      
      this.setState({strErrorMessages: "We are experiencing an Unknown Error, Kindly ScreenShot this page along the page URL and share it with SharePoint AMS Team."});
      
    }
  
    }
  
    
  
      public render(): React.ReactElement<ISkcServerHwFrmProps> {
     return (
        <div className={styles.skcServerHwFrm}>     
       
       
        <div className={styles.mystyles}>
            <span className={styles.btnalignright}>
             <PrimaryButton  text="Back" onClick={this._closeClicked} />
          </span>
          <span><h2>Server Hardware Details</h2></span>
          <span className={styles.errText}><h3>{this.state.strErrorMessages}</h3></span>
          
          <div className={styles.mytablestyles}>
          <table >
            <tr>
              <td className={styles.valTdColspan}>
                <span> <Label className={styles.mylabel}>HostName :</Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.HostName?.toString()}</Label></span>
              </td>
            </tr>
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>DNA Alias :</Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.DNAAlias?.toString()}</Label></span>
              </td>
            </tr>
          
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>Site:</Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.Site?.toString()}</Label></span>
              </td>
            </tr>
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>IP :</Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.IP?.toString()}</Label></span>
              </td>
            </tr>
            
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>Function :</Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.Function?.toString()}</Label></span>
              </td>
            </tr>
          
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>Operation Status : </Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.OperationStatus?.toString()}</Label></span>
              </td>
            </tr>
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>OS :</Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.OS?.toString()}</Label></span>
              </td>
            </tr>
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>SLA Level :</Label></span>
              </td>
              <td>
                <span> <Label className={styles.valLabel}>{this.state.SLALevel?.toString()}</Label></span>
              </td>
            </tr>
  
            <tr>
              <td>
                <span> <Label className={styles.mylabel}>Backup Policy :</Label></span>
              </td>
              <td>
                    <span className={styles.valLabel}>
  
                      {
                        this.state.BackupPolicy?.map(function (item) {
                          return (<div>
                            {item}
                          </div>);
                        })
                        }
  
  
                    </span>
                  </td>
  
              
            </tr>         
            <tr>
              <td>
                <span> <Label className={styles.mylabel} disabled>Version :</Label></span>
              </td>
              <td>
                <span> <Label  className={styles.valLabel} disabled>{this.state.Version?.toString()}</Label></span>
              </td>
            </tr>
            <tr>
              <td>
                <span> <Label  className={styles.mylabel} disabled>Created :</Label></span>
              </td>
              <td>
                <span> <Label  className={styles.valLabel} disabled>{this.state.Created} - {this.state.CreatedBy}</Label></span>
              </td>
            </tr>
  
            <tr>
              <td>
                <span> <Label  className={styles.mylabel} disabled>Last Modifed :</Label></span>
              </td>
              <td>
                <span> <Label  className={styles.valLabel} disabled>{this.state.Modified} - {this.state.ModifiedBy}</Label></span>
              </td>
            </tr>
  
          </table>
        </div>
        </div>
     </div>
        
      );
    }
  }
  