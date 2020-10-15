public with sharing class MenuItemsClass {
    public MenuItemsClass() {

    }
    
    @AuraEnabled
    public static List<Item__c> getMenuItems(){
          return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];
        //  [SELECT Id, Name FROM Item__c];
    }


    @AuraEnabled
    public static List<Item__c> getMenuItemsById(String gId){
   
        
        if (gId != ' ') {
            return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c WHERE Group__r.Id=:gId ];
        } 
        return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];
        
    }
}
