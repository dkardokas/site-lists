import * as React from 'react';

export default class SPData {


    constructor(ctx) {
        console.log("context: " + ctx.pageContext.web.title);
    }

    public getAllLists() {
        return ["List1", "List2", "List3"];
    }
}