import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import {
    SPHttpClient,
    SPHttpClientBatch,
    SPHttpClientResponse
} from '@microsoft/sp-http';
import MockHttpClient from './MockHttpClient';

export default class SPData {

    private _listsUrl: string;
    private _listItemsUrl: string;
    private _webPartContext: IWebPartContext;


    constructor(ctx: IWebPartContext) {
        this._webPartContext = ctx;
        this._listsUrl = `${this._webPartContext.pageContext.web.absoluteUrl}/_api/web/lists`;
    }

    public getAllLists() : Promise<ISPLists> {
        return this._webPartContext.spHttpClient.get(this._listsUrl, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            })
    }

    public getMockLists() : Promise<ISPLists> {
        return MockHttpClient.get()
        .then((data: ISPList[]) => {
          var listData: ISPLists = { value: data };
          return listData;
        }) as Promise<ISPLists>;
    }

   
}

export interface ISPLists {
    value: ISPList[];
}

export interface ISPList {
    Title: string;
    Id: string;
}