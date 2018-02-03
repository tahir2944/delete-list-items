import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
// import pnp and pnp logging system
import { Logger, FunctionListener, LogEntry, LogLevel, Web } from "sp-pnp-js";
import { IListItem, IList, IOption } from "../common/IObjects";
import IDataProvider from "./IDataProvider";



export default class SharePointDataProvider implements IDataProvider {
    
    private _webPartContext: IWebPartContext;
    private _listAbsoluteUrl: string;
    private _webAbsoluteUrl: string;

    constructor(value: IWebPartContext) {
        this._webPartContext = value;
        //this._listAbsoluteUrl = listUrl;
      /*   this._libraryAbsoluteUrl =
            libraryUrl.lastIndexOf("/") == libraryUrl.length - 1 ?
                libraryUrl.substr(0, libraryUrl.length - 1) :
                libraryUrl; */
        this._webAbsoluteUrl = value.pageContext.web.absoluteUrl;
    }

    /**
     * Check is all settings passed in the constructor are correctly initialized 
     */
    public validateSettings(): boolean {

        if (!this._listAbsoluteUrl) {
            return false;
        }
        return true;
    }
    
        public async readListItems(listName: any): Promise<number> {
        debugger;
            let _items: IListItem[] = [];
            let deleteCount: any = 0;

            this._listAbsoluteUrl = listName;
            /*   this._libraryAbsoluteUrl =
                  libraryUrl.lastIndexOf("/") == libraryUrl.length - 1 ?
                      libraryUrl.substr(0, libraryUrl.length - 1) :
                      libraryUrl; */
              this._webAbsoluteUrl = this._webPartContext.pageContext.web.absoluteUrl;
            try {
                debugger;
                // do PnP JS query, some notes:
                //   - .expand() method will retrive Item.File item but only Length property
                //   - .usingCaching() will be using SessionStorage by default to cache the  results
                //   - .get() always returns a promise
                //   - await converts Promise<IResponseItem[]> into IResponse[]
                const web: Web = new Web(this._webAbsoluteUrl);
                const response: IListItem[] = await web.lists
                  .getByTitle(this._listAbsoluteUrl)
                  .items
                  .select("Id").top(4999)
                  .usingCaching()
                  .get();
          
                // use map to convert IResponseItem[] into our internal object IFile[]
                const _items: IListItem[] = response.map((item: IListItem) => {
                    debugger;
                    
                  return {
                    Id: item.Id,
                    };
                });
                    
                deleteCount = this.deleteListItems(_items, listName);
                /* // intentionally set wrong query to see console errors...
                const failResponse: IResponseItem[] = await web.lists
                  .getByTitle(libraryName)
                  .items
                  .select("Title", "FileLeafRef", "File/Length", "NonExistingColumn")
                  .expand("File/Length")
                  .usingCaching()
                  .get(); */
          
              } catch (error) {
                console.log(error);
                }
            
            
            
            
            return new Promise<number>((resolve) => {
                    resolve(deleteCount);
                });
        
        
        }   
        
        public async deleteListItems (_items: IListItem[], listName: string): Promise<number> {
            debugger;
            const web: Web = new Web(this._webAbsoluteUrl);
            let deleteCount: number = 0;
            _items.map((item: IListItem) => {
                debugger;
                let list = web.lists.getByTitle(listName);
                list.items.getById(item.Id).delete().then(_ => { deleteCount++ });

            });
            return new Promise<number>((resolve) => {
                resolve(deleteCount);
            });
        }

        public async readLists(): Promise<IOption[]> {
            debugger;
            let _items: IOption[] = [];

            try {
                debugger;
                // do PnP JS query,some notes:
                //   - .expand() method will retrive Item.File item but only Length property
                //   - .usingCaching() will be using SessionStorage by default to cache the  results
                //   - .get() always returns a promise
                //   - await converts Promise<IResponseItem[]> into IResponse[]
                const web: Web = new Web(this._webAbsoluteUrl);
                const response: IList[] = await web.lists
                  .select("Id","Title")
                  .usingCaching()
                  .get();
          
                // use map to convert IResponseItem[] into our internal object IFile[]
                _items = response.map((item: any) => {
                    debugger;
                    
                  return {
                    key: item.Id,                    
                    text: item.Title
                    };
                });
                                    /* // intentionally set wrong query to see console errors...
                const failResponse: IResponseItem[] = await web.lists
                  .getByTitle(libraryName)
                  .items
                  .select("Title", "FileLeafRef", "File/Length", "NonExistingColumn")
                  .expand("File/Length")
                  .usingCaching()
                  .get(); */
          
              } catch (error) {
                console.log(error);
                }
            
            return new Promise<IOption[]>((resolve) => {
                    resolve(_items);
                });
        }
        
    }