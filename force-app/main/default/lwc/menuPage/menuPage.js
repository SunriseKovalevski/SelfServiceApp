import { LightningElement, wire, track, api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import getAccountList from '@salesforce/apex/ItemController.getAccountList';
import getGroups from '@salesforce/apex/ItemController.getGroups';
import getMainGroups from '@salesforce/apex/ItemController.getMainGroups';
import getItemsTree from '@salesforce/apex/ItemController.getItemsTree';
import getMenuItemsById from '@salesforce/apex/MenuItemsClass.getMenuItemsById';
import getCaseList from '@salesforce/apex/displaycases.getCaseList';
import getNext from '@salesforce/apex/displaycases.getNext';
import getPrevious from '@salesforce/apex/displaycases.getPrevious';
import TotalRecords from '@salesforce/apex/displaycases.TotalRecords';
import getMenuItems from '@salesforce/apex/MenuItemsClass.getMenuItems';


const DELAY = 300;


const columns = [
    { label: 'Name', fieldName: 'Name', sortable: "true" },
    { label: 'Cost per Serving', fieldName: 'Cost__c', sortable: "true"},
    { label: 'Description', fieldName: 'Description__c', sortable: "true"},
    { label: 'Servings', fieldName: 'Portions__c', sortable: "true"},
    { label: 'Comment', fieldName: 'Comment__c', sortable: "true"},
    { label: 'Add to Order', type: 'button', typeAttributes: {

        label: 'Add to Order',
        name: 'addToOrder',
        
    
    }},
    ];



const COLS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Cost per Serving', fieldName: 'Cost__c'},
    { label: 'Description', fieldName: 'Description__c'},
    { label: 'Servings', fieldName: 'Portions__c'},
    { label: 'Comment', fieldName: 'Comment__c'},
    { label: 'Remove from Order', type: 'button', typeAttributes: {

        label: '(not working) Remove from Order',
        name: 'removeFromOrder',
        
    
    }},
];

const iTree = [
    {
        label: 'Asia Pacific Sales',
        name: 'Asia Pacific Sales',
        items: [
            {
                label: 'Asia Sales',
                name: 'Asia Sales',
                items: [],
            },
        ]
    }
];
/*
const COLS = [
    { label: 'Case Number', fieldName: 'CaseNumber' },
    { label: 'Subject', fieldName: 'Subject' }

 ];*/

export default class MenuPage extends LightningElement {

    newOrderItem;
    rowOffset = 0;
    orderCost = 0;
    inputValue = '';
    gId = ' ';
    data=[];
    page = 1;
    perpage = 2;
    pages = [];
    set_size = 5;
    sortBy;
    sortDirection;
    tmpData;
    filterData=[];

    columns = columns;
    cols = COLS;

    @wire(getItemsTree) itemsTree;
 /*   @wire(getMenuItems) 
    getMenuItems (result) {
        if (result.data) {
            this.data = result.data;
            this.error = undefined;
            this.setPages(this.data);

        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
            
        }
    }*/

    openPopupOrderList(event) {
        
    }


    showHideOrderDetails(event) {
        // show hide orderDetails
    }


    handleClickMakeAnOrder(event) {

    }

    @track orderData = [];

    get hasOrders() {
        return this.orderData && !!this.orderData.length;
    }


    handleRowAction(event) {
        console.log(JSON.stringify(event.detail.action));
        if(event.detail.action.name==='addToOrder') {

            this.newOrderItem = this.data.filter(element => {
                return element.Id.toUpperCase().includes(event.detail.row.Id.toUpperCase());
            })
            this.orderData = [...this.orderData, this.newOrderItem[0]];
            this.orderCost += this.newOrderItem[0].Cost__c * this.newOrderItem[0].Portions__c;
           /* this.orderData.push (this.newOrderItem[0]
                
                JSON.parse(JSON.stringify(event.detail.row)) {
                Id: event.detail.row.Id, 
                Name: event.detail.row.Name, 
                Cost__c: event.detail.row.Cost__c, 
                Description__c: event.detail.row.Description__c, 
                Portions__c: event.detail.row.Portions__c, 
                Comment__c: event.detail.row.Comment__c,
               
            }*/
            console.log('clicked addToOrder button');
            console.log(JSON.stringify(event.detail.row));
            console.log(JSON.stringify(event.detail.row.Name));
            console.log(JSON.stringify(event.detail.row.Cost__c));
            console.log(JSON.stringify(event.detail.row.Portions__c));
            console.log(JSON.stringify(this.orderData));
        } else 
            if (event.detail.action.name==='removeFromOrder') {
            //arr = arr.filter(n => n.id !== id)
            console.log(' delete ' );
          //  console.log(JSON.stringify(event.detail.row.Id));
            console.log(JSON.stringify(event.detail.row));
            const row = event.detail.row;
            const rows = this.orderData;
          //  console.log(JSON.stringify(rows));
           // const rowIndex = this.orderData.findIndex(event.detail.row);
          //  console.log (' row index ' + rowIndex);
          /*  this.orderCost -= row.Cost__c * row.Portions__c;
            rows.splice(rowIndex, 1);
            this.orderData = rows;*/

        }
    
    }

/*
    handleRowSelect(event) {
        const selectedRows = event.detail.selectedRows;
        for (let i = 0; i < selectedRows.length; i++){
            console.log( ' ' +selectedRows[i].Id);
        }
    }
*/



    loadTree(){
        getMenuItemsById({gId: this.gId})
        .then(result => {
            this.data = result;
            this.setPages(this.data);
       
        
        })
        .catch(error => {
            this.error = error;
            
        });
    }




  @wire(getMenuItemsById, {gId : '$gId'} ) 
   actualMenuItems ;


   async connectedCallback(){
       console.log('hi=)');
    this.data = await getMenuItems();
    console.log('hello');
    this.setPages(this.data);

    
 }
 


   timerId;

   handleSearch(event) {
    /*const inputValue = event.target.value[0];

    const regex = new RegExp(`^${inputValue}`, 'i');     
    this.phones = this._phones.filter(row => regex.test(row.name) || regex.test(row.ticker) || regex.test(row.shareclass));

    if (!event.target.value) {
        this.phones = [...this._phones];
    }*/
        this.inputValue = event.target.value;
        console.log(event.target.value);
    }

    handleFilter(){
        //searchtext = this.inputValue;
        this.tmpData = '';
        console.log(this.inputValue);
        if (this.inputValue != '') {
            (async () => {
                this.data = await getMenuItems();
                console.log(' '  +  this.data);
            console.log(' '  +  this.data.length);
            this.data.filter(element => {
                console.log (' ' + element.Name.toUpperCase().includes(this.inputValue.toUpperCase()));
            });
            this.data = this.data.filter(element => {
                return element.Name.toUpperCase().includes(this.inputValue.toUpperCase());
            });
            this.setPages(this.data);
            })();
           
            
              
     
            console.log(' '  +  this.data);
            console.log(' '  +  this.data.length);
            
        } else {

            this.connectedCallback();
        }   
       /* 
        this.currentPageData = this.data.filter(element => {           
            return element.Name.toUpperCase().includes(this.inputValue.toUpperCase());
        
        }
        );*/
        
    //    console.log(' '  + tmpData.length);
       /* this.data = this.data.filter(d => {
        return d.name.toUpperCase().includes(this.inputValue.toUpperCase());
        
       });
       */
     
    
       /*    if (str.name.toUpperCase().include(this.inputValue.toUpperCase())) {
           console.log('Y ' + str);
           } else {
            console.log('N ' + str.name);
           }*/

       
      // console.log(this.tmpData.name);
    //   this.setPages(this.data);
    }



    handleSortdata(event) {
        // field name
        console.log ('enter sort data ' );
        this.sortBy = event.detail.fieldName;
        console.log ('this.sortBy ' + this.sortBy);
        // sort direction
        this.sortDirection = event.detail.sortDirection;
        console.log('this.sortDirection ' + this.sortDirection);

        // calling sortdata function to sort the data based on direction and selected field
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
    }


    sortData(fieldname, direction) {
        // serialize the data before calling sort function
        let parseData = JSON.parse(JSON.stringify(this.data));
        console.log( ' ' + parseData);

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };

        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1: -1;

        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        // set the sorted data to data table data
        this.data = parseData;
    }

    handleSelect(event) {
        window.clearTimeout(this.delayTimeout);
        const gId = event.detail.name;
     //  console.log( ' ' + actualMenuItems.data);
     console.log(' ' + this.gId);
            this.gId = gId;
            this.loadTree();
            
        this.delayTimeout = setTimeout(() => {

// сюда написать функцию которая обработает количество записей с учетом новой айдишки (айдишку для сравнения принадлежности в меню записать сразу из базы)

console.log('second  '  +  this.data);
console.log('second  '  +  this.data.length);


/*
            console.log(' actualMenuItems   ' + this.actualMenuItems.data;
            this.data = this.actualMenuItems.data;
      
            this.setPages(this.data);*/

        }, DELAY);
  /*      this.gId = gId;
        console.log(' out1 ' + this.actualMenuItems.data);
this.data = this.actualMenuItems.data;
        console.log(' out2 ' + this.actualMenuItems.data);
        this.setPages(this.data);*/
     /*   (async () => {
            this.data = await getMenuItems(gId);
            console.log(' '  +  this.data);
        console.log(' '  +  this.data.length);
       
        this.setPages(this.data);
        })();*/
    }
    
    renderedCallback(){
      this.renderButtons();   
    }
    renderButtons = ()=>{
        this.template.querySelectorAll('button').forEach((but)=>{
            but.style.backgroundColor = this.page===parseInt(but.dataset.id,10)?'yellow':'white';
         });
    }
    get pagesList(){
        let mid = Math.floor(this.set_size/2) + 1 ;
        if(this.page > mid){
            return this.pages.slice(this.page-mid, this.page+mid-1);
        } 
        return this.pages.slice(0,this.set_size);
     }
    
    
    pageData = ()=>{
        let page = this.page;
        let perpage = this.perpage;
        let startIndex = (page*perpage) - perpage;
        let endIndex = (page*perpage);
        return this.data.slice(startIndex,endIndex);
     }

    setPages = (data)=>{
        let numberOfPages = Math.ceil(data.length / this.perpage);
        this.pages = [];
        for (let index = 1; index <= numberOfPages; index++) {
            this.pages.push(index);
        }
     }  
    
    get hasPrev(){
        return this.page > 1;
    }
    
    get hasNext(){
        return this.page < this.pages.length
    }

    onNext = ()=>{
        ++this.page;
    }

    onPrev = ()=>{
        --this.page;
    }

    onPageClick = (e)=>{
        this.page = parseInt(e.target.dataset.id,10);
        
    }

    get currentPageData(){
        return this.pageData();
    }

 
}








/*


    error;
    gId = ' ';
    @track columns = COLS;
    @track v_Offset=0;
    @track v_TotalRecords;
    @track page_size = 10;


    //Fetching records from apex class
    @wire(getItemsTree) itemsTree;
   @wire(getCaseList, { v_Offset: '$v_Offset', v_pagesize: '$page_size',  gId : '$gId'}) menuItems;
  
    

    handleSelect(event) {
        window.clearTimeout(this.delayTimeout);
        const gId = event.detail.name;

        this.delayTimeout = setTimeout(() => {
            this.gId = gId;
        }, DELAY);
    } 
}
/*
    //Executes on the page load
    connectedCallback() {
        TotalRecords(this.gId).then(result=>{
            this.v_TotalRecords = result;
        });
    }
    
    previousHandler2(){
        getPrevious({v_Offset: this.v_Offset, v_pagesize: this.page_size}).then(result=>{
            this.v_Offset = result;
            if(this.v_Offset === 0){
                this.template.querySelector('c-paginator').changeView('trueprevious');
            }else{
                this.template.querySelector('c-paginator').changeView('falsenext');
            }
        });
    }
    nextHandler2(){
        getNext({v_Offset: this.v_Offset, v_pagesize: this.page_size}).then(result=>{
            this.v_Offset = result;
           if(this.v_Offset + 10 > this.v_TotalRecords){
                this.template.querySelector('c-paginator').changeView('truenext');
            }else{
                this.template.querySelector('c-paginator').changeView('falseprevious');
            }
        });
    }
    
    changeHandler2(event){
        const det = event.detail;
        this.page_size = det;
    }
    firstpagehandler(){
        this.v_Offset = 0;
        this.template.querySelector('c-paginator').changeView('trueprevious');
        this.template.querySelector('c-paginator').changeView('falsenext');
    }
    lastpagehandler(){
        this.v_Offset = this.v_TotalRecords - (this.v_TotalRecords)%(this.page_size);
        this.template.querySelector('c-paginator').changeView('falseprevious');
        this.template.querySelector('c-paginator').changeView('truenext');
    }
    
    }
/*
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
/*
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
    
*/



  


