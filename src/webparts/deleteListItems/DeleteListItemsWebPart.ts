import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
//import IDeleteListItemsProps from './components/IDeleteListItemsProps'
import * as strings from 'DeleteListItemsWebPartStrings';
import DeleteListItems from './components/DeleteListItems';
import { IDeleteListItemsProps } from './components/IDeleteListItemsProps';
import IDataProvider   from "../../dataproviders/IDataProvider";
import SharePointDataProvider from '../../dataproviders/SharePointDataProvider';
import MockupDataProvider   from "../../dataproviders/MockupDataProvider";


export interface IDeleteListItemsWebPartProps {
  description: string;
}

export default class DeleteListItemsWebPart extends BaseClientSideWebPart<IDeleteListItemsWebPartProps> {
  
 private _dataProvider: IDataProvider;

 protected onInit(): Promise<void> {

  if (DEBUG && Environment.type === EnvironmentType.Local) {
    this._dataProvider = new MockupDataProvider();
  } 
  else {
    debugger;
        this._dataProvider = new SharePointDataProvider(this.context);
  }
    return super.onInit();
    
  }

  


  public render(): void {
    const element: React.ReactElement<IDeleteListItemsProps > = React.createElement(
      DeleteListItems,
      {
        description: "Hello",
        dataProvider: this._dataProvider
               
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
