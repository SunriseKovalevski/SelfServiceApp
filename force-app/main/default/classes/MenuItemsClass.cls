public with sharing class MenuItemsClass {
    public MenuItemsClass() {

    }
    
    @AuraEnabled(cacheable=true)
    public static List<Item__c> getMenuItems(){
       /* System.debug(' gId  ======>>>' + gId );
        if (gId != ' ') {
            return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c WHERE Group__r.Id=:gId ];
        } 
        return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];*/
         return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c];
        //  [SELECT Id, Name FROM Item__c];
    }


    @AuraEnabled(cacheable=true)
    public static List<Item__c> getMenuItemsById(Id gId){
        System.debug('  ===>>>   ' + [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c WHERE Group__r.Id=:gId  WITH SECURITY_ENFORCED]);
            return [SELECT Id, Name, Cost__c, Description__c, Portions__c, Comment__c FROM Item__c WHERE Group__r.Id=:gId  WITH SECURITY_ENFORCED];
     
        
    }
}
