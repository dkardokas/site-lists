import * as React from 'react';
import styles from './SiteLists.module.scss';
import { ISiteListsProps } from './ISiteListsProps';
import { escape, unescape } from '@microsoft/sp-lodash-subset';
import { PageContext } from '@microsoft/sp-page-context'
import SPData from '../../../bl/SPData';

export default class SiteLists extends React.Component<ISiteListsProps, {}> {
  public render(): React.ReactElement<ISiteListsProps> {
    
    let spdata = new SPData(this.props.context);
    const listsElem = spdata.getAllLists().map((list) =>
      <p className={ styles.label }>{list}</p>
    );
    return (
      <div className={ styles.siteLists }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Your site has the following lists:</p>      
              {listsElem}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private retrieveLists(){

  }
}
