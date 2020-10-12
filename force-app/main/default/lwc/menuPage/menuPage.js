import { LightningElement, wire, track, api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getMenuItems from '@salesforce/apex/ItemController.getMenuItems';
import getGroups from '@salesforce/apex/ItemController.getGroups';
import getMainGroups from '@salesforce/apex/ItemController.getMainGroups';
import getItemsTree from '@salesforce/apex/ItemController.getItemsTree';
import getMenuItemsById from '@salesforce/apex/ItemController.getMenuItemsById';

const DELAY = 300;

const COLUMNS = [
    { label: 'Название', fieldName: 'Name' },
    { label: 'Цена', fieldName: 'Cost__c', type: 'currency' },
    { label: 'Описание блюда', fieldName: 'Description__c' },
    { label: 'Количество порций', fieldName: 'Portions__c', type: 'number', editable : 'true' },
    { label: 'Комментарий', fieldName: 'Comment__c' },
];

export default class MenuPage extends LightningElement {
    error;
    gId = ' ';
    saveDraftValues;
    @track columns = COLUMNS;
    @track draftValues = [];
    @api recordId;

 //   @wire(getMenuItems) 
 //   menuItems;
   //  @wire(getGroups) groupItems;
  //   @wire(getMainGroups) mainGroupItems;
  @wire(getMenuItemsById,{ gId : '$gId'}) 
  menuItems;
    @wire(getItemsTree) 
    itemsTree;

    handleSelect(event) {
        window.clearTimeout(this.delayTimeout);
        const gId = event.detail.name;
        this.delayTimeout = setTimeout(() => {
            this.gId = gId;
        }, DELAY);
    }

    handleSave(event) {

        const recordInputs =  event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        const promises = recordInputs.map(recordInput => updateRecord(recordInput));

        Promise.all(promises).then(records => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            this.draftValues = [];
            return refreshApex(this.menuItems);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });        
    }

    handleKeyWordChange(event) {
        this.pageNumber = 1;
        this.keyword = event.target.value;
        this.handlePageChange();
    }

    handleSort(event) {
        this.pageNumber = 1;
        this.sortedField = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortType = this.columns.find(column => this.sortedField === 
            column.fieldName).type;
        this.handlePageChange();
    }


    handlePageChange() {
        
    }
   
}

