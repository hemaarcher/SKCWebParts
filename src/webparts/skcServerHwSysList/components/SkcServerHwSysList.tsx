import * as React from 'react';
import styles from './SkcServerHwSysList.module.scss';
import { ISkcServerHwSysListProps } from './ISkcServerHwSysListProps';
import { ISkcServerHwSysListState, SystemsItem } from './ISkcServerHwSysListState';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IColumn, ITheme, mergeStyleSets, getTheme, getFocusStyle, List, ImageFit, Image, DetailsList, Link, DetailsListLayoutMode, SelectionMode, Tooltip, Separator } from 'office-ui-fabric-react';


import { CleanString } from '../../Utilities';

export default class SkcServerHwSysList extends React.Component<ISkcServerHwSysListProps,ISkcServerHwSysListState> {
  constructor(props: ISkcServerHwSysListProps, state: ISkcServerHwSysListState) {
  
    super(props);

    const columns: IColumn[] = [
      {
        key: "Title",
        name: "Title",
        fieldName: "Title",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        data: "string",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "Servers",
        name: "Application Servers",
        fieldName: "Servers",
        minWidth: 100,
        maxWidth: 100,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "FLevelSupport",
        name: "1st Level Support",
        fieldName: "OData__x0031_st_x0020_Level_x0020_Supp",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "SLevelSupport",
        name: "2nd Level Support",
        fieldName: "OData__x0032_nd_x0020_Level_x0020_Supp",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "TLevelSupport",
        name: "3rd Level Support",
        fieldName: "OData__x0033_rd_x0020_Level_x0020_Supp",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "PortFolioLead",
        name: "PortfolioLead",
        fieldName: "PortfolioLead",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "ApplicationSLA",
        name: "ApplicationSLA",
        fieldName: "Service_x0020_Level_x0020_Agreem",
        minWidth: 70,
        maxWidth: 90,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
      {
        key: "LaunchURLs",
        name: "LaunchURLs",
        fieldName: "Launch_x0020_URLs",
        minWidth: 70,
        maxWidth: 150,
        isRowHeader: true,
        isResizable: true,
        data: "any",
        isPadded: true,
        className:styles.mylabel,
      },
     
    ];

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
       let qsParam: string;
    params.has('idval') ? qsParam = params.get("idval") : qsParam = "";
   
    this.state = {
      sysItems: [],
      ServerId: "356",
      ServerTitle: "",
      columns: columns,
      qsId:qsParam,
    };
    sp.setup({
      spfxContext: this.props.spcontext
    });
    //this.getServerHwData();
  }

  public async componentDidMount() {
    await this.getServerHwData();
  }

  public async getServerHwData() {
    const item: any = await sp.web.lists.getByTitle("Server Hardware")
      .items.getById(Number(this.state.qsId))
      .get();

    this.setState({
      ServerId: item.ID,
      ServerTitle: item.Title
    });

    const sysdata: SystemsItem[] = [];
    const sysitems: any[] =
      await sp.web.lists.getByTitle("Systems")
        .items
        .select("*", "Servers/Id", "Servers/Title", "DatabaseServers/Id", "DatabaseServers/Title","PortfolioLead/EMail", "PortfolioLead/Title")
        .expand("Servers/Id", "Servers/Title", "DatabaseServers/Id", "DatabaseServers/Title","PortfolioLead/EMail", "PortfolioLead/Title")
        .filter(`Servers/Id eq ${this.state.qsId}`)
        .get();

        

    await sysitems.forEach(async syitem => {
      await sysdata.push({
        Id: syitem.Id,
        Title: syitem.Title,
        Servers: syitem.Servers,
        FLevelSupport: syitem.OData__x0031_st_x0020_Level_x0020_Supp,
        SLevelSupport: syitem.OData__x0032_nd_x0020_Level_x0020_Supp,
        TLevelSupport: syitem.OData__x0033_rd_x0020_Level_x0020_Supp,
        PortFolioLead: syitem.PortfolioLead.Title,
        ApplicationSLA: syitem.Service_x0020_Level_x0020_Agreem,        
        LaunchURLs: CleanString(syitem.Launch_x0020_URLs),
      });
    });
    
    
    this.setState({ sysItems: sysdata });


    
  }

    public _onRenderItemColumn = (item: SystemsItem, index: number, column: IColumn): JSX.Element | string => {

    switch (column.key) {
      case 'Title':
        return <span style={{ whiteSpace: 'normal' }}>{item.Title}</span>;

      case 'Servers':
        let serversarr = [];
        item.Servers?.forEach(p => {
          serversarr.push({ key: p.Id, text: p.Title });
        });

        return (
          item.Servers?.map(({ Id, Title }) => (
            <span style={{ whiteSpace: 'normal' }}>{Title}<br/></span>
          ))
        );

      case 'FLevelSupport':
        return <span style={{ whiteSpace: 'normal' }} >{item.FLevelSupport?.toString()}</span>;

      case 'SLevelSupport':
        return <span style={{ whiteSpace: 'normal' }} >{item.SLevelSupport?.toString()}</span>;

      case 'TLevelSupport':
        return <span style={{ whiteSpace: 'normal' }} >{item.TLevelSupport?.toString()}</span>;

      case 'PortFolioLead':
        return <span style={{ whiteSpace: 'normal' }} >{item.PortFolioLead?.toString()}</span>;
 
      case 'ApplicationSLA':
        return <span style={{ whiteSpace: 'normal' }}>{item.ApplicationSLA?.toString()}</span>;

      case 'LaunchURLs':
        return <Link style={{ whiteSpace: 'normal' }} href="#">{item.LaunchURLs?.toString()}</Link>;

      default:
        return <span>{item.Title}</span>;
    }
  }


  public render(): React.ReactElement<ISkcServerHwSysListProps> {
    return (
      <div className={ styles.skcServerHwSysList }>
       <Separator alignContent="start" color="red"><span className={styles.mylabel}>Systems</span></Separator>
        <div className={styles.mystyles}>        

            <DetailsList
              items={this.state.sysItems}
              columns={this.state.columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              onRenderItemColumn={this._onRenderItemColumn}
              selectionMode={SelectionMode.none} />
          </div>
        </div>
     
    );
  }
}
