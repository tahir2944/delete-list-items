import { IListItem } from "../common/IObjects";
import IDataProvider   from "./IDataProvider";
import { IList } from "../common/IObjects";
import { IOption } from "../../lib/common/IObjects";




export default class MockupDataProvider implements IDataProvider {

    private _listAbsoluteUrl: string;
    
        constructor() {
            
        }
    
        public validateSettings(): boolean {
    
            if (!this._listAbsoluteUrl) {
                return false;
            }
            return true;
        }

    public readListItems(): Promise<number> {
        debugger;
        let deleteCount = 0;
        return new Promise<number>((resolve) => {
                resolve(deleteCount);
            });
    }   
    
    public readLists(): Promise<IOption[]> {
        debugger;
        let _items: IOption[] = [
            

            {
                key: '1',
                text: "Item 1",
            },
            {
                key: '2',
                text: "Item 2",
            },
            {
                key: '3',
                text: "Item 3",
            },
            {
                key: '4',
                text: "Item 4",
            },
            {
                key: '5',
                text: "Item 5",
            },
        ];
        return new Promise<IOption[]>((resolve) => {
                resolve(_items);
            });
    }

    public async deleteListItems (_items: IListItem[], listName: string): Promise<number> {
        let deleteCount = 0;
        return new Promise<number>((resolve) => {
                resolve(deleteCount);
            });
    }
}