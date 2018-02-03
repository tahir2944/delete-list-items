import * as React from 'react';
import styles from './DeleteListItems.module.scss';
import { IDeleteListItemsProps } from './IDeleteListItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  Link, MarqueeSelection, DetailsList, Selection, Image, ImageFit,
  SelectionMode, Spinner, SpinnerSize, Fabric, ColumnActionsMode, IColumn, CheckboxVisibility,
  Callout, Panel, PanelType, IContextualMenuItem, autobind, ContextualMenu, IContextualMenuProps, DirectionalHint,
  css
} from 'office-ui-fabric-react';
import { IListItem, IList, IOption } from '../../../common/IObjects';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

//import { autobind, BaseComponent } from '../../../Utilities';

export  interface ID {
  Id?: number;
  Title?: string;
}


let _items: any = [
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
    ey: '5',
    text: "Item 5",
  },
];


export default class DeleteListItems extends React.Component<IDeleteListItemsProps,any> {
  
  
  constructor(props: IDeleteListItemsProps) {
    super(props);
    this.state = {
      allItems: [],
      items: _items,
      isLoading: false,
      selectedItem: undefined,
      deleteCount: 0,
      //deletionDetails: this._getDeletionDetails(),
      columns: this._setupColumns()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

     handleChange(event) {
          this.setState({selectedItem: event.text});
      }

      handleSubmit(event) {
        debugger;
        this.deleteListItems(this.state.selectedItem)
      }
  public render(): React.ReactElement<IDeleteListItemsProps> {
    //let { selectedItem } = this.state.selectedItem;
    
    debugger;
    if (this.state.isLoading) {
      if (SpinnerSize && SpinnerSize.large) {
        return (<div className={styles.loadingWrapper}>
          <Spinner size={SpinnerSize.large} label='Deleting List items...' />
        </div>);
      }
    }

    else
    return (
      //<div className='DropdownBasicExample'>
      
      
      
      <div>
      {/* <div>{ this.state.deletionDetails }</div> */}
      <Dropdown
        className='Dropdown-example'
        placeHolder='Select an Option'
        label='Basic uncontrolled example:'
        //selectedKey={ (selectedItem ? selectedItem.key : undefined) }
        id='Basicdrop1'
        ariaLabel='Basic dropdown example'
        onChanged={this.handleChange}
        options={
          this.state.items
        }
      />

      <PrimaryButton
        text='Delete Items'
        onClick={this.handleSubmit }
      />
      
        <DetailsList
          items={ this.state.allItems }
          columns={ this.state.columns }
          setKey='set'
          selectionPreservedOnEmptyClick={ true }
          ariaLabelForSelectionColumn='Toggle selection'
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
        />
    </div>
  );
  }

 public componentDidMount() {
        debugger;
  
        this.props.dataProvider.readLists().then(
          //resolve
          (items: IOption[]) => {
            debugger;
            this.setState({
              items: items,
              isLoading: false
          });

          },
          //reject
          (data: any) => {
              this.setState({
              allDocuments: [],
              displayedDocuments: [],
              isLoading: false,
              isErrorOccured: true,
              errorMessage: data
            });
          }
        ).catch((ex) => {
          debugger;
          this.setState({
            allDocuments: [],
            displayedDocuments: [],
            isLoading: false,
            isErrorOccured: true,
            errorMessage: ex.errorMessage
          });

        });
      }

/**
   *  Specify the columns and their properties
   */
  private _setupColumns(): IColumn[] {
    
        const columnsSingleClient: IColumn[] =
          [{
            key: 'Id',
            name: '',
            fieldName: 'Id',
            minWidth: 20,
            maxWidth: 20,
            isResizable: true,
            data: String
          },
          {
            key: 'Title',
            name: '',
            fieldName: 'Title',
            minWidth: 20,
            maxWidth: 20,
            isResizable: true,
            data: String
          },
          ];
    
        return columnsSingleClient;
      }
          
      // get delete count
      private _getDeletionDetails(): string {
        let deletionCount = this.state.deleteCount;
    
        switch (deletionCount) {
          case 0:
            return '';
          default:
            return `${deletionCount} items selected`;
        }
      }

      //read list items and then delete them
      private deleteListItems(listName:any):void {
           
        this.setState({
          isLoading: true
         });
         
         
         this.props.dataProvider.readListItems(listName).then(
          //resolve
          (deleteCount: number) => {
            debugger;
            this.setState({
              isLoading: false,
              deleteCount: deleteCount
          });

          },
          //reject
          (data: any) => {
              this.setState({
              allDocuments: [],
              displayedDocuments: [],
              isLoading: false,
              isErrorOccured: true,
              errorMessage: data
            });
          }
        ).catch((ex) => {
          debugger;
          this.setState({
            allDocuments: [],
            displayedDocuments: [],
            isLoading: false,
            isErrorOccured: true,
            errorMessage: ex.errorMessage
          });

        });
        debugger;
        this.props.dataProvider.readListItems(listName);

        
      }
}
