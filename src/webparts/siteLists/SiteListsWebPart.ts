import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SiteListsWebPartStrings';
import SiteLists from './components/SiteLists';
import { ISiteListsProps } from './components/ISiteListsProps';

export interface ISiteListsWebPartProps {
  description: string;
}

export default class SiteListsWebPart extends BaseClientSideWebPart<ISiteListsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISiteListsProps > = React.createElement(
      SiteLists,
      {
        description: this.properties.description
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
