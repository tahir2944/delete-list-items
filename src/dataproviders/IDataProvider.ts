import { IListItem } from "../common/IObjects";
import { IList, IOption } from "../common/IObjects";


export default interface IDataProvider
{
    validateSettings(): boolean;    
    
    // Fetching all the list names to populate the dropdown
    readLists(): Promise<IOption[]>; 

    // Reading list items from the list
    readListItems(listName: any): Promise<number>;  
 
    // Itering over the deleted list items and delete them one by one
    deleteListItems(_items: IListItem[],listName: string): Promise<number>;
}