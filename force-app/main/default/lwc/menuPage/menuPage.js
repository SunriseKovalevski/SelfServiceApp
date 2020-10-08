import { LightningElement, wire } from 'lwc';
import getMenuItems from '@salesforce/apex/ItemController.getMenuItems';
import getGroups from '@salesforce/apex/ItemController.getGroups';
import getMainGroups from '@salesforce/apex/ItemController.getMainGroups';
import getItemsTree from '@salesforce/apex/ItemController.getItemsTree';

const columns = [
    { label: 'Название', fieldName: 'Name' },
    { label: 'Цена', fieldName: 'Cost__c', type: 'currency' },
    { label: 'Описание блюда', fieldName: 'Description__c' },
    { label: 'Количество порций', fieldName: 'Portions__c' },
    { label: 'Комментарий', fieldName: 'Comment__c' },
];




export default class MenuPage extends LightningElement {
    error;
    columns = columns;


    @wire(getMenuItems) menuItems;
   //  @wire(getGroups) groupItems;
  //   @wire(getMainGroups) mainGroupItems;
   @wire(getItemsTree) itemsTree;
    
   
}

