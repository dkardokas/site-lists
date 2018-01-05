import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import SPData from '../../bl/SPData';

import * as strings from 'SiteListsWebPartStrings';
import SiteLists from './components/SiteLists';
import { ISiteListsProps } from './components/ISiteListsProps';

export interface ISiteListsWebPartProps {
  description: string;
}

export default class SiteListsWebPart extends BaseClientSideWebPart<ISiteListsWebPartProps> {

  public render(): void {
    let spdata = new SPData(this.context);
    const listsElem = spdata.getAllLists().then((listData) => {
      var listsHtml = '';
      listData.value.forEach(element => {
        listsHtml += element.Title + " | ";
      });
      const element: React.ReactElement<ISiteListsProps> = React.createElement(
        SiteLists,
        {
          description: this.properties.description,
          context: this.context,
          siteLists: listsHtml
        }
      );

      ReactDom.render(element, this.domElement);
    });


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
